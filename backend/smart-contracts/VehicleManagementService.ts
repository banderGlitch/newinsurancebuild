import ethers from 'ethers';
import axios from 'axios';
import { VehicleManagement__factory } from './typechain-types';

// ABI of the VehicleManagement contract (you'll need to replace this with the actual ABI)
const Vehicle_ABI: ethers.Interface | ethers.InterfaceAbi = VehicleManagement__factory.abi;

// Contract addresses on different networks
const CONTRACT_ADDRESSES = {
  hedera_testnet: `${process.env.HEDER_POLICY_CONTRACT_ADDRESS}`, 
  polygon_amoy: `${process.env.POLICY_CONTRACT_ADDRESS}`,  
  // Add more networks as needed
};

// RPC URLs for different networks
const RPC_URLS = {
  hedera_testnet: `${process.env.HEDERA_RPC_RELAY_URL}`,
  polygon_amoy:`${process.env.AMOY_RPC}`,
  // Add more networks as needed
};

// Native token symbols for different networks
const NATIVE_TOKENS = {
  hedera_testnet: 'ETH',
  polygon_amoy: 'MATIC',
  // Add more networks as needed
};

class VehicleManagementBackend {
  constructor(network = 'hedera_testnet') {
    this.setNetwork(network);
  }

  setNetwork(network:any) {
    if (!CONTRACT_ADDRESSES[network]) {
      throw new Error(`Unsupported network: ${network}`);
    }
    this.network = network;
    this.provider = new ethers.providers.JsonRpcProvider(RPC_URLS[network]);
    this.contract = new ethers.Contract(CONTRACT_ADDRESSES[network], Vehicle_ABI, this.provider);
  }

  async connectWallet(privateKey) {
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.connectedContract = this.contract.connect(this.wallet);
  }

  async registerVehicle(vehicleData) {
    if (!this.connectedContract) {
      throw new Error('Wallet not connected');
    }

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

    const tx = await this.connectedContract.registerVehicle(encodedData);
    return await tx.wait();
  }

  async getVehicleByAccount() {
    return await this.contract.getVehicleByAccount();
  }

  async getVehicleByVehicleId(vehicleId) {
    return await this.contract.getVehicleByVehicleId(vehicleId);
  }

  async convertAmount(amount, fromToken, toToken) {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${fromToken},${toToken}&vs_currencies=usd`);
    const fromTokenPriceUSD = response.data[fromToken].usd;
    const toTokenPriceUSD = response.data[toToken].usd;
    
    const convertedAmount = (amount * fromTokenPriceUSD) / toTokenPriceUSD;
    return convertedAmount;
  }

  async convertAmountToNative(amount, fromToken) {
    const nativeToken = NATIVE_TOKENS[this.network].toLowerCase();
    return await this.convertAmount(amount, fromToken, nativeToken);
  }
}

module.exports = VehicleManagementBackend;