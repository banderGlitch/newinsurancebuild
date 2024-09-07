import { expect } from "chai";
import hre from "hardhat";
import { AbiCoder, encodeBytes32String, decodeBytes32String, ContractTransactionResponse } from "ethers";
import { VehicleManagement } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("VehicleManagement", async function () {
  let vehicleManagement: VehicleManagement & { deploymentTransaction(): ContractTransactionResponse; } ;
  let owner:HardhatEthersSigner, userA: HardhatEthersSigner ;
  let vehicle: { model: any; vehicleId: any; owner: any; purchaseDate: any; vin: any; color: any; plateNumber: any; createdAt: any; updatedAt: any; };
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  this.beforeAll(async () => {
    // Contracts are deployed using the first signer/account by default
    [owner, userA] = await hre.ethers.getSigners();
    const VehicleManagement = await hre.ethers.getContractFactory("VehicleManagement");
    vehicleManagement = await VehicleManagement.deploy();
    vehicle = {
      vehicleId: 1,
      owner: userA.address,
      model: "Mercedez",
      purchaseDate: Date.now(),
      vin: "1HGCM82633A123456",
      color: "Bronze",
      plateNumber: "KA01MN0100",
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await vehicleManagement.owner()).to.equal(owner.address);
    });
  });

  describe("Register Vehicle", function () {
    describe("Validations", function () {
      it("Should register a vehicle", async function () {
        console.log({model: encodeBytes32String(vehicle.model)});
        const abiCoder = AbiCoder.defaultAbiCoder();
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
        const tx = await vehicleManagement.registerVehicle(data);
        console.log("Vehicle Registration Hash: ", tx.hash);
        
      });

      it("Should return stored vehicle info", async function () {
        const vehicleDetails = await vehicleManagement.getVehicleByVehicleId(vehicle.vehicleId);
        console.log({vehicleDetails});
        console.log({decodedModel: decodeBytes32String(vehicleDetails[2])});
        expect(vehicleDetails[0]).to.be.eq(vehicle.vehicleId);
        expect(decodeBytes32String(vehicleDetails[2])).to.be.eq(vehicle.model);
      });

      it("Should return vehicle info by user", async function () {
        console.log({userA})
        const vehicleDetails = await vehicleManagement.connect(userA).getVehicleByAccount();
        console.log({vehicleDetails});
        console.log({decodedModel: decodeBytes32String(vehicleDetails[0].model)});
        expect(vehicleDetails[0].vehicleId).to.be.eq(vehicle.vehicleId);
        expect(decodeBytes32String(vehicleDetails[0].model)).to.be.eq(vehicle.model);
      });
     
    });
  });
});
