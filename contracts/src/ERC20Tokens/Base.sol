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
        uint256 rentabilidadeNoMomentoDoDeposito;
        uint256 quantidadeTitulos;
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
    uint256 public valorConversao;

    uint256 public ultimaAtualizacao;
    uint256 public rentabilidadeAcumulada;

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
        ultimaAtualizacao = block.timestamp;
    }

    function atualizaRentabilidade() public {
        // Quantos segundos desde a ultima atualizacao
        uint256 tempoDesdeUltimaAtualizacao = block.timestamp - ultimaAtualizacao;

        // A rentabilidade acumulada eh a rentabilidade * o tempo desde a ultima atualizacao
        // Exemplo: se era 10% a rentabilidade e durou 600 segundos, seria 10 * 600
        rentabilidadeAcumulada += (rentabilidade * tempoDesdeUltimaAtualizacao);

        // Atualiza a ultima atualizacao
        ultimaAtualizacao = block.timestamp;
    }

    /*//////////////////////////////////////////////////////////////
                            FUNÇOES
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Deposita o valor em ETHEREUM e retorna a quantidade de titulos
     *         Eh possivel depositar parcial
     */
    function comprar() external payable returns (uint256) {
        atualizaRentabilidade();

        require(msg.value > 0, "Valor deve ser maior que 0");

        uint256 quantidadeTitulos = (msg.value * 10 ** DECIMALS) / valorConversao;

        depositos[msg.sender][quantidadeDeDepositosPorUsuario[msg.sender]] =
            Deposito(msg.value, block.timestamp, rentabilidadeAcumulada, quantidadeTitulos);

        quantidadeDeDepositosPorUsuario[msg.sender]++;

        _mint(msg.sender, quantidadeTitulos);

        return quantidadeTitulos;
    }

    function resgatar(uint256 idDeposito) external {
        // Recupera o depósito do usuário com base no ID fornecido.
        Deposito storage deposito = depositos[msg.sender][idDeposito];

        require(deposito.valor > 0, "Deposito nao encontrado");

        // Atualiza a rentabilidade acumulada antes de calcular o resgate.
        atualizaRentabilidade();

        // Calcula a rentabilidade específica deste depósito.
        uint256 rentabilidadeDoDeposito = rentabilidadeAcumulada - deposito.rentabilidadeNoMomentoDoDeposito;

        // Calcula o valor total do resgate em Ethereum.
        // Refatorar pra acertar decimais
        uint256 valorResgate = deposito.valor + (deposito.valor * rentabilidadeDoDeposito / 10 ** DECIMALS);

        // Queima os tokens correspondentes ao valor do depósito.
        uint256 quantidadeTokens = deposito.quantidadeTitulos;

        _burn(msg.sender, quantidadeTokens);

        // Zera o valor do depósito para indicar que ele foi resgatado.
        deposito.valor = 0;

        // Transfere o valor do resgate em Ether para a carteira do usuário.
        payable(msg.sender).transfer(valorResgate);
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

    function _mint(address _account, uint256 _amount) internal override {
        require(balanceOf[_account] + _amount <= 4_000e18, "Base: Limite de 4.000 tokens");
        require(totalSupply + _amount <= 20_000e18, "Base: Limite de 20.000 tokens");

        super._mint(_account, _amount);
    }

    receive() external payable {}
}
