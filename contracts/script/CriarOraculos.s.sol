// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Script} from "forge-std/Script.sol";
import {CdiOraculo} from "src/Oraculos/CdiOraculo.sol";
import {IpcaOraculo} from "src/Oraculos/IpcaOraculo.sol";
import {TaxaDeJurosOraculo} from "src/Oraculos/TaxaDeJurosOraculo.sol";
import "forge-std/console2.sol";

contract CriarOraculos is Script {
    CdiOraculo cdiOraculo;
    IpcaOraculo ipcaOraculo;
    TaxaDeJurosOraculo taxaDeJurosOraculo;

    address sender = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    function run() external {
        vm.startBroadcast();

        cdiOraculo = new CdiOraculo(sender);
        ipcaOraculo = new IpcaOraculo(sender);
        taxaDeJurosOraculo = new TaxaDeJurosOraculo(sender);

        console2.log("CdiOraculo: ", address(cdiOraculo));
        console2.log("IpcaOraculo: ", address(ipcaOraculo));
        console2.log("TaxaDeJurosOraculo: ", address(taxaDeJurosOraculo));

        vm.stopBroadcast();
    }
}