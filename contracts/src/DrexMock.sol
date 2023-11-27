// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {ERC20} from "solmate/src/mixins/ERC4626.sol";

contract DrexMock is ERC20 {
    uint8 public constant DECIMALS = 18;

    constructor() ERC20("Drex", "DRX", DECIMALS) {
        _mint(msg.sender, 1_000 * 10 ** DECIMALS);
    }
}
