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

    // Contador para rastrear o ID atual do token
    uint256 public currentId;

    // Mapeamento do ID do token para a estrutura Deposito para armazenar detalhes do depósito
    mapping(uint256 => Deposito) public depositos;

    // Mapeamento para armazenar a relação duração-multiplicador
    mapping(uint256 => uint256) public multiplicador;

    // Variáveis internas para rastrear fundos e participações
    uint256 internal _fundos;
    uint256 internal _participacoes;

    // Referência ao contrato DrexMock
    DrexMock private _drex;

    // Constante para cálculo de pontos base
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
    }

    /*//////////////////////////////////////////////////////////////
                               FUNCIONALIDADES
    //////////////////////////////////////////////////////////////*/

    // Define o contrato Drex
    function setarDrex(DrexMock drex) external onlyOwner {
        _drex = drex;
    }

    // Função para depositar fundos
    function depositar(uint256 duracao, uint256 amount) public returns (uint256 shares) {
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
        depositos[currentId] = Deposito(shares, block.timestamp + duracao, block.timestamp, "", multiplicador_);

        // Cunha um novo NFT para o depósito
        _mint(msg.sender, currentId);

        // Incrementa o ID atual
        currentId++;
    }

    // Função para retirar fundos
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

    // Função para adicionar rendimentos ao contrato
    function depositarRendimento(uint256 quantidadeDrex) external {
        _drex.transferFrom(msg.sender, address(this), quantidadeDrex);

        // Atualiza o total de fundos
        _fundos += quantidadeDrex;
    }

    // Função para ajustar os multiplicadores para diferentes durações
    function ajustarMultiplicadores(uint256[] memory duracoes, uint256[] memory multiplicadores) external onlyOwner {
        require(duracoes.length == multiplicadores.length, "MultiTesourarias: Arrays de tamanhos diferentes");

        for (uint256 i = 0; i < duracoes.length; i++) {
            multiplicador[duracoes[i]] = multiplicadores[i];
        }
    }

    /*//////////////////////////////////////////////////////////////
                                VIEWS
    //////////////////////////////////////////////////////////////*/

    // Função para retornar a URI do token
    function tokenURI(uint256 id) public view override returns (string memory) {
        // Implementação específica para retornar a URI do token
    }

    // Função para visualizar o total de ativos
    function totalAssets() public view returns (uint256) {
        return _fundos;
    }

    // Função para visualizar o fornecimento total
    function totalSupply() public view returns (uint256) {
        return _participacoes;
    }

    // Função para pré-visualizar o depósito em termos de participações
    function previewDeposit(uint256 assets) public view virtual returns (uint256) {
        return convertToShares(assets);
    }

    // Função para converter ativos em participações
    function convertToShares(uint256 assets) public view virtual returns (uint256) {
        uint256 supply = _participacoes; // Economiza um SLOAD extra se totalSupply for não nulo

        return supply == 0 ? assets : (assets * supply) / totalAssets();
    }

    // Função para converter participações em ativos
    function convertToAssets(uint256 shares) public view returns (uint256) {
        uint256 supply = _participacoes; // Economiza um SLOAD extra se totalSupply for não nulo

        return supply == 0 ? shares : (shares * totalAssets()) / supply;
    }
}
