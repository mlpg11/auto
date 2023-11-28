// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {DrexMock} from "src/DrexMock.sol";
import {TesouroDireitoTokenizado} from "src/TesouroDireitoTokenizado.sol";
import {Script} from "forge-std/Script.sol";
import {IpcaOraculo} from "src/oraculos/IpcaOraculo.sol";
import {CdiOraculo} from "src/oraculos/CdiOraculo.sol";
import {TaxaDeJurosOraculo} from "src/oraculos/TaxaDeJurosOraculo.sol";
import "forge-std/console.sol";

contract DeployEnv is Script {
    TesouroDireitoTokenizado public tesouro;
    DrexMock public drex;
    IpcaOraculo public ipca;
    CdiOraculo public cdi;
    TaxaDeJurosOraculo public taxaDeJuros;

    address internal constant DEPLOYER = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    function run() public {
        vm.startBroadcast();

        tesouro = new TesouroDireitoTokenizado();
        drex = new DrexMock(address(tesouro));
        ipca = new IpcaOraculo(DEPLOYER);
        cdi = new CdiOraculo(DEPLOYER);
        taxaDeJuros = new TaxaDeJurosOraculo(DEPLOYER);

        console.log("Tesouro Direto Tokenizado: ", address(tesouro));
        console.log("DREX: ", address(drex));
        console.log("IPCA: ", address(ipca));
        console.log("CDI: ", address(cdi));
        console.log("Taxa de Juros: ", address(taxaDeJuros));

        vm.stopBroadcast();
    }
}
