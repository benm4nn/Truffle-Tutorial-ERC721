const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
const fs = require('fs');
const path = require("path");
require('dotenv').config()

const MNEMONIC = process.env.MNEMONIC
const API_KEY = process.env.NODE_KEY

const NFT_CONTRACT_ADDRESS = "0x3Ce4121E6F081bbdD82cD084C9EE1673f5029B84"
const OWNER_ADDRESS = "0xBb5859a11b88721a7004a2AA0f0874Db2819d379"
const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`
const NUM_ITEMS = 5;


let rawdata = fs.readFileSync(path.resolve(__dirname, "../build/contracts/KrazyPhace.json"));
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi

async function test() {

      try {
            const provider = new HDWalletProvider(
                  MNEMONIC, MUMBAI
            );
            const web3Instance = new web3(provider);


            const nftContract = new web3Instance.eth.Contract(
                  NFT_ABI,
                  NFT_CONTRACT_ADDRESS,
            );

            //? Edit: Check the uri of token 1.
   
                  await nftContract.methods
                        .tokenURI(1).call().then((receipt) => {
                              console.log(receipt)
                        }).catch(err => console.log(err))

      }

      catch (e) {
            console.log(e)
      }
}


test().then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});