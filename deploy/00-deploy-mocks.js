const { network } = require("hardhat");
const { developmentChain, DECIMALS, INITIAL_ANSWER } = require('../helper-hardhat-config');

module.exports = async ({
    getNamedAccounts, deployments
}) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    if(developmentChain.includes(network.name)) {
        // or here u can use chainId as 31337 ie chainId == 31337
        // this is for hardhat chainId
        log('Local Network Detected! Deploying Mock Contract...')
        await deploy('MockV3Aggregator', {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            // args: [DECIMALS, INITIAL_ANSWER] // this is useful when you are using 0.6.0 AggregatorV3PriceFeed
            args: []
        });
        log('Mock Deployed!')
        log('----------------------------------------')
    }

}

module.exports.tags = ['all','mocks'];