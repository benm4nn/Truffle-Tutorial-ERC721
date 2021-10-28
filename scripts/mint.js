const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
const fs = require('fs');
const path = require("path");
require('dotenv').config();

//*vars
const MNEMONIC = process.env.MNEMONIC
const API_KEY = process.env.NODE_KEY
const BASE_URL = process.env.BASE_URL

//* Remember to write the nft address in the .env file after deploying the contract
//const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
//const OWNER_ADDRESS = process.env.OWNER_ADDRESS

const NFT_CONTRACT_ADDRESS = "0x3Ce4121E6F081bbdD82cD084C9EE1673f5029B84"
const OWNER_ADDRESS = "0xBb5859a11b88721a7004a2AA0f0874Db2819d379"

const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`
//const MAX_NUMBER = 10000;
const NUM_ITEMS = 3;

//*Parse the contract artifact for ABI reference.
let rawdata = fs.readFileSync(path.resolve(__dirname, "../build/contracts/KrazyPhace.json"));
//let rawdata = fs.readFileSync("../build/contracts/KrazyPhace.json");
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi

async function main() {

  try {
    //*define web3, contract and wallet instances
    const provider = new HDWalletProvider(
      MNEMONIC,
      MUMBAI
    );

    const web3Instance = new web3(provider);

    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
    );

      //* just mint 

    await nftContract.methods
      .mintItem(OWNER_ADDRESS, "https://krazyphaces.herokuapp.com/api/token/")
      .send({ from: OWNER_ADDRESS, gasPrice: "150000000000", gas: "3000000", chainId: 80001, networkCheckTimeout: 90000}).then(console.log('minted')).catch(error => console.log(error));
 
    //* mint a certain number
    /*
    for (var i = 1; i < NUM_ITEMS; i++) {
      await nftContract.methods
        .mintItem(OWNER_ADDRESS, BASE_URL)
        .send({ from: OWNER_ADDRESS }).then(console.log('minted nft '+i)).catch(error => console.log(error));
    }
    */
    
  }
  
  catch (e) {
    console.log(e)
  }
}

//invoke
main().then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
