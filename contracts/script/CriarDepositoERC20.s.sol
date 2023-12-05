// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {SL26} from "src/ERC20Tokens/SL26.sol";
import {Script} from "forge-std/Script.sol";

contract CriarDepositoERC20Script is Script {
    SL26 public sl = SL26(payable(0x9A86494Ba45eE1f9EEed9cFC0894f6C5d13a1F0b));
    address sender = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    function run() external {
        vm.startBroadcast(sender);

        sl.comprar{value: 0.1 ether}();
        //sl.comprar{value: 0.2 ether}();

        vm.stopBroadcast();
    }
}
