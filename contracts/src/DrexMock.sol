// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {ERC20} from "solmate/src/mixins/ERC4626.sol";

contract DrexMock is ERC20 {
    uint8 public constant DECIMALS = 18;

    address immutable _tesourarias;

    address immutable _operador;

    constructor(address tesourarias, address operador) ERC20("Drex", "DRX", DECIMALS) {
        _mint(msg.sender, 1_000 * 10 ** DECIMALS);

        _tesourarias = tesourarias;
        _operador = operador;
    }

    function mintarBonus(uint256 amount) external {
        require(msg.sender == _tesourarias, "DrexMock: Apenas Tesourarias pode mintar");

        _mint(_tesourarias, amount);
    }

    function mintar(uint256 amount) external {
        require(msg.sender == _operador, "DrexMock: Apenas operador pode mintar");

        _mint(_operador, amount);
    }
}
