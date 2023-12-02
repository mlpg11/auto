// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {DrexMock} from "src/DrexMock.sol";
import {TesouroDireitoTokenizado} from "src/TesouroDireitoTokenizado.sol";
import {Script} from "forge-std/Script.sol";
import {IpcaOraculo} from "src/oraculos/IpcaOraculo.sol";
import {CdiOraculo} from "src/oraculos/CdiOraculo.sol";
import {TaxaDeJurosOraculo} from "src/oraculos/TaxaDeJurosOraculo.sol";
import "forge-std/console.sol";

contract CriarDeposito is Script {
    TesouroDireitoTokenizado tokenizado = TesouroDireitoTokenizado(0x20F5f006a0184883068bBF58fb0c526A8EEa8BFD);
    DrexMock drex = DrexMock(0x975cDd867aCB99f0195be09C269E2440aa1b1FA8);

    function run() external {
        vm.startBroadcast();

        drex.approve(address(tokenizado), 200e18);
        tokenizado.depositar("Tesouro Selic", TesouroDireitoTokenizado.Tipos_Titulo.SELIC, 152, 365 days * 2, 200e18, 1);

        vm.stopBroadcast();
    }
}