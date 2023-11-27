// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {ERC721} from "solmate/src/tokens/ERC721.sol";
import {ERC20} from "solmate/src/mixins/ERC4626.sol";
import {DrexMock} from "./DrexMock.sol";
import {Owned} from "solmate/src/auth/Owned.sol";

contract MultiTesourarias is ERC721, Owned {
    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    uint256 private currentId;

    mapping(uint256 => Deposito) public depositos;

    /// @notice Quantidade de anos => Multiplicador
    mapping(uint256 => uint256) public multiplicador;

    uint256 internal _fundos;
    uint256 internal _participacoes;

    DrexMock private immutable _drex;

    /// @notice 1 ponto = 1e12 = 100%
    uint256 private constant _PONTOS_BASE = 1e12;

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(address _drexContract) ERC721("MultiTesourarias", "MTS") Owned(msg.sender) {
        _drex = DrexMock(_drexContract);

        multiplicador[0] = 0;
    }

    struct Deposito {
        uint256 shares;
        /// @notice Aponta a partir de qual data o depósito terá liquidez (em UNIX timestamp)
        uint256 liquidoApos;
        uint256 momentoDeposito;
        string uri;
        uint256 multiplicador;
    }

    function depositar(uint256 duracao, uint256 amount) public returns (uint256 shares) {
        require(amount > 0, "MultiTesourarias: Deposito minimo de 1 DREX");

        if (duracao != 0 && duracao % 365 != 0) {
            revert("MultiTesourarias: Duracao invalida");
        }

        shares = convertToShares(amount);

        _drex.transferFrom(msg.sender, address(this), amount);

        require(shares > 0, "MultiTesourarias: Nao ha participacoes disponiveis");

        _fundos += amount;
        _participacoes += shares;

        uint256 multiplicador_ = multiplicador[duracao];

        depositos[currentId] = Deposito(shares, block.timestamp + duracao, block.timestamp, "", multiplicador_);

        _mint(msg.sender, currentId);

        currentId++;
    }

    function retirar(uint256 idDeposito) public returns (uint256 amount) {
        Deposito memory deposito = depositos[idDeposito];

        require(deposito.shares > 0, "MultiTesourarias: Nao ha participacoes disponiveis");

        amount = convertToAssets(deposito.shares);

        if (deposito.liquidoApos != deposito.momentoDeposito) {
            uint256 multiplicador_ = deposito.multiplicador;

            uint256 novaQuantia = (amount * multiplicador_) / _PONTOS_BASE;

            _drex.mintarBonus(novaQuantia - amount);

            amount = novaQuantia;
        }

        _burn(idDeposito);

        _drex.transfer(msg.sender, amount);
    }

    function depositarRendimento(uint256 quantidadeDrex) external {
        _drex.transferFrom(msg.sender, address(this), quantidadeDrex);

        _fundos += quantidadeDrex;
    }

    function ajustarMultiplicadores(uint256[] memory duracoes, uint256[] memory multiplicadores) external {
        require(duracoes.length == multiplicadores.length, "MultiTesourarias: Arrays de tamanhos diferentes");

        for (uint256 i = 0; i < duracoes.length; i++) {
            multiplicador[duracoes[i]] = multiplicadores[i];
        }
    }

    /*//////////////////////////////////////////////////////////////
                                VIEW
    //////////////////////////////////////////////////////////////*/

    function tokenURI(uint256 id) public view override returns (string memory) {}

    function totalAssets() public view returns (uint256) {
        return _fundos;
    }

    function totalSupply() public view returns (uint256) {
        return _participacoes;
    }

    function convertToShares(uint256 amount) public view returns (uint256 shares) {
        shares = (amount * _participacoes) / _fundos;
    }

    function convertToAssets(uint256 shares) public view returns (uint256 amount) {
        amount = (shares * _fundos) / _participacoes;
    }
}
