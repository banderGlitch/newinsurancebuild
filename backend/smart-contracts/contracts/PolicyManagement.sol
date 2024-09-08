// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.24;

import "hardhat/console.sol";

/** 
 * @title PolicyManagement
 * @dev Implements policy and claim process
 */
contract PolicyManagement {

    // Payable address can send Ether via transfer or send
    address payable public owner;

    uint256 private constant PERCENTAGE_BASE = 100;
    uint256 private constant KEY=1;
    // Enum representing policy status
    enum Status {
        Active,
        InActive
    }

    // Enum representing claim status
    enum ClaimStatus {
        INITIATED,
        APPROVED,
        DENIED,
        COMPLETED
    }

    struct Policy {
        uint256 vehicleId;
        address[] insurers;
        uint256[] quotationIds;
        uint256 premium;
        uint256 coverage;
        Status status;
        address user;
        uint256 coverageUsed;
        uint256 coverageRemaining;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct Claim {
        uint256 policyId;
        uint256 claimAmount;
        bytes32 reason;
        ClaimStatus status;
        address[] insurers;
        uint256[] claimAmounts;
        address createdBy;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct Quotation {
        uint256 quotationId;
        uint256 chain;
        uint256 premium;
        address insurer;
        uint256 coverage;
        uint256 coverageUsed;
        uint256 createdAt;
        uint256 updatedAt;
    }

    mapping(uint256 => Quotation) public quotations;
    mapping(uint256 => Policy) public policies;
    mapping(address => uint256[]) public userPolicies;
    mapping(address => uint256[]) public insurerPolicies;
    mapping(uint256 => Claim) public claims;
    mapping(uint256 => uint256[]) public policyClaims;
    mapping(uint256 => Quotation[]) public quotationList;

    uint256 private nextQuotationId = 1;
    uint256 private nextPolicyId = 1;
    uint256 private nextClaimId = 1;

    event QuotationAdded(uint256 indexed quotationId, uint256 premium, uint256 coverage);
    event QuotationUpdated(uint256 indexed quotationId, uint256 premium, uint256 coverage);
    event PolicyCreated(uint256 indexed policyId, uint256 indexed vehicleId, uint256 premium, uint256 coverage, address indexed user, address[] insurers);
    event ClaimRequested(uint256 indexed policyId, uint256 indexed claimId, uint256 claimAmount, ClaimStatus status);
    event ClaimStatusUpdated(uint256 indexed claimId, ClaimStatus status);

    modifier onlyPolicyOwner(uint256 policyId) {
        require(policies[policyId].user == msg.sender, "Not policy owner");
        _;
    }

    modifier onlyInsurer(uint256 policyId) {
        bool isInsurer = false;
        for (uint i = 0; i < policies[policyId].insurers.length; i++) {
            if (policies[policyId].insurers[i] == msg.sender) {
                isInsurer = true;
                break;
            }
        }
        require(isInsurer, "Not an authorized insurer");
        _;
    }

   
    // Payable constructor can receive Ether
    constructor() payable {
        owner = payable(msg.sender);
    }

    // Function to deposit Ether into this contract.
    // Call this function along with some Ether.
    // The balance of this contract will be automatically updated.
    function deposit() public payable {}

    // Function to withdraw all Ether from this contract.
    function withdraw() public {
        // get the amount of Ether stored in this contract
        uint256 amount = address(this).balance;

        // send all Ether to owner
        (bool success,) = owner.call{value: amount}("");
        require(success, "Failed to send Ether");
    }



    function addQuotation(uint256 premium, uint256 coverage, uint256 chain) public returns (uint256) {
        uint256 quotationId = nextQuotationId++;
        Quotation storage newQuotation = quotations[quotationId];
        newQuotation.quotationId = quotationId;
        newQuotation.premium = premium;
        newQuotation.coverage = coverage;
        newQuotation.chain = chain;
        newQuotation.insurer = msg.sender;
        newQuotation.createdAt = block.timestamp;
        newQuotation.updatedAt = block.timestamp;
        Quotation[] storage _quotationList = quotationList[KEY];
        _quotationList.push(newQuotation);
        emit QuotationAdded(quotationId, premium, coverage);
        return quotationId;
    }

    function updateQuotation(uint256 quotationId, uint256 premium, uint256 coverage) public {
        Quotation storage quotation = quotations[quotationId];
        require(quotation.quotationId == quotationId, "Quotation not found");
        require(quotation.insurer == msg.sender, "Not quotation owner");
        require(quotation.coverageUsed == 0, "Quotation already in use");

        quotation.premium = premium;
        quotation.coverage = coverage;
        quotation.updatedAt = block.timestamp;
        Quotation[] storage _quotationList = quotationList[KEY];
        for (uint i = 0; i < _quotationList.length; i++) {
            if (_quotationList[i].quotationId == quotationId) {
                _quotationList[i] = quotation;
            }  
        }
        emit QuotationUpdated(quotationId, premium, coverage);
    }


    function createPolicy(uint256 vehicleId, Quotation[] memory _quotations) public returns (uint256) {
        require(_quotations.length > 0, "At least one quotation required");

        uint256 policyId = nextPolicyId++;
        Policy storage newPolicy = policies[policyId];
        newPolicy.vehicleId = vehicleId;
        newPolicy.user = msg.sender;
        newPolicy.status = Status.Active;
        newPolicy.createdAt = block.timestamp;
        newPolicy.updatedAt = block.timestamp;

        uint256 totalPremium = 0;
        uint256 totalCoverage = 0;

        for (uint i = 0; i < _quotations.length; i++) {
            Quotation memory quotation = _quotations[i];
            require(quotation.coverageUsed == 0, "Quotation already in use");

            newPolicy.insurers.push(quotation.insurer);
            newPolicy.quotationIds.push(quotation.quotationId);
            totalPremium += quotation.premium;
            totalCoverage += quotation.coverage;
            // pay premium to insurer from this contract
            (bool success,) = payable(quotation.insurer).call{value: quotation.premium}("");
            require(success, "Failed to send Ether");
            quotation.coverageUsed = quotation.coverage;
            insurerPolicies[quotation.insurer].push(policyId);
        }

        newPolicy.premium = totalPremium;
        newPolicy.coverage = totalCoverage;
        newPolicy.coverageRemaining = totalCoverage;

        userPolicies[msg.sender].push(policyId);

        emit PolicyCreated(policyId, vehicleId, totalPremium, totalCoverage, msg.sender, newPolicy.insurers);
        return policyId;
    }

    function requestClaim(uint256 policyId, uint256 claimAmount, bytes32 reason) public onlyPolicyOwner(policyId) returns (uint256) {
        Policy storage policy = policies[policyId];
        require(policy.status == Status.Active, "Policy is not active");
        require(policy.coverageRemaining >= claimAmount, "Claim amount exceeds remaining coverage");

        uint256 claimId = nextClaimId++;
        Claim storage newClaim = claims[claimId];
        newClaim.policyId = policyId;
        newClaim.claimAmount = claimAmount;
        newClaim.reason = reason;
        newClaim.status = ClaimStatus.INITIATED;
        newClaim.createdBy = msg.sender;
        newClaim.createdAt = block.timestamp;
        newClaim.updatedAt = block.timestamp;

        uint256 remainingClaimAmount = claimAmount;
        for (uint i = 0; i < policy.quotationIds.length && remainingClaimAmount > 0; i++) {
            Quotation storage quotation = quotations[policy.quotationIds[i]];
            uint256 quotationShare = (quotation.coverage * PERCENTAGE_BASE) / policy.coverage;
            uint256 claimShare = (claimAmount * quotationShare) / PERCENTAGE_BASE;

            if (claimShare > remainingClaimAmount) {
                claimShare = remainingClaimAmount;
            }

            newClaim.insurers.push(quotation.insurer);
            newClaim.claimAmounts.push(claimShare);
            remainingClaimAmount -= claimShare;
        }

        require(remainingClaimAmount == 0, "Claim distribution error");

        policyClaims[policyId].push(claimId);

        emit ClaimRequested(policyId, claimId, claimAmount, ClaimStatus.INITIATED);
        return claimId;
    }

    function approveClaim(uint256 claimId) public onlyInsurer(claims[claimId].policyId) {
        Claim storage claim = claims[claimId];
        require(claim.status == ClaimStatus.INITIATED, "Claim not in initiated state");

        Policy storage policy = policies[claim.policyId];
        require(policy.coverageRemaining >= claim.claimAmount, "Insufficient coverage remaining");

        claim.status = ClaimStatus.APPROVED;
        claim.updatedAt = block.timestamp;

        policy.coverageUsed += claim.claimAmount;
        policy.coverageRemaining -= claim.claimAmount;

        if (policy.coverageRemaining == 0) {
            policy.status = Status.InActive;
        }

        emit ClaimStatusUpdated(claimId, ClaimStatus.APPROVED);
    }

    function denyClaim(uint256 claimId) public onlyInsurer(claims[claimId].policyId) {
        Claim storage claim = claims[claimId];
        require(claim.status == ClaimStatus.INITIATED, "Claim not in initiated state");

        claim.status = ClaimStatus.DENIED;
        claim.updatedAt = block.timestamp;

        emit ClaimStatusUpdated(claimId, ClaimStatus.DENIED);
    }

    function getQuotations() public view returns(Quotation[] memory){
        return quotationList[KEY];
    } 

    function getPolicy(uint256 policyId) public view returns (Policy memory) {
        return policies[policyId];
    }

    function getUserPolicies(address user) public view returns (uint256[] memory) {
        return userPolicies[user];
    }

    function getInsurerPolicies(address insurer) public view returns (uint256[] memory) {
        return insurerPolicies[insurer];
    }

    function getClaim(uint256 claimId) public view returns (Claim memory) {
        return claims[claimId];
    }

    function getPolicyClaims(uint256 policyId) public view returns (uint256[] memory) {
        return policyClaims[policyId];
    }

}