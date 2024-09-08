import { ethers } from "hardhat";

async function main() {
  //Assign the first signer, which comes from the first privateKey from our configuration in hardhat.config.js, to a wallet variable.
  let wallet = (await ethers.getSigners())[0];
  console.log({wallet});
  //Initialize a contract factory object
  //name of contract as first parameter
  //wallet/signer used for signing the contract calls/transactions with this contract
  const VehicleManagement = await ethers.getContractFactory("VehicleManagement", wallet);
  //Using already initialized contract factory object with our contract, we can invoke deploy function to deploy the contract.
  const vehicleManagement = await VehicleManagement.deploy();
  //We use wait to receive the transaction (deployment) receipt, which contains contractAddress
  const txReceipt = await vehicleManagement.deploymentTransaction()?.wait();
  const contractAddress = txReceipt?.contractAddress;
  console.log(`VehicleManagement deployed to: ${contractAddress}`);

  const PolicyManagement = await ethers.getContractFactory("PolicyManagement", wallet);
  //Using already initialized contract factory object with our contract, we can invoke deploy function to deploy the contract.
  const policyManagement = await PolicyManagement.deploy();
  //We use wait to receive the transaction (deployment) receipt, which contains contractAddress
  const policyTxReceipt = await policyManagement.deploymentTransaction()?.wait();
  const policycontractAddress = policyTxReceipt?.contractAddress;
  console.log(`PolicyManagement deployed to: ${policycontractAddress}`);

  return contractAddress;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});