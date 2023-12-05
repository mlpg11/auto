// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Base} from "./Base.sol";

contract PF26 is Base {
    constructor()
        Base(
            "TESOURO PREFIXADO 2026",
            "PF26",
            "prefixado",
            block.timestamp + 3 * 365 days,
            0.000000003202 * 10 ** 12,
            0.08 * 10 ** 18
        )
    {}
}
