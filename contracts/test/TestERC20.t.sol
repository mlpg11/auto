// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/console.sol";
import "forge-std/Test.sol";
import {ERC20} from "solmate/src/mixins/ERC4626.sol";
import {Base} from "src/ERC20Tokens/Base.sol";

contract OO is Base {
    constructor(
        string memory _titulo,
        string memory _nomeToken,
        string memory _tipo,
        uint256 _vencimento,
        uint256 _rentabilidade,
        uint256 _valorConversao
    ) Base(_titulo, _nomeToken, _tipo, _vencimento, _rentabilidade, _valorConversao) {}
}

contract TestERC20 is Test {
    address internal constant GOV = address(bytes20("GOV"));
    address internal constant USER = address(bytes20("USER"));

    Base internal base;

    uint256 internal constant PONTOS_BASE = 1e12;

    function setUp() external {
        vm.createSelectFork(vm.rpcUrl("RPC"));

        base = new OO(
            "TESOURO SELIC 2026",
            "SL26",
            "selic",
            block.timestamp + (365 days * 3),
            // Rentabilidade 10% a.a
            10 * 10 ** 12,
            // Valor de um titulo em ETH
            0.5 * 10 ** 18
        );

        deal(address(base), 1_000 ether);
    }

    function test_deposito() external {
        deal(USER, 0.1 ether);

        vm.startPrank(USER, USER);

        base.comprar{value: 0.1 ether}();

        // Asserssertions
        console.log("Saldo do usuario: ", base.balanceOf(USER));

        vm.warp(block.timestamp + 365 days);

        uint256 snapshotBefore = address(USER).balance;

        base.resgatar(0);

        uint256 snapshotAfter = address(USER).balance;

        console.log("Difference: ", snapshotAfter - snapshotBefore);
    }
}
