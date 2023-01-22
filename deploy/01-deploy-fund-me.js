const { network } = require("hardhat");
const { networkConfig, developmentChain } = require('../helper-hardhat-config');
const { verify } = require("../utils/verify");

module.exports = async ({
    getNamedAccounts, deployments
}) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    // if contract does't define we have deploy minimal version of contract
    // for our local testing , so we need to create here mocked network
    let ethUsdPriceFeed;
    if(developmentChain.includes(network.name)) {
        let ethUsdMockV3Aggregator = await deployments.get('MockV3Aggregator');
        ethUsdPriceFeed = ethUsdMockV3Aggregator.address;
    } else {
        ethUsdPriceFeed = networkConfig[chainId]['ethUsdPriceFeed'];
    }

    let args = [ethUsdPriceFeed];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmation: network.config.blockConfirmation || 1
    });
    log('FundMe Contract Deployed!');
    log('------------------------------------')

    if(!developmentChain.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(fundMe.address, args);
    }
}

module.exports.tags = ['all', 'fundme'];