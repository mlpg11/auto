// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {ERC4626, ERC20} from "solmate/src/mixins/ERC4626.sol";

contract MultiTesourarias is ERC4626 {
    constructor(ERC20 _asset, string memory _name, string memory _symbol) ERC4626(_asset, _name, _symbol) {}

    function totalAssets() public view override returns (uint256) {}
}
