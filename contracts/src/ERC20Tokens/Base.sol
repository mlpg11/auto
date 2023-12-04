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

    /// @notice 12,25% = 12.15 * 10 ** 12
    uint256 public rentabilidade;

    /// @notice Quanto de ETHEREUM compra 1 token no publico
    uint256 public valorConversao;

    uint256 public ultimaAtualizacao;
    uint256 public rentabilidadeAcumulada;

    uint8 public constant DECIMALS = 18;

    uint256 private constant PONTOS_BASE = 1e12;

    /**
     * Successfully created new keypair.
     * Address:     0xf4E69602F80D1D29b9aa37f70a5E3e9E48C2A67b
     * Private key: 0x1eaad7767b9980e9c19df80d8c38248a8738a978ce34d0d293720a7704cd374b
     */
    address public constant RECEBEDOR_IMPOSTO = 0xf4E69602F80D1D29b9aa37f70a5E3e9E48C2A67b;

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
    event TituloComprado(string nomeToken, uint256 quantidadeTitulos, uint256 quantidadeEthereum, address comprador);
    event TituloResgatado(string nomeToken, uint256 quantidadeTitulos, uint256 quantidadeEthereum, address comprador);

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

        // TODO: Tem que verificar se ainda esta vendendo

        require(msg.value > 0, "Valor deve ser maior que 0");

        uint256 quantidadeTitulos = (msg.value * 10 ** DECIMALS) / valorConversao;

        depositos[msg.sender][quantidadeDeDepositosPorUsuario[msg.sender]] =
            Deposito(msg.value, block.timestamp, rentabilidadeAcumulada, quantidadeTitulos);

        quantidadeDeDepositosPorUsuario[msg.sender]++;

        _mint(msg.sender, quantidadeTitulos);

        emit TituloComprado(nomeToken, quantidadeTitulos, msg.value, msg.sender);

        return quantidadeTitulos;
    }

    /**
     * @notice Resgata o valor em ETHEREUM e queima a quantidade de titulos
     * @param idDeposito ID do deposito que deseja resgatar
     */
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
        uint256 valorResgate = deposito.valor * (PONTOS_BASE + rentabilidadeDoDeposito) / PONTOS_BASE;

        // Queima os tokens correspondentes ao valor do depósito.
        uint256 quantidadeTokens = deposito.quantidadeTitulos;

        _burn(msg.sender, quantidadeTokens);

        // Zera o valor do depósito para indicar que ele foi resgatado.
        deposito.valor = 0;

        uint256 proUsuario = aplicarImposto(valorResgate, idDeposito);

        // Transfere o valor do resgate em Ether para a carteira do usuário.
        payable(msg.sender).transfer(proUsuario);

        emit TituloResgatado(nomeToken, quantidadeTokens, proUsuario, msg.sender);
    }

    function aplicarImposto(uint256 valor, uint256 id) public view returns (uint256) {
        uint256 unixDeposito = depositos[msg.sender][id].data;

        uint256 dias = (block.timestamp - unixDeposito) / 1 days;

        if (dias == 0) {
            dias = 1;
        }

        uint256 impostoDeRenda = getImpostoDeRenda(dias);

        uint256 valorReduzindoImpostoDeRenda = valor - (valor * impostoDeRenda) / PONTOS_BASE;

        uint256 iof = getIof(dias);

        uint256 valorReduzidoDeIof = valorReduzindoImpostoDeRenda - (valorReduzindoImpostoDeRenda * iof) / PONTOS_BASE;

        return valorReduzidoDeIof;
    }

    function preverResgate(address usuario, uint256 idDeposito) external view returns (uint256) {
        // Recupera o depósito do usuário com base no ID fornecido.
        Deposito storage deposito = depositos[usuario][idDeposito];

        require(deposito.valor > 0, "Deposito nao encontrado");

        uint256 tempoDesdeUltimaAtualizacao = block.timestamp - ultimaAtualizacao;

        // A rentabilidade acumulada eh a rentabilidade * o tempo desde a ultima atualizacao
        // Exemplo: se era 10% a rentabilidade e durou 600 segundos, seria 10 * 600
        uint256 rentabilidadeAcumulada_ = rentabilidade + (rentabilidade * tempoDesdeUltimaAtualizacao);

        // Calcula a rentabilidade específica deste depósito.
        uint256 rentabilidadeDoDeposito = rentabilidadeAcumulada_ - deposito.rentabilidadeNoMomentoDoDeposito;

        // Calcula o valor total do resgate em Ethereum.
        // Refatorar pra acertar decimais
        uint256 valorResgate = deposito.valor * (PONTOS_BASE + rentabilidadeDoDeposito) / PONTOS_BASE;

        return valorResgate;
    }

    /**
     * @notice Retorna o valor do imposto de renda de acordo com quanto tempo o deposito do usuario foi depositado
     * @param dias Quantidade de dias que o usuario quer prever
     */
    function getImpostoDeRenda(uint256 dias) public pure returns (uint256) {
        if (dias <= 180 days) {
            return (225 * PONTOS_BASE) / 1000;
        } else if (dias > 180 days && dias < 360 days) {
            return (200 * PONTOS_BASE) / 1000;
        } else if (dias >= 360 days && dias < 720 days) {
            return (175 * PONTOS_BASE) / 1000;
        } else {
            return (150 * PONTOS_BASE) / 1000;
        }
    }

    /**
     * @notice Retorna o valor do IOF de acordo com o dia
     * @param day Dia que deseja prever o IOF
     */
    function getIof(uint256 day) public pure returns (uint256) {
        // Representado como 3.5 * 10 para evitar decimais
        uint256 DECREASE_PERCENTAGE = 35;
        uint256 DAYS = 30;

        if (day >= DAYS) {
            return 0;
        }
        uint256 value = PONTOS_BASE;

        for (uint256 i = 0; i < day; i++) {
            value -= (value * DECREASE_PERCENTAGE) / 1000; // Dividindo por 1000 para compensar a multiplicação por 10
        }

        return value;
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
