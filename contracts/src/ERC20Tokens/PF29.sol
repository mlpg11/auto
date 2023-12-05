// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Base} from "./Base.sol";

contract PF29 is Base {
    constructor()
        Base(
            "TESOURO PREFIXADO 2029",
            "PF29",
            "prefixado",
            block.timestamp + 6 * 365 days,
            0.00000000302 * 10 ** 12,
            0.059 * 10 ** 18
        )
    {}
}
