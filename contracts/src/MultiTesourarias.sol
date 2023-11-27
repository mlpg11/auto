// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {ERC721} from "solmate/src/tokens/ERC721.sol";
import {ERC20} from "solmate/src/mixins/ERC4626.sol";
import {DrexMock} from "./DrexMock.sol";

contract MultiTesourarias is ERC721 {
    constructor(address _drexContract) ERC721("MultiTesourarias", "MTS") {
        _drex = ERC20(_drexContract);
    }

    struct Deposito {
        uint256 shares;
        Tesourarias tesouraria;
        /// @notice Aponta a partir de qual data o depósito terá liquidez (em UNIX timestamp)
        uint256 liquidoApos;
        string uri;
    }

    function depositar(Tesourarias tesouraria, uint256 amount) public returns (uint256 shares) {
        require(amount > 0, "MultiTesourarias: Deposito minimo de 1 DREX");

        shares = convertToShares(tesouraria, amount);

        _drex.transferFrom(msg.sender, address(this), amount);

        require(shares > 0, "MultiTesourarias: Nao ha participacoes disponiveis");

        _fundos[tesouraria] += amount;
        _participacoes[tesouraria] += shares;

        _depositos[currentToken] = Deposito(shares, tesouraria, block.timestamp, "");

        _mint(msg.sender, shares);
    }

    function retirar(Tesourarias tesouraria, uint256 shares) public returns (uint256 amount) {
        require(shares > 0, "MultiTesourarias: Nao ha participacoes disponiveis");

        amount = convertToAssets(tesouraria, shares);

        queimar(shares);

        _drex.transfer(msg.sender, amount);
    }

    function depositarRendimento(Tesourarias tesouraria, uint256 quantidadeDrex) external {
        _drex.transferFrom(msg.sender, address(this), quantidadeDrex);

        _fundos[tesouraria] += quantidadeDrex;
    }

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    uint256 private currentToken;

    mapping(uint256 => Deposito) private _depositos;

    mapping(Tesourarias => uint256) private _fundos;
    mapping(Tesourarias => uint256) private _participacoes;
    mapping(Tesourarias => uint256) private _duracao;

    ERC20 private immutable _drex;

    enum Tesourarias {
        Liquidez_Imediata,
        Liquidez_2024,
        Liquidez_2025
    }

    /*//////////////////////////////////////////////////////////////
                                VIEW
    //////////////////////////////////////////////////////////////*/

    function tokenURI(uint256 id) public view override returns (string memory) {}

    function totalAssets(Tesourarias tesouraria) public view returns (uint256) {
        return _fundos[tesouraria];
    }

    function totalSupply(Tesourarias tesouraria) public view returns (uint256) {
        return _participacoes[tesouraria];
    }

    function convertToShares(Tesourarias tesouraria, uint256 amount) public view returns (uint256 shares) {
        shares = (amount * _participacoes[tesouraria]) / _fundos[tesouraria];
    }

    function convertToAssets(Tesourarias tesouraria, uint256 shares) public view returns (uint256 amount) {
        amount = (shares * _fundos[tesouraria]) / _participacoes[tesouraria];
    }

    function queimar(uint256 amount) internal {
        _drex.transfer(address(0), amount);
    }
}
