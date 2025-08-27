const hre = require("hardhat");

async function main() {
  console.log("Deploying HybridStorage contract...");
  
  const HybridStorage = await hre.ethers.getContractFactory("HybridStorage");
  const hybridStorage = await HybridStorage.deploy();
  
  await hybridStorage.waitForDeployment();
  
  const contractAddress = await hybridStorage.getAddress();
  console.log("HybridStorage deployed to:", contractAddress);
  
  // Get the deployer address
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployed by:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());
  
  console.log("\nNext steps:");
  console.log("1. Verify contract: npx hardhat verify --network sepolia", contractAddress);
  console.log("2. View on Etherscan: https://sepolia.etherscan.io/address/" + contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});