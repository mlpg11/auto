// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Base} from "./Base.sol";

contract IPCA29 is Base {
    constructor()
        Base(
            "TESOURO IPCA+ 2029",
            "IPCA29",
            "ipca",
            block.timestamp + 6 * 365 days,
            0.000000003564 * 10 ** 12,
            0.31 * 10 ** 18
        )
    {}
}
