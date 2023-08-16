const hre = require("hardhat");

async function main() {
  const ZABxToken = await hre.ethers.getContractFactory("ZABxToken");
  const zabxtoken = await ZABxToken.deploy();

  await zabxtoken.deployed();

  console.log("Library deployed to:", zabxtoken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// const hre = require("hardhat");

// async function main() {
//   const ZABxToken = await hre.ethers.getContractFactory("ZABxToken");
//   const zabxtoken = await ZABxToken.deploy();
// //await upload.deployed();
// await zabxtoken.waitForDeployment();
// console.log(
//   `Lock with ETH and unlock timestamp deployed to ${zabxtoken.target}`
// );
// }
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });