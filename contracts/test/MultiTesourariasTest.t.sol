// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/console.sol";
import "forge-std/Test.sol";
import {TesouroDireitoTokenizado} from "src/TesouroDireitoTokenizado.sol";
import {DrexMock} from "src/DrexMock.sol";
import {ERC20} from "solmate/src/mixins/ERC4626.sol";

contract MultiTesourariasTest is Test {
    TesouroDireitoTokenizado private _multiTesourarias;
    DrexMock private _drex;

    address internal constant GOV = address(bytes20("GOV"));
    address internal constant USER = address(bytes20("USER"));

    function setUp() external {
        vm.startPrank(GOV);

        _multiTesourarias = new TesouroDireitoTokenizado();
        _drex = new DrexMock(address(_multiTesourarias), GOV);

        _multiTesourarias.setarDrex(_drex);

        uint256[] memory duracoes = new uint256[](3);
        duracoes[0] = 365 days;
        duracoes[1] = 2 * 365 days;
        duracoes[2] = 3 * 365 days;

        uint256[] memory multiplicadores = new uint256[](3);
        multiplicadores[0] = 2e12;
        multiplicadores[1] = 3e12;
        multiplicadores[2] = 4e12;

        _multiTesourarias.ajustarMultiplicadores(duracoes, multiplicadores);

        vm.stopPrank();
    }

    function test_depositar_sem_lock() public {
        vm.startPrank(USER);

        deal(address(_drex), USER, 100e18);

        _drex.approve(address(_multiTesourarias), 100e18);

        _multiTesourarias.depositar("Ok", TesouroDireitoTokenizado.Tipos_Titulo.IPCA, 200, 0, 100e18, 0);

        console.log("URI: %s", _multiTesourarias.tokenURI(0));

        assertEq(_multiTesourarias.totalAssets(), 100e18);
        assertEq(_multiTesourarias.totalSupply(), 100e18);
        assertEq(_multiTesourarias.currentId(), 1);

        vm.stopPrank();
    }

    function test_shares_increse_value() external {
        test_depositar_sem_lock();

        vm.startPrank(GOV);

        deal(address(_drex), GOV, 100e18);

        _drex.approve(address(_multiTesourarias), 100e18);
        _multiTesourarias.depositarRendimento(100e18);

        assertEq(_multiTesourarias.totalAssets(), 200e18);
        assertEq(_multiTesourarias.totalSupply(), 100e18);
    }

    function test_depositar_multiplicador_1_ano() public {
        vm.startPrank(USER);

        uint256 depositoInicialUsuario = 100e18;

        deal(address(_drex), USER, depositoInicialUsuario);

        _drex.approve(address(_multiTesourarias), depositoInicialUsuario);

        _multiTesourarias.depositar("Ok", TesouroDireitoTokenizado.Tipos_Titulo.IPCA, 200, 365 days, depositoInicialUsuario, 1);

        assertEq(_multiTesourarias.totalAssets(), depositoInicialUsuario);
        assertEq(_multiTesourarias.totalSupply(), depositoInicialUsuario);
        assertEq(_multiTesourarias.currentId(), 1);

        vm.stopPrank();

        vm.startPrank(GOV);

        deal(address(_drex), GOV, 100e18);

        _drex.approve(address(_multiTesourarias), 100e18);

        _multiTesourarias.depositarRendimento(100e18);

        assertEq(_multiTesourarias.totalAssets(), 200e18);
        assertEq(_multiTesourarias.totalSupply(), 100e18);

        vm.stopPrank();

        vm.startPrank(USER);

        _multiTesourarias.retirar(0);

        assertEq(_drex.balanceOf(USER), 400e18);
        assertEq(_drex.balanceOf(address(_multiTesourarias)), 0);
        assertEq(_multiTesourarias.totalAssets(), 0);
        assertEq(_multiTesourarias.totalSupply(), 0);
    }

    function assercoes_nft() private {}
}
