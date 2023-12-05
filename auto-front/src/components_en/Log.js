const { ethers, AbiCoder} = require('ethers');

async function returnLog() {
    // Create a new provider instance for the Arbitrum node
    const rpc = new ethers.JsonRpcProvider('https://auto-fork-arbitrum-production.up.railway.app/');

    const firstRouter = '0x9A86494Ba45eE1f9EEed9cFC0894f6C5d13a1F0b';

    const eventSig = 'TituloComprado(string,uint256,uint256,address)';

    const GENESIS_FIRST_ROUTER = 18703218;
    const END_FIRST_ROUTER = await rpc.getBlockNumber();

    const filter = {
        address: firstRouter,
        topics: ['0x5df3120f646622144afd420317de6c6346e982e24b89712a0da9d103f805a718'],
        fromBlock: GENESIS_FIRST_ROUTER,
        toBlock: END_FIRST_ROUTER,
    };

    const logs = await rpc.getLogs(filter);

    for (const log of logs) {
        const data = log.data;

        const logger =  AbiCoder.defaultAbiCoder().decode(['string', 'uint256', 'uint256', 'address'], data);

        console.log(logger);
    }
}