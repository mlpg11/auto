// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Base} from "./Base.sol";

contract RENDA30 is Base {
    constructor()
        Base("RENDA+ 2030", "RENDA30", "renda+", block.timestamp + 7 * 365 days, 0.000000003637 * 10 ** 12, 0.18 * 10 ** 18)
    {}
}
