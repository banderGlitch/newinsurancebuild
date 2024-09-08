import hre from "hardhat";
import vehicles from "../mocks/userVehicle.json";
import { AbiCoder, encodeBytes32String } from "ethers";
import { VehicleManagement__factory } from "../typechain-types";

const vehicleContractAddress = `${process.env.HEDER_VEHICLE_CONTRACT_ADDRESS}`;

const abiCoder = AbiCoder.defaultAbiCoder();

const registerVehicles = async() => {
  const [acc1] = await hre.ethers.getSigners();
  console.log({acc1});
  const provider = new hre.ethers.JsonRpcProvider(`${process.env.HEDERA_RPC_RELAY_URL}`);
  const deployer = new hre.ethers.Wallet(`${process.env.HEDERA_ACCOUNT_PRIVATE_KEY}`, provider);
  const user2 = new hre.ethers.Wallet(`${process.env.USER2_PRIVATE_KEY}`, provider);
  console.log({deployer});
  // Create a contract instance
  const vehicleContract = VehicleManagement__factory.connect(vehicleContractAddress,deployer);
  for (let index = 0; index < vehicles.length; index++) {
    const vehicle = vehicles[index];
    const data = abiCoder.encode([
      "uint256", "address", "bytes32", "uint256", "bytes32", "bytes32", "bytes32", "uint256", "uint256"], [
      vehicle.vehicleId,
      vehicle.owner,
      encodeBytes32String(vehicle.model),
      vehicle.purchaseDate,
      encodeBytes32String(vehicle.vin),
      encodeBytes32String(vehicle.color),
      encodeBytes32String(vehicle.plateNumber),
      vehicle.createdAt,
      vehicle.updatedAt]);
      console.log({data});
    const tx = await vehicleContract.registerVehicle(data);
    console.log("Vehicle Registration Hash: ", tx.hash);
  }
  const vehicleContract1 = VehicleManagement__factory.connect(vehicleContractAddress, user2);
  const data = await vehicleContract1.getVehicleByAccount();
  console.log({data});
}

registerVehicles();