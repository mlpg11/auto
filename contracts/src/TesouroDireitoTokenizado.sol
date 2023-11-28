// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

// Importações de ERC721 para funcionalidade NFT, ERC20 para padrão de token, e outros contratos necessários
import {ERC721} from "solmate/src/tokens/ERC721.sol";
import {ERC20} from "solmate/src/mixins/ERC4626.sol";
import {DrexMock} from "./DrexMock.sol";
import {Owned} from "solmate/src/auth/Owned.sol";

// Contrato principal para tesouraria tokenizada, herdando de ERC721 e Owned
contract TesouroDireitoTokenizado is ERC721, Owned {
    /*//////////////////////////////////////////////////////////////
                               VARIÁVEIS DE ARMAZENAMENTO
    //////////////////////////////////////////////////////////////*/

    /// @notice Contador para rastrear o ID atual do token
    uint256 public currentId;

    /// @notice Mapeamento do ID do token para a estrutura Deposito para armazenar detalhes do depósito
    mapping(uint256 => Deposito) public depositos;

    /// @notice Mapeamento para armazenar a relação duração-multiplicador
    mapping(uint256 => uint256) public multiplicador;

    /// @dev Variáveis internas para rastrear fundos e participações
    uint256 internal _fundos;
    uint256 internal _participacoes;

    /// @dev Referência ao contrato DrexMock
    DrexMock private _drex;

    /// @dev Constante para cálculo de pontos base
    uint256 private constant _PONTOS_BASE = 1e12;

    /*//////////////////////////////////////////////////////////////
                                CONSTRUTOR
    //////////////////////////////////////////////////////////////*/

    // Construtor inicializando o token ERC721 e definindo o proprietário
    constructor() ERC721("MultiTesourarias", "MTS") Owned(msg.sender) {
        multiplicador[0] = 0;
    }

    // Estrutura para representar um depósito
    struct Deposito {
        uint256 shares;
        uint256 liquidoApos; // Timestamp UNIX indicando quando o depósito se torna líquido
        uint256 momentoDeposito; // Timestamp do depósito
        string uri;
        uint256 multiplicador; // Multiplicador para o depósito
        uint8 risco;
    }
    /*//////////////////////////////////////////////////////////////
                               FUNCIONALIDADES
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Função para depositar DREX e comprar um titulo
     * @param duracao Depositar com duracao maior do que 0 significa comprar um titulo pre-fixado, que tera seu valor corrigido por um multiplicador na hora do saque
     * @param amount Quantidade de DREX a ser depositada
     * @param risco 0 = baixo, 1 = medio, 2 = alto
     */
    function depositar(uint256 duracao, uint256 amount, uint8 risco) public returns (uint256 shares) {
        // Verificações de validação
        require(amount > 0, "MultiTesourarias: Deposito minimo de 1 DREX");
        if (duracao != 0 && duracao % 365 days != 0) {
            revert("MultiTesourarias: Duracao invalida");
        }

        // Converte o valor para participações (shares)
        shares = convertToShares(amount);

        // Transfere tokens DREX para o contrato
        _drex.transferFrom(msg.sender, address(this), amount);

        require(shares > 0, "MultiTesourarias: Nao ha participacoes disponiveis");

        // Atualiza os fundos e participações
        _fundos += amount;
        _participacoes += shares;

        // Calcula o multiplicador
        uint256 multiplicador_ = multiplicador[duracao];

        // Cria e armazena o depósito
        depositos[currentId] = Deposito(shares, block.timestamp + duracao, block.timestamp, "", multiplicador_, risco);

        // Cunha um novo NFT para o depósito
        _mint(msg.sender, currentId);

        // Incrementa o ID atual
        currentId++;
    }

    /**
     * @notice Funcao para retirar DREX de um deposito, queimando o seu token (NFT)
     * @param idDeposito Id da NFT do deposito
     * @return amount Quantidade de DREX retirada
     */
    function retirar(uint256 idDeposito) public returns (uint256 amount) {
        // Verifica se o chamador é o dono do depósito
        require(ownerOf(idDeposito) == msg.sender, "MultiTesourarias: Apenas o dono do deposito pode retirar");

        // Recupera o depósito
        Deposito memory deposito = depositos[idDeposito];

        // Verifica se existem participações disponíveis
        require(deposito.shares > 0, "MultiTesourarias: Nao ha participacoes disponiveis");

        // Converte participações em ativos
        amount = convertToAssets(deposito.shares);

        // Atualiza os fundos e participações
        // Atualiza os fundos e participações
        _fundos -= amount;
        _participacoes -= deposito.shares;

        // Se o depósito for diferente do momento do depósito, aplica o multiplicador
        if (deposito.liquidoApos != deposito.momentoDeposito) {
            uint256 multiplicador_ = deposito.multiplicador;

            // Calcula o novo valor com o multiplicador e concede o bônus
            uint256 novaQuantia = (amount * multiplicador_) / _PONTOS_BASE;

            _drex.mintarBonus(novaQuantia - amount);

            amount = novaQuantia;
        }

        // Queima o NFT do depósito
        _burn(idDeposito);

        // Transfere os fundos de volta para o dono do depósito
        _drex.transfer(msg.sender, amount);
    }

    /**
     * @notice Aumenta o valor do
     * @param quantidadeDrex Quantidade de DREX a ser depositada
     */
    function depositarRendimento(uint256 quantidadeDrex) external {
        _drex.transferFrom(msg.sender, address(this), quantidadeDrex);

        // Atualiza o total de fundos
        _fundos += quantidadeDrex;
    }

    /**
     * @notice Funcao para atualizar o multiplicador de um deposito pre-fixado
     * @param duracoes Duracao em UNIX
     * @param multiplicadores Multiplicador correspondente a duracao
     */
    function ajustarMultiplicadores(uint256[] memory duracoes, uint256[] memory multiplicadores) external onlyOwner {
        require(duracoes.length == multiplicadores.length, "MultiTesourarias: Arrays de tamanhos diferentes");

        for (uint256 i = 0; i < duracoes.length; i++) {
            multiplicador[duracoes[i]] = multiplicadores[i];
        }
    }

    /// @dev Define o contrato Drex, apenas pode ser chamada por entidades autorizadas
    function setarDrex(DrexMock drex) external onlyOwner {
        _drex = drex;
    }

    /*//////////////////////////////////////////////////////////////
                                VIEWS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Url dos metadados do token
     * @param id Id do deposito
     */
    function tokenURI(uint256 id) public view override returns (string memory) {
        // Implementação específica para retornar a URI do token
    }

    /**
     * @notice Quantidade total de DREX depositado, utilizado no nosso sistema similar ao padrao ERC-4626
     */
    function totalAssets() public view returns (uint256) {
        return _fundos;
    }

    /**
     * @notice Quantidade total de participacoes, utilizado no nosso sistema similar ao padrao ERC-4626
     */
    function totalSupply() public view returns (uint256) {
        return _participacoes;
    }

    /**
     * @notice Funcao para prever a quantidade de participacoes que serao criadas com um deposito
     * @param assets Quantidade de DREX a ser depositada
     */
    function previewDeposit(uint256 assets) public view virtual returns (uint256) {
        return convertToShares(assets);
    }

    /**
     * @notice Funcao para prever a quantidade de participacoes que serao criadas com um deposito
     * @param assets Quantidade de DREX a ser depositada
     */
    function convertToShares(uint256 assets) public view virtual returns (uint256) {
        uint256 supply = _participacoes; // Economiza um SLOAD extra se totalSupply for não nulo

        return supply == 0 ? assets : (assets * supply) / totalAssets();
    }

    /**
     * @notice Funcao para prever a quantidade de DREX que serao criadas com um deposito
     * @param shares Quantidade de participacoes a serem convertidas
     */
    function convertToAssets(uint256 shares) public view returns (uint256) {
        uint256 supply = _participacoes; // Economiza um SLOAD extra se totalSupply for não nulo

        return supply == 0 ? shares : (shares * totalAssets()) / supply;
    }
}
