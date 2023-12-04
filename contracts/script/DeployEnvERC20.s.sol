// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {SL26} from "src/ERC20Tokens/SL26.sol";
import {Script} from "forge-std/Script.sol";
import {PF29} from "src/ERC20Tokens/PF29.sol";

contract DeployEnvERC20 is Script {
    function run() external {
        vm.startBroadcast();

        PF29 sl = new PF29();

        vm.stopBroadcast();
    }
}
