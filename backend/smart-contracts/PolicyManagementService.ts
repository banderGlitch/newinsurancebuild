import { ethers } from 'ethers';
import {abi} from "./PolicyManagement.json";
// ABI of the PolicyManagement contract

const Policy_ABI = abi;

export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  contractAddress: string;
  privateKey: string;
}
export interface Quotation {
   quotationId: number;
   chain: number;
   premium: number;
   insurer: string;
   coverage: number;
   coverageUsed: number;
   createdAt: number;
   updatedAt: number;
}

export class PolicyManagementService {
  private contracts: Map<number, ethers.Contract>;
  private signers: Map<number, ethers.Signer>;
  private networks: NetworkConfig[];

  constructor(networks: NetworkConfig[]) {
    this.networks = networks;
    this.contracts = new Map();
    this.signers = new Map();

    networks.forEach(network => {
      const provider = new ethers.JsonRpcProvider(network.rpcUrl);
      const signer = new ethers.Wallet(network.privateKey, provider);
      this.signers.set(network.chainId, signer);
      this.contracts.set(network.chainId, new ethers.Contract(network.contractAddress, Policy_ABI, signer));
    });
  }

  private getContract(chainId: number): ethers.Contract {
    const contract = this.contracts.get(chainId);
    if (!contract) {
      throw new Error(`Contract not found for chain ID ${chainId}`);
    }
    return contract;
  }

  async addQuotation(chainId: number, premium: number, coverage: number, chain: number): Promise<number> {
    const contract = this.getContract(chainId);
    const tx = await contract.addQuotation(premium, coverage, chain);
    const receipt = await tx.wait();
    const event = receipt.events?.find((e: { event: string; }) => e.event === 'QuotationAdded');
    return receipt;
  }

  async updateQuotation(chainId: number, quotationId: number, premium: number, coverage: number): Promise<void> {
    const contract = this.getContract(chainId);
    const tx = await contract.updateQuotation(quotationId, premium, coverage);
    await tx.wait();
  }

  async getQuotations(chainId: number): Promise<Quotation[]> {
    const contract = this.getContract(chainId);
    const tx = await contract.getQuotations(); 
    return tx;
  }

  async createPolicy(chainId: number, vehicleId: number, quotationIds: number[]): Promise<number> {
    const contract = this.getContract(chainId);
    const tx = await contract.createPolicy(vehicleId, quotationIds);
    const receipt = await tx.wait();
    const event = receipt.events?.find((e: { event: string; }) => e.event === 'PolicyCreated');
    return event?.args?.policyId.toNumber();
  }

  async requestClaim(chainId: number, policyId: number, claimAmount: number, reason: string): Promise<number> {
    const contract = this.getContract(chainId);
    const tx = await contract.requestClaim(policyId, claimAmount, ethers.encodeBytes32String(reason));
    const receipt = await tx.wait();
    const event = receipt.events?.find((e: { event: string; }) => e.event === 'ClaimRequested');
    return event?.args?.claimId.toNumber();
  }

  async approveClaim(chainId: number, claimId: number): Promise<void> {
    const contract = this.getContract(chainId);
    const tx = await contract.approveClaim(claimId);
    await tx.wait();
  }

  async denyClaim(chainId: number, claimId: number): Promise<void> {
    const contract = this.getContract(chainId);
    const tx = await contract.denyClaim(claimId);
    await tx.wait();
  }

  async getPolicy(chainId: number, policyId: number): Promise<any> {
    const contract = this.getContract(chainId);
    return contract.getPolicy(policyId);
  }

  async getUserPolicies(chainId: number, userAddress: string): Promise<number[]> {
    const contract = this.getContract(chainId);
    const policies = await contract.getUserPolicies(userAddress);
    return policies.map((id: ethers.BigNumberish) => Number(id));
  }

  async getInsurerPolicies(chainId: number, insurerAddress: string): Promise<number[]> {
    const contract = this.getContract(chainId);
    const policies = await contract.getInsurerPolicies(insurerAddress);
    return policies.map((id: ethers.BigNumberish) => Number(id));
  }

  async getClaim(chainId: number, claimId: number): Promise<any> {
    const contract = this.getContract(chainId);
    return contract.getClaim(claimId);
  }

  async getPolicyClaims(chainId: number, policyId: number): Promise<number[]> {
    const contract = this.getContract(chainId);
    const claims = await contract.getPolicyClaims(policyId);
    return claims.map((id: ethers.BigNumberish) => Number(id));
  }

  getNetworks(): NetworkConfig[] {
    return this.networks;
  }
}

const networks: NetworkConfig[] = [
  {
    chainId: 296,
    name: 'Hedera Testnet',
    rpcUrl: `${process.env.HEDERA_RPC_RELAY_URL}`,
    contractAddress: `${process.env.HEDER_POLICY_CONTRACT_ADDRESS}`, // Contract address on Hedera Testnet
    privateKey: `${process.env.USER2_PRIVATE_KEY}`
  },
  {
    chainId: 80002,
    name: 'Polygon Amoy',
    rpcUrl: `${process.env.AMOY_RPC}`,
    contractAddress: `${process.env.POLICY_CONTRACT_ADDRESS}`, // Contract address on Polygon Amoy
    privateKey: `${process.env.PRIVATE_KEY}`
  },
  // Add more networks as needed
];
// Example usage
export async function main() {
  

  const policyManagement = new PolicyManagementService(networks);

  try {
    // Add a quotation on Hedera Testnet
    const quotationIdEth = await policyManagement.addQuotation(296, 200, 1000, 296);
    console.log('Added quotation on Hedera Testnet:', quotationIdEth);
    // const quotationIdEth1 = await policyManagement.addQuotation(296, 300, 2000, 296);
    // console.log('Added quotation on Hedera Testnet:', quotationIdEth1);
    // const quotationIdEth2 = await policyManagement.addQuotation(296, 400, 3000, 296);
    // console.log('Added quotation on Hedera Testnet:', quotationIdEth2);
    // const quotationIdEth3 = await policyManagement.addQuotation(296, 500, 2000, 296);
    // console.log('Added quotation on Hedera Testnet:', quotationIdEth3);
    // const quotationIdEth = await policyManagement.addQuotation(80002, 100, 1000, 80002);
    // console.log('Added quotation on Polygon Amoy:', quotationIdEth);
    // const quotationIdEth1 = await policyManagement.addQuotation(80002, 200, 2000, 80002);
    // console.log('Added quotation on Polygon Amoy:', quotationIdEth1);
    // const quotations = await policyManagement.getQuotations(80002);
    // console.log('Added quotation on Hedera Testnet:', quotations);
     const quotations = await policyManagement.getQuotations(296);
      console.log('Added quotation on Hedera Testnet:', quotations);
    
    // Create a policy on Polygon Amoy
    // const policyIdPolygon = await policyManagement.createPolicy(80002, 123, [1]); // Assuming quotation ID 1 exists on Polygon
    // console.log('Created policy on Polygon:', policyIdPolygon);

    // // Request a claim on Polygon
    // const claimIdPolygon = await policyManagement.requestClaim(80002, policyIdPolygon, 500, 'Car accident');
    // console.log('Requested claim on Polygon:', claimIdPolygon);

    // // Approve the claim on Polygon
    // await policyManagement.approveClaim(80002, claimIdPolygon);
    // console.log('Approved claim on Polygon:', claimIdPolygon);

    // // Get policy details from Polygon
    // const policyPolygon = await policyManagement.getPolicy(80002, policyIdPolygon);
    // console.log('Policy details on Polygon:', policyPolygon);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();