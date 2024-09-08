const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const amoyRpc = import.meta.env.VITE_AMOY_RPC;
const vehicleContract = import.meta.env.VITE_VEHICLE_CONTRACT;
const policyContractAddress = import.meta.env.VITE_POLICY_CONTRACT_ADDRESS;
const hederaAccountId = import.meta.env.VITE_MY_ACCOUNT_ID;
const hederaPrivateKey = import.meta.env.VITE_HEDERA_ACCOUNT_PRIVATE_KEY;
const hederaRpcRelayUrl = import.meta.env.VITE_HEDERA_RPC_RELAY_URL;
const hederaVehicleContract = import.meta.env.VITE_HEDER_VEHICLE_CONTRACT_ADDRESS;
const hederaPolicyContract = import.meta.env.VITE_HEDER_POLICY_CONTRACT_ADDRESS;
const rootstockRpcUrl = import.meta.env.VITE_ROOTSTOCK_RPC_URL;
const user2PrivateKey = import.meta.env.VITE_USER2_PRIVATE_KEY;



import React, { useEffect } from 'react';
import "dotenv/config";
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
    // rpcUrl: `${process.env.HEDERA_RPC_RELAY_URL}`,
    // contractAddress: `${process.env.HEDER_POLICY_CONTRACT_ADDRESS}`, // Contract address on Hedera Testnet
    // privateKey: `${process.env.HEDERA_ACCOUNT_PRIVATE_KEY}`
    rpcUrl: `${hederaRpcRelayUrl}`,
    contractAddress: `${hederaPolicyContract}`, // Contract address on Hedera Testnet
    privateKey: `${hederaPrivateKey}`
  },
  {
    chainId: 80002,
    name: 'Polygon Amoy',
    // rpcUrl: `${process.env.AMOY_RPC}`,
    // contractAddress: `${process.env.POLICY_CONTRACT_ADDRESS}`, // Contract address on Polygon Amoy
    // privateKey: `${process.env.PRIVATE_KEY}`
    rpcUrl: `${amoyRpc}`,
    contractAddress: `${policyContractAddress}`, // Contract address on Polygon Amoy
    privateKey: `${privateKey}`
  },
  // Add more networks as needed
];



console.log("env variable checking",privateKey, amoyRpc, hederaAccountId, rootstockRpcUrl); // for testing


// useEffect(()=>{
//   const getQuotation = async () => {
//     console.log("getQuotation",networks)
//     const policyManagement = new PolicyManagementService(networks);
//     const allQuotations: any = [];
//     const quotations = await policyManagement.getQuotations(296);
//     allQuotations.push(quotations);
//     const amoy_quotations = await policyManagement.getQuotations(80002);
//     allQuotations.push(amoy_quotations);
//     return allQuotations;
//   }

//   getQuotation();
// },[])

// useEffect(() => {
//   const getQuotation = async () => {
//     console.log("getQuotation", networks);
//     const policyManagement = new PolicyManagementService(networks);
//     const allQuotations: any = [];
//     const quotations = await policyManagement.getQuotations(296);
//     allQuotations.push(quotations);
//     const amoy_quotations = await policyManagement.getQuotations(80002);
//     allQuotations.push(amoy_quotations);
//     return allQuotations;
//   };

//   getQuotation();
// }, []); // Ensure that `networks` is defined correctly or included in the dependency array if needed

const getQuotation = async () => {
  console.log("getQuotation", networks);
  const policyManagement = new PolicyManagementService(networks);
  const allQuotations: any = [];
  const quotations = await policyManagement.getQuotations(296);
  allQuotations.push(quotations);
  const amoy_quotations = await policyManagement.getQuotations(80002);
  allQuotations.push(amoy_quotations);
  return allQuotations;
};


// const navigation_newquotes = "/user/newpolicy/newquotes"



const CoverageInput: React.FC<CoverageInputProps> = ({ coverageLimit, setCoverage }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    // Prepare the query parameters with coverageLimit
    const queryParams = new URLSearchParams({ coverageLimit: coverageLimit.toString() });
    
    // Navigate to the 'newquotes' route with the query parameters
    navigate(`/user/newpolicy/newquotes?${queryParams.toString()}`);
  };
  
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-4">
      <label className="text-sm font-semibold mr-2">Coverage:</label>
      <input
        type="text"
        value={coverageLimit}
        onChange={(e) => setCoverage(e.target.value)}
        className="w-1/3 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
       <button onClick={handleNavigate} className="ml-4 bg-blue-500 text-white px-2 py-0.5 rounded-md text-sm font-semibold hover:bg-blue-600 transition duration-200">
        Request Quotations
      </button>
    </div>
  );
};

export default CoverageInput;
