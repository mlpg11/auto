// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Base} from "./Base.sol";

contract SL26 is Base {
    constructor()
        Base(
            "TESOURO SELIC 2026",
            "SL26",
            "selic",
            block.timestamp + 3 * 365 days,
            0.00000000302 * 10 ** 12,
            0.5 * 10 ** 18
        )
    {}
}
