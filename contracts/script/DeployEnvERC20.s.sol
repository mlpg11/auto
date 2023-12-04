// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {SL26} from "src/ERC20Tokens/SL26.sol";
import {Script} from "forge-std/Script.sol";
import {PF29} from "src/ERC20Tokens/PF29.sol";
import {IPCA29} from "src/ERC20Tokens/IPCA29.sol";
import {IPCA35} from "src/ERC20Tokens/IPCA35.sol";
import {IPCA45} from "src/ERC20Tokens/IPCA45.sol";
import {PF26} from "src/ERC20Tokens/PF26.sol";
import {PF29} from "src/ERC20Tokens/PF29.sol";
import {RENDA30} from "src/ERC20Tokens/RENDA30.sol";
import {RENDA35} from "src/ERC20Tokens/RENDA35.sol";
import {RENDA40} from "src/ERC20Tokens/RENDA40.sol";
import {SL29} from "src/ERC20Tokens/SL29.sol";
import "forge-std/console2.sol";

contract DeployEnvERC20 is Script {
    SL26 sl26;
    PF29 pf29;
    IPCA29 ipca29;
    IPCA35 ipca35;
    IPCA45 ipca45;
    PF26 pf26;
    RENDA30 renda30;
    RENDA35 renda35;
    RENDA40 renda40;
    SL29 sl29;

    function run() external {
        vm.startBroadcast();

        sl26 = new SL26();
        pf29 = new PF29();
        ipca29 = new IPCA29();
        ipca35 = new IPCA35();
        ipca45 = new IPCA45();
        pf26 = new PF26();
        renda30 = new RENDA30();
        renda35 = new RENDA35();
        renda40 = new RENDA40();
        sl29 = new SL29();

        console2.log("SL26: ", address(sl26));
        console2.log("PF29: ", address(pf29));
        console2.log("IPCA29: ", address(ipca29));
        console2.log("IPCA35: ", address(ipca35));
        console2.log("IPCA45: ", address(ipca45));
        console2.log("PF26: ", address(pf26));
        console2.log("RENDA30: ", address(renda30));
        console2.log("RENDA35: ", address(renda35));
        console2.log("RENDA40: ", address(renda40));
        console2.log("SL29: ", address(sl29));
        
        vm.stopBroadcast();
    }
}
