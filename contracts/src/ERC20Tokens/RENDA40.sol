// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Base} from "./Base.sol";

contract RENDA40 is Base {
    constructor()
        Base("RENDA+ 2040", "RENDA40", "renda+", block.timestamp + 17 * 365 days, 0.000000003662 * 10 ** 12, 0.1 * 10 ** 18)
    {}
}
