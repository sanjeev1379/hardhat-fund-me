const networkConfig = {
    5: {
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        name: "goerli"
    },
    137: {
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
        name: "polygon"
    },
}

const developmentChain = ['localhost','hardhat'];

const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

module.exports = {
    networkConfig,
    developmentChain,
    DECIMALS,
    INITIAL_ANSWER
}