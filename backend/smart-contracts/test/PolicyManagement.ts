import { expect } from "chai";
import { ethers } from "hardhat";

describe("PolicyManagement", function () {
  let PolicyManagement;
  let policyManagement;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    PolicyManagement = await ethers.getContractFactory("PolicyManagement");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    policyManagement = await PolicyManagement.deploy();
    await policyManagement.deployed();
  });

  describe("Quotation", function () {
    it("Should add a new quotation", async function () {
      const quotationId = 1;
      const premium = ethers.utils.parseEther("1");
      const coverage = ethers.utils.parseEther("100");
      const createdAt = Math.floor(Date.now() / 1000);
      const updatedAt = createdAt;

      await expect(policyManagement.addQuotation(quotationId, premium, coverage, createdAt, updatedAt))
        .to.emit(policyManagement, "QuotationAdded")
        .withArgs(quotationId, premium, coverage, createdAt, updatedAt);

      const quotation = await policyManagement.quotation(quotationId);
      expect(quotation.premium).to.equal(premium);
      expect(quotation.coverage).to.equal(coverage);
    });

    it("Should update an existing quotation", async function () {
      const quotationId = 1;
      const premium = ethers.utils.parseEther("1");
      const coverage = ethers.utils.parseEther("100");
      const createdAt = Math.floor(Date.now() / 1000);
      let updatedAt = createdAt;

      await policyManagement.addQuotation(quotationId, premium, coverage, createdAt, updatedAt);

      const newPremium = ethers.utils.parseEther("1.5");
      const newCoverage = ethers.utils.parseEther("150");
      updatedAt = Math.floor(Date.now() / 1000);

      await expect(policyManagement.updateQuotation(quotationId, newPremium, newCoverage, createdAt, updatedAt))
        .to.emit(policyManagement, "QuotationUpdated")
        .withArgs(quotationId, newPremium, newCoverage, createdAt, updatedAt);

      const quotation = await policyManagement.quotation(quotationId);
      expect(quotation.premium).to.equal(newPremium);
      expect(quotation.coverage).to.equal(newCoverage);
    });
  });

  describe("Policy", function () {
    it("Should create a new policy", async function () {
      const policyId = 1;
      const vehicleId = 1001;
      const premium = ethers.utils.parseEther("1");
      const coverage = ethers.utils.parseEther("100");
      const createdAt = Math.floor(Date.now() / 1000);
      const updatedAt = createdAt;
      const insurers = [addr1.address, addr2.address];

      const policyData = ethers.utils.defaultAbiCoder.encode(
        ["uint256", "address[]", "uint256", "uint256", "uint256", "uint256", "uint256"],
        [policyId, insurers, premium, coverage, vehicleId, createdAt, updatedAt]
      );

      await expect(policyManagement.connect(addr1).createPolicy(policyData))
        .to.emit(policyManagement, "PolicyCreated")
        .withArgs(policyId, vehicleId, premium, coverage, addr1.address, insurers, createdAt, updatedAt);

      const policy = await policyManagement.getPolicyById(policyId);
      expect(policy.vehicleId).to.equal(vehicleId);
      expect(policy.premium).to.equal(premium);
      expect(policy.coverage).to.equal(coverage);
      expect(policy.user).to.equal(addr1.address);
    });
  });

  describe("Claim", function () {
    let policyId;

    beforeEach(async function () {
      policyId = 1;
      const vehicleId = 1001;
      const premium = ethers.utils.parseEther("1");
      const coverage = ethers.utils.parseEther("100");
      const createdAt = Math.floor(Date.now() / 1000);
      const updatedAt = createdAt;
      const insurers = [addr1.address, addr2.address];

      const policyData = ethers.utils.defaultAbiCoder.encode(
        ["uint256", "address[]", "uint256", "uint256", "uint256", "uint256", "uint256"],
        [policyId, insurers, premium, coverage, vehicleId, createdAt, updatedAt]
      );

      await policyManagement.connect(addr1).createPolicy(policyData);
    });

    it("Should request a claim", async function () {
      const claimId = 1;
      const claimAmount = ethers.utils.parseEther("50");
      const reason = ethers.utils.formatBytes32String("Car accident");

      await expect(policyManagement.connect(addr1).requestClaim(policyId, claimId, claimAmount, reason))
        .to.emit(policyManagement, "ClaimRequested")
        .withArgs(policyId, claimId, claimAmount, 0); // 0 represents ClaimStatus.INITIATED

      const claim = await policyManagement.getClaimById(claimId);
      expect(claim.policyId).to.equal(policyId);
      expect(claim.claimAmount).to.equal(claimAmount);
      expect(claim.reason).to.equal(reason);
      expect(claim.status).to.equal(0); // ClaimStatus.INITIATED
    });

    // Add more tests for approveClaim and denyClaim functions
  });
});