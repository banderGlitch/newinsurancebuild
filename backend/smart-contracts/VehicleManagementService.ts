import ethers from 'ethers';
// import axios from 'axios';
import {abi} from "./VehicleManagement.json";
import { NetworkConfig } from './PolicyManagementService';

// ABI of the VehicleManagement contract (you'll need to replace this with the actual ABI)
const Vehicle_ABI = abi;

class VehicleManagementBackend {
  private contracts: Map<number, ethers.Contract>;
  private signers: Map<number, ethers.Signer>;
  private networks: NetworkConfig[];
  // private wallet: ethers.ethers.Wallet;

  constructor(networks: NetworkConfig[]) {
    this.networks = networks;
    this.contracts = new Map();
    this.signers = new Map();

    networks.forEach(network => {
      console.log("network.rpcUrl: ",network.rpcUrl);
      const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
      const signer = new ethers.Wallet(network.privateKey, provider);
      this.signers.set(network.chainId, signer);
      this.contracts.set(network.chainId, new ethers.Contract(network.contractAddress, Vehicle_ABI, signer));
    });
  }

  private getContract(chainId: number): ethers.Contract {
    const contract = this.contracts.get(chainId);
    if (!contract) {
      throw new Error(`Contract not found for chain ID ${chainId}`);
    }
    return contract;
  }
  
  getNetworks(): NetworkConfig[] {
    return this.networks;
  }
  
  // async connectWallet(privateKey: string | ethers.ethers.SigningKey) {
  //   this.wallet = new ethers.Wallet(privateKey, this.provider);
  //   this.connectedContract = this.contract.connect(this.wallet);
  // }

  async registerVehicle(chainId: number, vehicleData: { vehicleId: any; owner: any; model: any; purchaseDate: any; vin: any; color: any; plateNumber: any; }) {
    const contract = this.getContract(chainId);
    // if (!this.connectedContract) {
    //   throw new Error('Wallet not connected');
    // }

    const encodedData = ethers.utils.defaultAbiCoder.encode(
      ['uint256', 'address', 'bytes32', 'uint256', 'bytes32', 'bytes32', 'bytes32', 'uint256', 'uint256'],
      [
        vehicleData.vehicleId,
        vehicleData.owner,
        ethers.utils.formatBytes32String(vehicleData.model),
        vehicleData.purchaseDate,
        ethers.utils.formatBytes32String(vehicleData.vin),
       ethers.utils.formatBytes32String(vehicleData.color),
       ethers.utils.formatBytes32String(vehicleData.plateNumber),
        Math.floor(Date.now() / 1000),  // createdAt
        Math.floor(Date.now() / 1000)   // updatedAt
      ]
    );

    const tx = await contract.registerVehicle(encodedData);
    return await tx.wait();
  }

  async getVehicleByAccount(chainId: number) {
    const contract = this.getContract(chainId);
    return await contract.getVehicleByAccount();
  }

  async getVehicleByVehicleId(chainId: number, vehicleId: number) {
    const contract = this.getContract(chainId);
    return await contract.getVehicleByVehicleId(vehicleId);
  }

  // async convertAmount(amount: number, fromToken: string, toToken: string) {
  //   const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${fromToken},${toToken}&vs_currencies=usd`);
  //   const fromTokenPriceUSD = response.data[fromToken].usd;
  //   const toTokenPriceUSD = response.data[toToken].usd;
    
  //   const convertedAmount = (amount * fromTokenPriceUSD) / toTokenPriceUSD;
  //   return convertedAmount;
  // }

  // async convertAmountToNative(amount: any, fromToken: any) {
  //   const nativeToken = NATIVE_TOKENS[this.network].toLowerCase();
  //   return await this.convertAmount(amount, fromToken, nativeToken);
  // }
}

module.exports = VehicleManagementBackend;