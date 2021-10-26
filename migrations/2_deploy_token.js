const nft = artifacts.require("KrazyPhace");

module.exports = async function (deployer) {
 await deployer.deploy(nft);
};
