import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {PolicyManagementService,NetworkConfig} from "../../../backend/smart-contracts/PolicyManagementService.ts";
interface CoverageInputProps {
    coverageLimit: number;
  setCoverage: (value: any) => void;
}

const networks: NetworkConfig[] = [
  {
    chainId: 296,
    name: 'Hedera Testnet',
    rpcUrl: `${process.env.HEDERA_RPC_RELAY_URL}`,
    contractAddress: `${process.env.HEDER_POLICY_CONTRACT_ADDRESS}`, // Contract address on Hedera Testnet
    privateKey: `${process.env.HEDERA_ACCOUNT_PRIVATE_KEY}`
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


useEffect(()=>{
  const getQuotation = async () => {
    console.log("getQuotation",networks)
    const policyManagement = new PolicyManagementService(networks);
    const allQuotations: any = [];
    const quotations = await policyManagement.getQuotations(296);
    allQuotations.push(quotations);
    const amoy_quotations = await policyManagement.getQuotations(80002);
    allQuotations.push(amoy_quotations);
    return allQuotations;
  }

  getQuotation();
},[])

const CoverageInput: React.FC<CoverageInputProps> = ({ coverageLimit, setCoverage }) => {
  const navigation = useNavigate()
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-4">
      <label className="text-sm font-semibold mr-2">Coverage:</label>
      <input
        type="text"
        value={coverageLimit}
        onChange={(e) => setCoverage(e.target.value)}
        className="w-1/3 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
       <button onClick={() => navigation("/user/newpolicy/newquotes")} className="ml-4 bg-blue-500 text-white px-2 py-0.5 rounded-md text-sm font-semibold hover:bg-blue-600 transition duration-200">
        Request Quotations
      </button>
    </div>
  );
};

export default CoverageInput;
