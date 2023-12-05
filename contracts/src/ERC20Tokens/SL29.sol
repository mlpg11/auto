// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Base} from "./Base.sol";

contract SL29 is Base {
    constructor()
        Base(
            "TESOURO SELIC 2029",
            "SL29",
            "selic",
            block.timestamp + 6 * 365 days,
            0.000000003938 * 10 ** 12,
            1.37 * 10 ** 18
        )
    {}
}
