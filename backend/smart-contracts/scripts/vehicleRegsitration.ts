import { ethers } from "hardhat";
import { VehicleManagement__factory } from "../typechain-types";
import vehicles from "../mocks/userVehicle.json";
import { AbiCoder, encodeBytes32String } from "ethers";
const vehicleContractAddress = '0xYourContractAddressHere';

// Create a contract instance
const vehicleContract = VehicleManagement__factory.connect(vehicleContractAddress);
const abiCoder = AbiCoder.defaultAbiCoder();

const registerVehicles = async() => {
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
}

registerVehicles();
