// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract Principal {
    enum Tesourarias {
        Resgate_Imediato,
        Vencimento_2028,
        Vencimento_2027,
        Vencimento_2026,
        Vencimento_2025,
        Vencimento_2024
    }

    mapping(Tesourarias => address) private _fundos;

    function deposit(Tesourarias _tesouraria, uint256 _amount) public returns (uint256 shares) {
        //_fundos[_tesouraria] += _amount;
    }
}
