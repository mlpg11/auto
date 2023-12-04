// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Base} from "./Base.sol";

contract IPCA35 is Base {
    constructor()
        Base(
            "TESOURO IPCA+ 2035",
            "IPCA35",
            "ipca",
            block.timestamp + 12 * 365 days,
            0.000000003615 * 10 ** 12,
            0.22 * 10 ** 18
        )
    {}
}
