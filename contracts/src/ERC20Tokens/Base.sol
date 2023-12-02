// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {ERC20} from "solmate/src/mixins/ERC4626.sol";
import {BaseOraculo} from "../oraculos/BaseOraculo.sol";

abstract contract Base is ERC20 {
    /*//////////////////////////////////////////////////////////////
                    VARIÁVEIS DE ARMAZENAMENTO
    //////////////////////////////////////////////////////////////*/

    struct Deposito {
        uint256 valor;
        uint256 data;
    }

    struct Troca {
        uint256 quantidadeTitulos;
        uint256 quantidadeEthereum;
        address criadorDaTroca;
    }

    /// @notice 'TESOURO SELIC 2026'
    string public titulo;

    /// @notice 'SL26'
    string public nomeToken;

    /// @notice 'selic'
    string public tipo;

    /// @notice UNIX
    uint256 public vencimento;

    /// @notice 12,25% = 12.15 * 10 ** 18
    uint256 public rentabilidade;

    /// @notice Quanto de ETHEREUM compra 1 token no publico
    uint256 public valorConversao; // to-do dia valorConversao = valorConversao * (1 + getTaxaDiaria()) 

    uint8 public constant DECIMALS = 18;

    /// @notice Usuario => Nonce => Quando e quanto depositou
    mapping(address => mapping(uint256 => Deposito)) public depositos;

    /// @notice Usuario => Quantidade de depositos por usuario
    mapping(address => uint256) public quantidadeDeDepositosPorUsuario;

    uint256 public trocasIds;

    mapping(uint256 => Troca) public trocas;
    mapping(uint256 => bool) public trocaJaAconteceu;

    BaseOraculo public oraculo;
    
    event TrocaCriada(uint256 trocaId, uint256 quantidadeTitulos, uint256 quantidadeEthereum, address criadorDaTroca);
    event TrocaAceita(uint256 trocaId, uint256 quantidadeTitulos, uint256 quantidadeEthereum, address criadorDaTroca);

    /*//////////////////////////////////////////////////////////////
                            CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        string memory _titulo,
        string memory _nomeToken,
        string memory _tipo,
        uint256 _vencimento,
        uint256 _rentabilidade,
        uint256 _valorConversao
    ) ERC20(_titulo, _nomeToken, DECIMALS) {
        titulo = _titulo;
        tipo = _tipo;
        nomeToken = _nomeToken;
        vencimento = _vencimento;
        rentabilidade = _rentabilidade;
        valorConversao = _valorConversao;
    }

    /*//////////////////////////////////////////////////////////////
                            FUNÇOES
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Deposita o valor em ETHEREUM e retorna a quantidade de titulos
     */
    function comprar() external payable returns (uint256) {
        require(msg.value > 0, "Base: Valor deve ser maior que 0");
        require(msg.value < (valorConversao * totalSupply) / 5, "Limite maximo de tokens ultrapassados");

        uint256 quantidadeTokens = _calcularQuantidadeTitulos(msg.value);

        _mint(msg.sender, quantidadeTokens);

        return quantidadeTokens;
    }

    function criarTroca(uint256 _quantidadeTokens, uint256 _quantidadeEthereum) external {
        require(_quantidadeTokens > 0, "Base: Quantidade deve ser maior que 0");
        require(_quantidadeEthereum > 0, "Base: Quantidade deve ser maior que 0");
        require(_quantidadeTokens <= balanceOf[msg.sender], "Base: Saldo insuficiente");

        balanceOf[msg.sender] -= _quantidadeTokens;

        trocas[trocasIds] = Troca(_quantidadeTokens, _quantidadeEthereum, msg.sender);

        emit TrocaCriada(trocasIds, _quantidadeTokens, _quantidadeEthereum, msg.sender);

        trocasIds++;
    }

    function aceitarTroca(uint256 _trocaId) external payable {
        require(msg.value == trocas[_trocaId].quantidadeEthereum, "Base: Valor deve ser igual a quantidade de Ethereum");
        require(
            trocas[_trocaId].quantidadeTitulos <= balanceOf[trocas[_trocaId].criadorDaTroca], "Base: Saldo insuficiente"
        );
        require(!trocaJaAconteceu[_trocaId], "Base: Troca ja aconteceu");

        balanceOf[trocas[_trocaId].criadorDaTroca] += trocas[_trocaId].quantidadeTitulos;

        payable(trocas[_trocaId].criadorDaTroca).transfer(msg.value);

        trocaJaAconteceu[_trocaId] = true;

        emit TrocaAceita(
            _trocaId,
            trocas[_trocaId].quantidadeTitulos,
            trocas[_trocaId].quantidadeEthereum,
            trocas[_trocaId].criadorDaTroca
        );
    }

    /**
     * @notice Calcula a quantidade de titulos que o usuario vai receber
     * @param _valor Valor em ETHEREUM
     */
    function _calcularQuantidadeTitulos(uint256 _valor) internal view returns (uint256) {
        return (_valor * 10 ** DECIMALS) / valorConversao;
    }

    function _mint(address _account, uint256 _amount) internal override {
        require(balanceOf[_account] + _amount <= 4_000e18, "Bsae: Limite de 4.000 tokens");
        require(totalSupply + _amount <= 20_000e18, "Base: Limite de 20.000 tokens");

        super._mint(_account, _amount);
    }

    // comprar
    //
    // swap
    /*
    function calculaImpostos(current_date - deposito_date) returns (uint256) {

    }
    */

    /*
    TAXA - Imposto de renda

    O IR incide sobre os rendimentos e a alíquota varia conforme o tempo de investimento. 
    Quanto mais tempo o dinheiro fica investido, menor a alíquota. 
    A alíquota vai de 22,5% para investimentos de até 180 dias a 15% para investimentos acima de 720 dias.

    IOF -
    Vai de 96% pra 0% no dia 30
    O Imposto sobre Operações Financeiras pode incidir se o resgate for feito nos primeiros 30 dias de investimento. 
    O IOF é regressivo e vai diminuindo a cada dia, zerando após 30 dias.

    */

    receive() external payable {}
}
