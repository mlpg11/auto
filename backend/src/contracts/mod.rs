//pub mod abis;
use ethers::contract::abigen;

abigen!(BaseOraculo, "src/contracts/abis/BaseOraculo.json",);
