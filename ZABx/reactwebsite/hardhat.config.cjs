require("@nomicfoundation/hardhat-toolbox");
//require("@nomiclabs/hardhat-waffle");

//require("@nomiclabs/hardhat-ethers");
const GOERLI_PRIVATE_KEY = "0363d286c6ecde9b889fac9bf99eb95d48abbe2a5fc7fce6330e0543afdd657d";
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/83e9617157d0427f91eae890fbfaef9c`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};


//const { ethers } = require('hardhat');

//async function main() {
 // const provider = new ethers.providers.JsonRpcProvider();
//  const blockNumber = await provider.getBlockNumber();
//  console.log("Latest block number:", blockNumber);
//}

//main()
 // .then(() => process.exit(0))
 // .catch(error => {
  //  console.error(error);
  ///  process.exit(1);
  //});

