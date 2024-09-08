/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  PolicyManagement,
  PolicyManagementInterface,
} from "../../contracts/PolicyManagement";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "policyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "claimId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "claimAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum PolicyManagement.ClaimStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "ClaimRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "claimId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum PolicyManagement.ClaimStatus",
        name: "status",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
    ],
    name: "ClaimStatusUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "policyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "coverage",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "insurers",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    name: "PolicyCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "quotationId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "coverage",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    name: "QuotationAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "quotationId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "coverage",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
    ],
    name: "QuotationUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "coverage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "chain",
        type: "uint256",
      },
    ],
    name: "addQuotation",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "claimId",
        type: "uint256",
      },
    ],
    name: "approveClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "claims",
    outputs: [
      {
        internalType: "uint256",
        name: "policyId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "reason",
        type: "bytes32",
      },
      {
        internalType: "enum PolicyManagement.ClaimStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "createdBy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "quotationIds",
        type: "uint256[]",
      },
    ],
    name: "createPolicy",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "claimId",
        type: "uint256",
      },
    ],
    name: "denyClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "claimId",
        type: "uint256",
      },
    ],
    name: "getClaim",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "policyId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimAmount",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "reason",
            type: "bytes32",
          },
          {
            internalType: "enum PolicyManagement.ClaimStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address[]",
            name: "insurers",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "claimAmounts",
            type: "uint256[]",
          },
          {
            internalType: "address",
            name: "createdBy",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct PolicyManagement.Claim",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "insurer",
        type: "address",
      },
    ],
    name: "getInsurerPolicies",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "policyId",
        type: "uint256",
      },
    ],
    name: "getPolicy",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "vehicleId",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "insurers",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "quotationIds",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "premium",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "coverage",
            type: "uint256",
          },
          {
            internalType: "enum PolicyManagement.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "coverageUsed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "coverageRemaining",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct PolicyManagement.Policy",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "policyId",
        type: "uint256",
      },
    ],
    name: "getPolicyClaims",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserPolicies",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "insurerPolicies",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "policies",
    outputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "coverage",
        type: "uint256",
      },
      {
        internalType: "enum PolicyManagement.Status",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "coverageUsed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "coverageRemaining",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "policyClaims",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "quotations",
    outputs: [
      {
        internalType: "uint256",
        name: "quotationId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "chain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "insurer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "coverage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "coverageUsed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "policyId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "reason",
        type: "bytes32",
      },
    ],
    name: "requestClaim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "quotationId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "coverage",
        type: "uint256",
      },
    ],
    name: "updateQuotation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userPolicies",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260016006556001600755600160085534801561001f57600080fd5b50611ac18061002f6000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c8063560eb394116100a2578063a888c2cd11610071578063a888c2cd146102bf578063b158946c1461032b578063c62f14f61461033e578063d24d3d9f14610351578063d3e894831461036457600080fd5b8063560eb394146102665780635aef24471461027957806371209bad1461029957806384ac35eb146102ac57600080fd5b80633e2045ea116100de5780633e2045ea1461018d57806345d9ecee146101a057806346e30135146101b35780634e896258146101c857600080fd5b806319ac4614146101105780632b07fce3146101395780632e6cd30d146101595780633d36adc51461016c575b600080fd5b61012361011e3660046114bf565b6103d9565b60405161013091906114da565b60405180910390f35b61014c61014736600461151e565b610445565b60405161013091906115d7565b6101236101673660046114bf565b6105af565b61017f61017a366004611696565b610619565b604051908152602001610130565b61012361019b36600461151e565b61064a565b61017f6101ae3660046116c0565b6106aa565b6101c66101c136600461151e565b610a0d565b005b6102236101d636600461151e565b600060208190529081526040902080546001820154600283015460038401546004850154600586015460068701546007909701549596949593946001600160a01b03909316939192909188565b604080519889526020890197909752958701949094526001600160a01b039092166060860152608085015260a084015260c083015260e082015261010001610130565b61017f6102743660046116ec565b610c64565b61028c61028736600461151e565b610c80565b604051610130919061171e565b61017f6102a73660046117df565b610e36565b6101c66102ba36600461151e565b6110c7565b6103186102cd36600461151e565b600460205260009081526040902080546001820154600283015460038401546006850154600786015460089096015494959394929360ff909216926001600160a01b03909116919087565b60405161013097969594939291906118a9565b61017f6103393660046116c0565b61125c565b6101c661034c3660046116c0565b61130f565b61017f61035f366004611696565b611413565b6103c461037236600461151e565b6001602052600090815260409020805460038201546004830154600584015460068501546007860154600887015460099097015495969495939460ff8416946101009094046001600160a01b03169389565b604051610130999897969594939291906118f2565b6001600160a01b03811660009081526002602090815260409182902080548351818402810184019094528084526060939283018282801561043957602002820191906000526020600020905b815481526020019060010190808311610425575b50505050509050919050565b61044d61142f565b60008281526001602081815260409283902083516101608101855281548152928101805485518185028101850190965280865293949193858401938301828280156104c157602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116104a3575b505050505081526020016002820180548060200260200160405190810160405280929190818152602001828054801561051957602002820191906000526020600020905b815481526020019060010190808311610505575b50505091835250506003820154602082015260048201546040820152600582015460609091019060ff166001811115610554576105546115ad565b6001811115610565576105656115ad565b8152600582015461010090046001600160a01b0316602082015260068201546040820152600782015460608201526008820154608082015260099091015460a09091015292915050565b6001600160a01b03811660009081526003602090815260409182902080548351818402810184019094528084526060939283018282801561043957602002820191906000526020600020908154815260200190600101908083116104255750505050509050919050565b6002602052816000526040600020818154811061063557600080fd5b90600052602060002001600091509150505481565b60008181526005602090815260409182902080548351818402810184019094528084526060939283018282801561043957602002820191906000526020600020908154815260200190600101908083116104255750505050509050919050565b600083815260016020526040812060050154849061010090046001600160a01b031633146107125760405162461bcd60e51b815260206004820152601060248201526f2737ba103837b634b1bc9037bbb732b960811b60448201526064015b60405180910390fd5b600085815260016020526040812090600582015460ff16600181111561073a5761073a6115ad565b1461077e5760405162461bcd60e51b8152602060048201526014602482015273506f6c696379206973206e6f742061637469766560601b6044820152606401610709565b84816007015410156107e25760405162461bcd60e51b815260206004820152602760248201527f436c61696d20616d6f756e7420657863656564732072656d61696e696e6720636044820152666f76657261676560c81b6064820152608401610709565b60088054600091826107f383611960565b909155506000818152600460205260408120898155600181018990556002810188905560038101805460ff191690556006810180546001600160a01b031916331790554260078201819055600882015591925087905b60028501548110801561085c5750600082115b1561095157600080600087600201848154811061087b5761087b611979565b90600052602060002001548152602001908152602001600020905060008660040154606483600401546108ae919061198f565b6108b891906119a6565b9050600060646108c8838e61198f565b6108d291906119a6565b9050848111156108df5750835b6003830154600487018054600181810183556000928352602080842090920180546001600160a01b0319166001600160a01b03909516949094179093556005890180549384018155825290200181905561093981866119c8565b9450505050808061094990611960565b915050610849565b5080156109a05760405162461bcd60e51b815260206004820152601860248201527f436c61696d20646973747269627574696f6e206572726f7200000000000000006044820152606401610709565b600089815260056020908152604080832080546001810182559084529183209091018590555184918b917fc87683691ce0c7c366b280e4dca2f26e648fc1c8deba1f494f554db61f15f0c8916109f8918d91906119db565b60405180910390a35090979650505050505050565b60008181526004602052604081205490805b60008381526001602081905260409091200154811015610a8b57600083815260016020819052604090912001805433919083908110610a6057610a60611979565b6000918252602090912001546001600160a01b031603610a835760019150610a8b565b600101610a1f565b5080610ad55760405162461bcd60e51b81526020600482015260196024820152782737ba1030b71030baba3437b934bd32b21034b739bab932b960391b6044820152606401610709565b60008381526004602052604081209060038083015460ff1690811115610afd57610afd6115ad565b14610b4a5760405162461bcd60e51b815260206004820152601c60248201527f436c61696d206e6f7420696e20696e69746961746564207374617465000000006044820152606401610709565b805460009081526001602081905260409091209082015460078201541015610bb45760405162461bcd60e51b815260206004820152601f60248201527f496e73756666696369656e7420636f7665726167652072656d61696e696e67006044820152606401610709565b60038201805460ff19166001908117909155426008840155820154600682018054600090610be39084906119ef565b90915550506001820154600782018054600090610c019084906119c8565b90915550506007810154600003610c225760058101805460ff191660011790555b847f0212d71780f0d14d4b197f036a7e52469f00c3935721d75f69ab0a947758c3fd600142604051610c55929190611a02565b60405180910390a25050505050565b6005602052816000526040600020818154811061063557600080fd5b610cd860408051610120810182526000808252602082018190529181018290529060608201908152602001606081526020016060815260200160006001600160a01b0316815260200160008152602001600081525090565b60046000838152602001908152602001600020604051806101200160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff166003811115610d3957610d396115ad565b6003811115610d4a57610d4a6115ad565b815260200160048201805480602002602001604051908101604052809291908181526020018280548015610da757602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610d89575b5050505050815260200160058201805480602002602001604051908101604052809291908181526020018280548015610dff57602002820191906000526020600020905b815481526020019060010190808311610deb575b505050918352505060068201546001600160a01b031660208201526007820154604082015260089091015460609091015292915050565b600080825111610e885760405162461bcd60e51b815260206004820152601f60248201527f4174206c65617374206f6e652071756f746174696f6e207265717569726564006044820152606401610709565b6007805460009182610e9983611960565b9091555060008181526001602052604081208681556005810180546001600160a81b031916336101000260ff19161790554260088201819055600982015591925080805b865181101561103a576000806000898481518110610efd57610efd611979565b6020026020010151815260200190815260200160002090508060050154600014610f645760405162461bcd60e51b815260206004820152601860248201527751756f746174696f6e20616c726561647920696e2075736560401b6044820152606401610709565b60038101546001808701805491820181556000908152602090200180546001600160a01b0319166001600160a01b0390921691909117905587516002860190899084908110610fb557610fb5611979565b602090810291909101810151825460018101845560009384529190922001556002810154610fe390856119ef565b9350806004015483610ff591906119ef565b600482015460058301556003918201546001600160a01b0316600090815260209283526040812080546001818101835591835293909120909201879055925001610edd565b506003830182905560048301819055600783018190553360008181526002602090815260408083208054600181810183559185529290932090910187905551899187917f6987fb3ffd9cfba0871847e039b6207ef5345c5ddcf1268627df5a625ecd4051916110b29188918891908b01904290611a1d565b60405180910390a45091925050505b92915050565b60008181526004602052604081205490805b600083815260016020819052604090912001548110156111455760008381526001602081905260409091200180543391908390811061111a5761111a611979565b6000918252602090912001546001600160a01b03160361113d5760019150611145565b6001016110d9565b508061118f5760405162461bcd60e51b81526020600482015260196024820152782737ba1030b71030baba3437b934bd32b21034b739bab932b960391b6044820152606401610709565b60008381526004602052604081209060038083015460ff16908111156111b7576111b76115ad565b146112045760405162461bcd60e51b815260206004820152601c60248201527f436c61696d206e6f7420696e20696e69746961746564207374617465000000006044820152606401610709565b60038101805460ff19166002908117909155426008830181905560405186927f0212d71780f0d14d4b197f036a7e52469f00c3935721d75f69ab0a947758c3fd9261124e92611a02565b60405180910390a250505050565b600680546000918291908261127083611960565b90915550600081815260208181526040918290208381556002810189905560048101889055600181018790556003810180546001600160a01b0319163317905542600682018190556007820181905583518a8152928301899052928201929092529192509082907f9ee422e3ba9f0e4a566b8af65137560e8351015e9c36da83e0023d526f80cbed9060600160405180910390a25090505b9392505050565b600083815260208190526040902060038101546001600160a01b0316331461136f5760405162461bcd60e51b81526020600482015260136024820152722737ba1038bab7ba30ba34b7b71037bbb732b960691b6044820152606401610709565b6005810154156113bc5760405162461bcd60e51b815260206004820152601860248201527751756f746174696f6e20616c726561647920696e2075736560401b6044820152606401610709565b6002810183905560048101829055426007820181905560408051858152602081018590529081019190915284907f40e4fce7ae56a73eefff9da88e7859666b5fc3a6211d341c78fd25c19948d6039060600161124e565b6003602052816000526040600020818154811061063557600080fd5b604051806101600160405280600081526020016060815260200160608152602001600081526020016000815260200160006001811115611471576114716115ad565b815260200160006001600160a01b03168152602001600081526020016000815260200160008152602001600081525090565b80356001600160a01b03811681146114ba57600080fd5b919050565b6000602082840312156114d157600080fd5b611308826114a3565b6020808252825182820181905260009190848201906040850190845b81811015611512578351835292840192918401916001016114f6565b50909695505050505050565b60006020828403121561153057600080fd5b5035919050565b60008151808452602080850194506020840160005b838110156115715781516001600160a01b03168752958201959082019060010161154c565b509495945050505050565b60008151808452602080850194506020840160005b8381101561157157815187529582019590820190600101611591565b634e487b7160e01b600052602160045260246000fd5b600281106115d3576115d36115ad565b9052565b602081528151602082015260006020830151610160806040850152611600610180850183611537565b91506040850151601f1985840301606086015261161d838261157c565b92505060608501516080850152608085015160a085015260a085015161164660c08601826115c3565b5060c08501516001600160a01b03811660e08601525060e0850151610100858101919091528501516101208086019190915285015161014080860191909152909401519390920192909252919050565b600080604083850312156116a957600080fd5b6116b2836114a3565b946020939093013593505050565b6000806000606084860312156116d557600080fd5b505081359360208301359350604090920135919050565b600080604083850312156116ff57600080fd5b50508035926020909101359150565b600481106115d3576115d36115ad565b6020815281516020820152602082015160408201526040820151606082015260006060830151611751608084018261170e565b5060808301516101208060a085015261176e610140850183611537565b915060a0850151601f198584030160c086015261178b838261157c565b92505060c08501516117a860e08601826001600160a01b03169052565b5060e085015161010085810191909152909401519390920192909252919050565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156117f257600080fd5b8235915060208084013567ffffffffffffffff8082111561181257600080fd5b818601915086601f83011261182657600080fd5b813581811115611838576118386117c9565b8060051b604051601f19603f8301168101818110858211171561185d5761185d6117c9565b60405291825284820192508381018501918983111561187b57600080fd5b938501935b8285101561189957843584529385019392850192611880565b8096505050505050509250929050565b878152602081018790526040810186905260e081016118cb606083018761170e565b6001600160a01b0394909416608082015260a081019290925260c090910152949350505050565b8981526020810189905260408101889052610120810161191560608301896115c3565b6001600160a01b0396909616608082015260a081019490945260c084019290925260e083015261010090910152949350505050565b634e487b7160e01b600052601160045260246000fd5b6000600182016119725761197261194a565b5060010190565b634e487b7160e01b600052603260045260246000fd5b80820281158282048414176110c1576110c161194a565b6000826119c357634e487b7160e01b600052601260045260246000fd5b500490565b818103818111156110c1576110c161194a565b82815260408101611308602083018461170e565b808201808211156110c1576110c161194a565b60408101611a10828561170e565b8260208301529392505050565b60006080820186835260208660208501526080604085015281865480845260a086019150876000526020600020935060005b81811015611a745784546001600160a01b031683526001948501949284019201611a4f565b50508093505050508260608301529594505050505056fea2646970667358221220c1b7cc14fd7153d74387e8818b7f83ac7e14c343ecf2f232141db640f3f2239264736f6c63430008180033";

type PolicyManagementConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PolicyManagementConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PolicyManagement__factory extends ContractFactory {
  constructor(...args: PolicyManagementConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      PolicyManagement & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): PolicyManagement__factory {
    return super.connect(runner) as PolicyManagement__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PolicyManagementInterface {
    return new Interface(_abi) as PolicyManagementInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PolicyManagement {
    return new Contract(address, _abi, runner) as unknown as PolicyManagement;
  }
}