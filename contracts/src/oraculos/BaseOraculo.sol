// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

abstract contract BaseOraculo {
    mapping(address => bool) public autorizado;

    uint256 public ultimoValor;

    constructor(address _administradorOraculo) {
        autorizado[_administradorOraculo] = true;
    }

    function setarValor(uint256 _valor) external somenteAutorizado {
        ultimoValor = _valor;
    }

    modifier somenteAutorizado() {
        require(autorizado[msg.sender], "Oraculo: somente autorizado");
        _;
    }
}
