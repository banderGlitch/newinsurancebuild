import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractTransactionResponse, Signer } from "ethers";
import { PolicyManagement } from "../typechain-types";

describe.only("PolicyManagement", function () {
  let policyManagement: PolicyManagement & { deploymentTransaction(): ContractTransactionResponse; };
  let owner: Signer;
  let insurer1: Signer;
  let insurer2: Signer;
  let addrs: Signer[];

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const PolicyManagement = await ethers.getContractFactory("PolicyManagement");
    [owner, insurer1, insurer2, ...addrs] = await ethers.getSigners();

    // Deploy a new PolicyManagement contract before each test
    policyManagement = await PolicyManagement.deploy();
    console.log("policyManagement.address: ", await policyManagement.getAddress())
    const txReceipt = policyManagement.deploymentTransaction();
    console.log("txReceipt: ", txReceipt?.hash)
  });

  describe("Quotation", function () {
    it.only("Should add a new quotation", async function () {
      const premium = 100;
      const coverage = 1000;
      const chain = 296;
      await expect(policyManagement.connect(insurer1).addQuotation(premium, coverage, chain))
        .to.emit(policyManagement, "QuotationAdded")
        .withArgs(1, premium, coverage);
      const quotation = await policyManagement.quotations(1);
      console.log("quotation: ", quotation);
      expect(quotation.premium).to.equal(premium);
      expect(quotation.coverage).to.equal(coverage);
      expect(quotation.insurer).to.equal(await insurer1.getAddress());
    });

    it.only("Should update an existing quotation", async function () {
      const premium = 100;
      const coverage = 1000;
      const chain = 296;
      const res = await policyManagement.connect(insurer1).addQuotation(premium, coverage, chain);
      console.log("res: ", res.hash);
      const newPremium = 200;
      const newCoverage = 2000;
      const _quotation = await policyManagement.quotations(1);
      console.log("_quotation: ", _quotation);
      console.log("_quotation[0]: ", _quotation[0]);
      await expect(policyManagement.connect(insurer1).updateQuotation(_quotation[0], newPremium, newCoverage))
        .to.emit(policyManagement, "QuotationUpdated")
        .withArgs(_quotation[0], newPremium, newCoverage);

      const quotation = await policyManagement.quotations(1);
      console.log("quotation[0]: ", quotation);
      expect(quotation.premium).to.equal(newPremium);
      expect(quotation.coverage).to.equal(newCoverage);
    });

    it.only("Should get All quotations", async function () {
      const chain = 296;
      const res = await policyManagement.connect(insurer1).addQuotation(100, 1000, chain);
      console.log("res: ", res.hash);
      const res1 = await policyManagement.connect(insurer2).addQuotation(200, 2000, chain);
      console.log("res1: ", res1.hash);
      const quotation = await policyManagement.getQuotations();
      console.log("quotation: ", quotation);
    });
  });

  describe("Policy", function () {
    it("Should create a new policy", async function () {
      // First, add a quotation
      await policyManagement.connect(insurer1).addQuotation(100, 1000, 1);

      const vehicleId = 123;
      const quotationIds = [1];

      // await expect(policyManagement.connect(insurer2).createPolicy(vehicleId, quotationIds))
      //   .to.emit(policyManagement, "PolicyCreated")
      //   .withArgs(1, vehicleId, 100, 1000, await insurer2.getAddress(), [await insurer1.getAddress()], await ethers.provider.getBlock('latest').then(b => b!.timestamp));

      const policy = await policyManagement.policies(1);
      expect(policy.vehicleId).to.equal(vehicleId);
      expect(policy.premium).to.equal(100);
      expect(policy.coverage).to.equal(1000);
      expect(policy.user).to.equal(await insurer2.getAddress());
    });
  });

  describe("Claim", function () {
    beforeEach(async function () {
      // Add a quotation and create a policy before each claim test
      await policyManagement.connect(insurer1).addQuotation(100, 1000, 1);
      await policyManagement.connect(insurer2).createPolicy(123, [1]);
    });

    it("Should request a claim", async function () {
      const policyId = 1;
      const claimAmount = 500;
      const reason = ethers.encodeBytes32String("Car accident");

      // await expect(policyManagement.connect(insurer2).requestClaim(policyId, claimAmount, reason))
      //   .to.emit(policyManagement, "ClaimRequested")
      //   .withArgs(policyId, 1, claimAmount, 0); // 0 represents ClaimStatus.INITIATED

      const claim = await policyManagement.claims(1);
      expect(claim.policyId).to.equal(policyId);
      expect(claim.claimAmount).to.equal(claimAmount);
      expect(claim.reason).to.equal(reason);
      expect(claim.status).to.equal(0); // ClaimStatus.INITIATED
    });

    it("Should approve a claim", async function () {
      await policyManagement.connect(insurer2).requestClaim(1, 500, ethers.encodeBytes32String("Car accident"));

      // await expect(policyManagement.connect(insurer1).approveClaim(1))
      //   .to.emit(policyManagement, "ClaimStatusUpdated")
      //   .withArgs(1, 1, await ethers.provider.getBlock('latest').then(b => b!.timestamp)); // 1 represents ClaimStatus.APPROVED

      const claim = await policyManagement.claims(1);
      expect(claim.status).to.equal(1); // ClaimStatus.APPROVED

      const policy = await policyManagement.policies(1);
      expect(policy.coverageUsed).to.equal(500);
      expect(policy.coverageRemaining).to.equal(500);
    });

    it("Should deny a claim", async function () {
      await policyManagement.connect(insurer2).requestClaim(1, 500, ethers.encodeBytes32String("Car accident"));

      // await expect(policyManagement.connect(insurer1).denyClaim(1))
      //   .to.emit(policyManagement, "ClaimStatusUpdated")
      //   .withArgs(1, 2, await ethers.provider.getBlock('latest').then(b => b!.timestamp)); // 2 represents ClaimStatus.DENIED

      const claim = await policyManagement.claims(1);
      expect(claim.status).to.equal(2); // ClaimStatus.DENIED
    });
  });

  describe("Getter functions", function () {
    beforeEach(async function () {
      // Add quotations and create policies before each getter test
      await policyManagement.connect(insurer1).addQuotation(100, 1000, 1);
      await policyManagement.connect(insurer1).addQuotation(200, 2000, 2);
      await policyManagement.connect(insurer2).createPolicy(123, [1]);
      await policyManagement.connect(insurer2).createPolicy(456, [2]);
      await policyManagement.connect(insurer2).requestClaim(1, 500, ethers.encodeBytes32String("Car accident"));
    });

    it("Should get policy details", async function () {
      const policy = await policyManagement.getPolicy(1);
      expect(policy.vehicleId).to.equal(123);
      expect(policy.premium).to.equal(100);
      expect(policy.coverage).to.equal(1000);
    });

    it("Should get user policies", async function () {
      const userPolicies = await policyManagement.getUserPolicies(await insurer2.getAddress());
      expect(userPolicies.length).to.equal(2);
      expect(userPolicies[0]).to.equal(1);
      expect(userPolicies[1]).to.equal(2);
    });

    it("Should get insurer policies", async function () {
      const insurerPolicies = await policyManagement.getInsurerPolicies(await insurer1.getAddress());
      expect(insurerPolicies.length).to.equal(2);
      expect(insurerPolicies[0]).to.equal(1);
      expect(insurerPolicies[1]).to.equal(2);
    });

    it("Should get claim details", async function () {
      const claim = await policyManagement.getClaim(1);
      expect(claim.policyId).to.equal(1);
      expect(claim.claimAmount).to.equal(500);
      expect(claim.status).to.equal(0); // ClaimStatus.INITIATED
    });

    it("Should get policy claims", async function () {
      const policyClaims = await policyManagement.getPolicyClaims(1);
      expect(policyClaims.length).to.equal(1);
      expect(policyClaims[0]).to.equal(1);
    });
  });
});