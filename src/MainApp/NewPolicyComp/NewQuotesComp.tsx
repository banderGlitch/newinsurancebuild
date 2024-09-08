const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const amoyRpc = import.meta.env.VITE_AMOY_RPC;
const policyContractAddress = import.meta.env.VITE_POLICY_CONTRACT_ADDRESS;
const hederaPrivateKey = import.meta.env.VITE_USER2_PRIVATE_KEY;
const hederaRpcRelayUrl = import.meta.env.VITE_HEDERA_RPC_RELAY_URL;
const hederaPolicyContract = import.meta.env.VITE_HEDER_POLICY_CONTRACT_ADDRESS;



import React, { useState, useEffect } from 'react';
import InsuranceIcon from '../../components/InsuranceIcon';
import InsurerTable from './InsurerTable';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PolicyManagementService, NetworkConfig } from "../../../backend/smart-contracts/PolicyManagementService.ts";



const NewQuotes: React.FC = () => {
  const navigate = useNavigate()
  const [policyquotation, setQuotation] = useState<any[]>([]);
  // const coverage = '200000'
  const [searchParams] = useSearchParams();
  const coverage = searchParams.get('coverageLimit') || '200000'; // Default value is '200000
  // const [coverage, setCoverage] = useState<string>('200000');


  // const getQuotation = async () => {
  //   console.log("getQuotation", networks);
  //   const policyManagement = new PolicyManagementService(networks);
  //   const allQuotations: any = [];
  //   const quotations = await policyManagement.getQuotations(296);
  //   console.log("quotations----------------------------->", quotations)
  //   setQuotation(quotations)
  //   allQuotations.push(quotations);
  //   // const amoy_quotations = await policyManagement.getQuotations(80002);
  //   // allQuotations.push(amoy_quotations);
  //   return allQuotations;
  // };

   // Function to fetch quotations
   const getQuotation = async () => {
    try {
      console.log("getQuotation", networks);
      const policyManagement = new PolicyManagementService(networks);
      const quotations = await policyManagement.getQuotations(296);
      console.log("quotations----------------------------->", quotations);
      setQuotation(quotations);
      return quotations;
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  };



  const networks: NetworkConfig[] = [
    {
      chainId: 296,
      name: 'Hedera Testnet',
      rpcUrl: `${hederaRpcRelayUrl}`,
      contractAddress: `${hederaPolicyContract}`, // Contract address on Hedera Testnet
      privateKey: `${hederaPrivateKey}`
    },
    {
      chainId: 80002,
      name: 'Polygon Amoy',
      rpcUrl: `${amoyRpc}`,
      contractAddress: `${policyContractAddress}`, // Contract address on Polygon Amoy
      privateKey: `${privateKey}`
    },
    // Add more networks as needed
  ];


  useEffect(() => {
    getQuotation()

  }, [coverage])

  useEffect(() => {

    console.log("policyquotation", policyquotation)


  }, [policyquotation])






  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      <InsuranceIcon />
      <div className="w-full max-w-lg">
        {/* Move InsurerTable here */}
        {/* <InsurerTable  policyquotation = {policyquotation}  coverageLimit={parseInt(coverage)} /> */}
        {policyquotation.length > 0 ? (
          <InsurerTable policyquotation={policyquotation} coverageLimit={parseInt(coverage)} />
        ) : (
          <p>Loading quotations...</p> // Add a loading indicator if needed
        )}
        {/* Confirm & Pay Button */}
        <div className="mt-4  bottom-0 p-4 mt-auto">
          <button onClick={() => navigate("confirm&pay")} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewQuotes;