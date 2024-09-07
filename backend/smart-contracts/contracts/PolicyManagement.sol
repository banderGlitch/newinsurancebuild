// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.24;

import "hardhat/console.sol";

/** 
 * @title PolicyManagement
 * @dev Implements policy and claim process
 */
contract PolicyManagement {

    uint256 private constant PERCENTAGE_BASE = 100;

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

    uint256 private nextQuotationId = 1;
    uint256 private nextPolicyId = 1;
    uint256 private nextClaimId = 1;

    event QuotationAdded(uint256 indexed quotationId, uint256 premium, uint256 coverage, uint256 createdAt);
    event QuotationUpdated(uint256 indexed quotationId, uint256 premium, uint256 coverage, uint256 updatedAt);
    event PolicyCreated(uint256 indexed policyId, uint256 indexed vehicleId, uint256 premium, uint256 coverage, address indexed user, address[] insurers, uint256 createdAt);
    event ClaimRequested(uint256 indexed policyId, uint256 indexed claimId, uint256 claimAmount, ClaimStatus status);
    event ClaimStatusUpdated(uint256 indexed claimId, ClaimStatus status, uint256 updatedAt);

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

    constructor() {}

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

        emit QuotationAdded(quotationId, premium, coverage, block.timestamp);
        return quotationId;
    }

    function updateQuotation(uint256 quotationId, uint256 premium, uint256 coverage) public {
        Quotation storage quotation = quotations[quotationId];
        require(quotation.insurer == msg.sender, "Not quotation owner");
        require(quotation.coverageUsed == 0, "Quotation already in use");

        quotation.premium = premium;
        quotation.coverage = coverage;
        quotation.updatedAt = block.timestamp;

        emit QuotationUpdated(quotationId, premium, coverage, block.timestamp);
    }

    function createPolicy(uint256 vehicleId, uint256[] memory quotationIds) public returns (uint256) {
        require(quotationIds.length > 0, "At least one quotation required");

        uint256 policyId = nextPolicyId++;
        Policy storage newPolicy = policies[policyId];
        newPolicy.vehicleId = vehicleId;
        newPolicy.user = msg.sender;
        newPolicy.status = Status.Active;
        newPolicy.createdAt = block.timestamp;
        newPolicy.updatedAt = block.timestamp;

        uint256 totalPremium = 0;
        uint256 totalCoverage = 0;

        for (uint i = 0; i < quotationIds.length; i++) {
            Quotation storage quotation = quotations[quotationIds[i]];
            require(quotation.coverageUsed == 0, "Quotation already in use");

            newPolicy.insurers.push(quotation.insurer);
            newPolicy.quotationIds.push(quotationIds[i]);
            totalPremium += quotation.premium;
            totalCoverage += quotation.coverage;

            quotation.coverageUsed = quotation.coverage;
            insurerPolicies[quotation.insurer].push(policyId);
        }

        newPolicy.premium = totalPremium;
        newPolicy.coverage = totalCoverage;
        newPolicy.coverageRemaining = totalCoverage;

        userPolicies[msg.sender].push(policyId);

        emit PolicyCreated(policyId, vehicleId, totalPremium, totalCoverage, msg.sender, newPolicy.insurers, block.timestamp);
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

        emit ClaimStatusUpdated(claimId, ClaimStatus.APPROVED, block.timestamp);
    }

    function denyClaim(uint256 claimId) public onlyInsurer(claims[claimId].policyId) {
        Claim storage claim = claims[claimId];
        require(claim.status == ClaimStatus.INITIATED, "Claim not in initiated state");

        claim.status = ClaimStatus.DENIED;
        claim.updatedAt = block.timestamp;

        emit ClaimStatusUpdated(claimId, ClaimStatus.DENIED, block.timestamp);
    }

    // Getter functions

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