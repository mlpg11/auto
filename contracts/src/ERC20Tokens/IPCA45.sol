// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Base} from "./Base.sol";

contract IPCA45 is Base {
    constructor()
        Base(
            "TESOURO IPCA+ 2045",
            "IPCA45",
            "ipca",
            block.timestamp + 22 * 365 days,
            0.000000003556 * 10 ** 12,
            0.12 * 10 ** 18
        )
    {}
}
