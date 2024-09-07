import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PolicyModule = buildModule("PolicyModule", (m) => {
  const policyManagement = m.contract("PolicyManagement", []);

  return { policyManagement };
});

export default PolicyModule;
