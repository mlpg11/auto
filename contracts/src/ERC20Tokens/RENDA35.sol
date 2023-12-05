// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Base} from "./Base.sol";

contract RENDA35 is Base {
    constructor()
        Base(
            "RENDA+ 2035",
            "RENDA35",
            "renda+",
            block.timestamp + 12 * 365 days,
            0.000000003656 * 10 ** 12,
            0.13 * 10 ** 18
        )
    {}
}
