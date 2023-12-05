// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Script} from "forge-std/Script.sol";
import {IpcaOraculo} from "src/oraculos/IpcaOraculo.sol";
import {TaxaDeJurosOraculo} from "src/oraculos/TaxaDeJurosOraculo.sol";
import {CdiOraculo} from "src/oraculos/CdiOraculo.sol";
import "forge-std/console.sol";

contract DeployOraculos is Script {
    IpcaOraculo ipca;
    TaxaDeJurosOraculo taxaDeJuros;
    CdiOraculo cdi;

    address GOV = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    function run() external {
        vm.startBroadcast();

        ipca = new IpcaOraculo(GOV);
        // taxaDeJuros = new TaxaDeJurosOraculo(GOV);
        // cdi = new CdiOraculo(GOV);

        console.log("ipca: ", address(ipca));
        console.log("taxaDeJuros: ", address(taxaDeJuros));
        console.log("cdi: ", address(cdi));

        vm.stopBroadcast();
    }
}
