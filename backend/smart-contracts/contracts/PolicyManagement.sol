// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.24;
import "hardhat/console.sol";

/** 
 * @title PolicyManagement
 * @dev Implements policy and claim process
 */
contract PolicyManagement {

    uint256 key = 1;

    // Enum representing policy status
    enum Status {
        Active,
        InActive
    }

     // Enum representing policy status
    enum ClaimStatus {
        INITIATED,
        APPROVED,
        DENIED,
        COMPLETED
    }

    struct Policy {
        uint256 vehicleId;
        address[] insurers; // store strategy for policy [insurer1,insurer3,insurer2]
        Quotation[] quotations;
        uint256 premium;
        uint256 coverage;
        Status  status;
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

    mapping(uint256 => Quotation) public quotation; // quotationId ==> quotation details
    mapping(uint256 => Policy) public policy; // policyId ==> Policy details
    mapping(address => Policy[]) public policies; // user or insurer ==> Policy list
    mapping(address => Quotation) public insurerQuotation; // mapping of premium and coverage with insurer 
    mapping(uint256 => Quotation[]) public quotations; // user or insurer ==> Policy list
    uint256[] public quotationIds;
    mapping(uint256 => Claim[]) public claims; // mapping policy id with claims
    mapping(uint256 => Claim) public claim; // claimId ==> Claim details

    event QuotationAdded(uint256 quotationId, uint256 premium, uint256 coverage, uint256 createdAt, uint256 updatedAt);
    event QuotationUpdated(uint256 quotationId, uint256 premium, uint256 coverage, uint256 createdAt, uint256 updatedAt);
    event PolicyCreated(uint256 indexed policyId, uint256 indexed vehicleId, uint256 premium, uint256 coverage, address user,address[] insurers, uint256 createdAt, uint256 updatedAt);
    event ClaimRequested(uint256 policyId, uint256 claimId, uint256 claimAmount, ClaimStatus status);
    event ClaimApproved(uint256 indexed claimId, uint256 claimAmount,uint256 coverageRemaining,uint256 coverageUsed, address indexed approver, ClaimStatus status);
    event ClaimDenied(uint256 indexed claimId, uint256 claimAmount,uint256 coverageRemaining,uint256 coverageUsed, address indexed approver, ClaimStatus status);
    event ClaimCompleted(uint256 indexed claimId, uint256 claimAmount,uint256 coverageRemaining,uint256 coverageUsed, address indexed approver, ClaimStatus status);

    /** 
     * @dev Create a new ballot to choose one of 'proposalNames'.
     */
    constructor(){}

    function addQuotation(uint256 quotationId, uint256 premium, uint256 coverage, uint256 createdAt, uint256 updatedAt) public returns (bool success) {
        Quotation storage _quotation = quotation[quotationId];
        require(_quotation.coverage == 0, "Quotation Already exists");
        _quotation.quotationId = quotationId;
        _quotation.premium = premium;
        _quotation.insurer = msg.sender;
        _quotation.coverage = coverage;
        _quotation.createdAt = createdAt;
        _quotation.updatedAt = updatedAt;
        insurerQuotation[msg.sender] = _quotation;
        quotation[quotationId] = _quotation;
        quotations[1].push(_quotation);
        emit QuotationAdded(quotationId,premium,coverage,createdAt,updatedAt);
        return success;
    }

    function updateQuotation(uint256 quotationId, uint256 premium, uint256 coverage, uint256 createdAt, uint256 updatedAt) public returns (bool success){
        Quotation storage _insurerQuotation = insurerQuotation[msg.sender];
        require(_insurerQuotation.coverage != 0, "Quotation does not exists");
        Quotation storage _quotation = quotation[quotationId];
        _quotation.premium = premium;
        _quotation.coverage = coverage;
        _quotation.updatedAt = updatedAt;
        insurerQuotation[msg.sender] = _quotation;
        Quotation[] storage _quotes = quotations[1];
        for (uint i = 0; i < _quotes.length; i++) {
            if(_quotes[i].quotationId == quotationId) _quotes[i] = _quotation;
        }
        emit QuotationUpdated(quotationId,premium,coverage,createdAt,updatedAt);
        return success;
    }

    function getQuotations() public view returns(Quotation[] memory){
        Quotation[] memory _quotations = quotations[1];
        return _quotations;
    }   

    function getQuotationById(uint256 quotationId) public view returns(Quotation memory){
        return quotation[quotationId];
    } 

    /** 
     * @dev Creates a policy for the user
     * @param data policy details
     */
    function createPolicy(bytes memory data) public returns (uint256){
        (uint256 policyId,
        address[] memory insurers,
        Quotation[] memory _quotations,
        uint256 premium,
        uint256 coverage,
        uint256 vehicleId,
        uint256 createdAt,
        uint256 updatedAt) = abi.decode(data, (uint256, address[], Quotation[], uint256,uint256, uint256,uint256,uint256));
        //create policy
        Policy memory _policy;
        _policy.vehicleId = vehicleId;
        _policy.premium = premium;
        _policy.coverage = coverage;
        _policy.insurers = insurers;
        _policy.quotations = _quotations;
        _policy.coverageUsed = 0;
        _policy.coverageRemaining = coverage;
        _policy.user = msg.sender;
        _policy.createdAt = createdAt;
        _policy.updatedAt = updatedAt;
        _policy.status = Status.Active;
        policy[policyId] = _policy;

        Policy[] storage _policies;
        //map insurer with policy
        for (uint i = 0; i < insurers.length; i++) {
            _policies = policies[insurers[i]];
            _policies.push(policy[policyId]);
            policies[insurers[i]] = _policies;    
        }
        // map user with policy
        _policies = policies[msg.sender];
        _policies.push(policy[policyId]);
        policies[msg.sender] = _policies; 

        emit PolicyCreated(policyId, vehicleId, premium, coverage, msg.sender, insurers, createdAt, updatedAt);
        return policyId;
    }

    /**
     * @dev Returns Policy details of the requested policy id
     * @param policyId id of the policy to be fetched
     */
    function getPolicyById(uint256 policyId) public view returns (Policy memory _policy){
        bool found;
        _policy = policy[policyId];
        if(_policy.user == msg.sender) found = true;
        else{
            for (uint i=0; i < _policy.insurers.length; i++) 
            {
                if (_policy.insurers[i] == msg.sender) {
                    found = true;
                    break;
                }
            }
        }
        require((found),"UnAuthorized Access");
        return _policy;
    }

    /**
     * @dev Returns all the policies of a caller
     */
    function getAllPoliciesByAccount() public view returns (Policy[] memory) {
        Policy[] memory _policies = policies[msg.sender];
        return _policies;
    }

    // claim functions
    function requestClaim(uint256 policyId, uint256 claimId, uint256 claimAmount, bytes32 reason) public returns (uint256) {
        Policy memory _policy = policy[policyId];
        require(_policy.user == msg.sender, "UnAuthorized Access");
        require(_policy.status == Status.Active, "Policy is not active");
        require(_policy.coverageRemaining >= claimAmount, "Claim amount exceeds remaining coverage");
        
        Claim memory _claim = claim[claimId];
        require(_claim.status != ClaimStatus.COMPLETED, "Claim already exists");

        uint256 remainingClaimAmount = claimAmount;
        address[] memory claimInsurers = new address[](_policy.quotations.length);
        uint256[] memory claimAmounts = new uint256[](_policy.quotations.length);
        uint256 insurerCount = 0;

        for (uint256 i = 0; i < _policy.quotations.length && remainingClaimAmount > 0; i++) {
            Quotation memory _quotation = _policy.quotations[i];
            uint256 quotationCoverage = _quotation.coverage - _quotation.coverageUsed;
            
            if (quotationCoverage > 0) {
                uint256 claimFromQuotation = remainingClaimAmount > quotationCoverage ? quotationCoverage : remainingClaimAmount;
                
                claimInsurers[insurerCount] = _quotation.insurer;
                claimAmounts[insurerCount] = claimFromQuotation;
                insurerCount++;
                
                _quotation.coverageUsed += claimFromQuotation;
                remainingClaimAmount -= claimFromQuotation;
            }
        }

        require(remainingClaimAmount == 0, "Not enough coverage from quotations to fulfill the claim");

         // Trim arrays to actual size
        assembly {
            mstore(claimInsurers, insurerCount)
            mstore(claimAmounts, insurerCount)
        }

        _claim.claimAmount = claimAmount;
        _claim.policyId = policyId;
        _claim.reason = reason;
        _claim.status = ClaimStatus.INITIATED;
        _claim.createdBy = msg.sender;
        _claim.insurers = claimInsurers;
        _claim.claimAmounts = claimAmounts;
        _claim.createdAt = block.timestamp;
        _claim.updatedAt = block.timestamp;
        claims[policyId].push(_claim);
        claim[claimId] = _claim;

        _policy.coverageRemaining -= claimAmount;
        _policy.coverageUsed += claimAmount;

        emit ClaimRequested(_claim.policyId, claimId, _claim.claimAmount, _claim.status);
        return claimId;
    }


    /**
     * @dev Returns all the policies of a caller
     */
    function getAllClaimsByPolicyId(uint256 policyId) public view returns (Claim[] memory) {
        return claims[policyId];
    }

    /**
     * @dev Returns Policy details of the requested policy id
     * @param claimId id of the policy to be fetched
     */
    function getClaimById(uint256 claimId) public view returns (Claim memory){
        bool found;
        Claim memory existingClaim = claim[claimId];
        require(existingClaim.policyId != 0, "Claim not found.");
        if(existingClaim.createdBy == msg.sender) found = true;
        else{
            for (uint i=0; i < existingClaim.insurers.length; i++) 
            {
                if (existingClaim.insurers[i] == msg.sender) {
                    found = true;
                    break;
                }
            }
        }
        require((found),"UnAuthorized Access");
        return existingClaim;
    }

    // insurer approves the claim
    function approveClaim(uint256 claimId, uint256 updatedAt) public returns (bool success){
        bool found;
        Claim storage existingClaim = claim[claimId];
        Policy storage _policy = policy[existingClaim.policyId];
        // check if claim is already approved or completed
        require(((existingClaim.status != ClaimStatus.APPROVED) || (existingClaim.status != ClaimStatus.COMPLETED)),"Claim already approved or completed!");
        // check if claim is in initiated state
        require(existingClaim.status == ClaimStatus.INITIATED, "Requested Claim is not initiated yet");
        for (uint i=0; i < existingClaim.insurers.length; i++) 
        {
            if (existingClaim.insurers[i] == msg.sender) {
                found = true;
                break;
            }
        }
        require((found),"Only Authorized insurers can approve.");
        //check if coverageRemaining > 0 and coverageUsed is not equal to coverage
        require(((_policy.coverageRemaining > 0) && (_policy.coverageUsed != _policy.coverage)),"Complete Coverage amount has been used already.");
        //approve claim
        existingClaim.status = ClaimStatus.APPROVED;
        existingClaim.updatedAt = updatedAt;
        //transfer claim amount from insurer to user
        address payable approver = payable(msg.sender);
        approver.transfer(existingClaim.claimAmount);
        // calculate remaining coverage
        _policy.coverageRemaining = _policy.coverageRemaining - existingClaim.claimAmount;
        // calculate coverage used
        _policy.coverageUsed = _policy.coverageUsed + existingClaim.claimAmount;
        emit ClaimApproved(claimId, existingClaim.claimAmount,_policy.coverageRemaining,_policy.coverageUsed, msg.sender, ClaimStatus.APPROVED);
        if (_policy.coverageRemaining == 0 && _policy.coverageUsed == _policy.coverage) {
            emit ClaimApproved(claimId, existingClaim.claimAmount,_policy.coverageRemaining,_policy.coverageUsed, msg.sender, ClaimStatus.COMPLETED);
        }
        return success;
    }

    // insurer denies the claim
    function denyClaim(uint256 claimId, uint256 updatedAt) public view returns (bool success){
        bool found;
        Claim memory existingClaim = claim[claimId];
        // check if claim is already approved or completed or denied
        require(((existingClaim.status != ClaimStatus.APPROVED) || (existingClaim.status != ClaimStatus.COMPLETED)|| (existingClaim.status != ClaimStatus.DENIED)),"Claim already approved or completed or denied!");
        // check if claim is in initiated state
        require(existingClaim.status == ClaimStatus.INITIATED, "Requested Claim is not initiated yet");
        for (uint i=0; i < existingClaim.insurers.length; i++) 
        {
            if (existingClaim.insurers[i] == msg.sender) {
                found = true;
                break;
            }
        }
        require((found),"Only Authorized insurers can deny.");
        //deny claim
        existingClaim.status = ClaimStatus.DENIED;
        existingClaim.updatedAt = updatedAt;
        return success;
    }


}

