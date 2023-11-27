// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {BaseOraculo} from "src/oraculos/BaseOraculo.sol";

contract TaxaDeJurosOraculo is BaseOraculo {
    constructor(address _administradorOraculo) BaseOraculo(_administradorOraculo) {}
}
