import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PolicyModule = buildModule("PolicyModule", (m) => {
  const policyManagement = m.contract("PolicyManagement", []);
  console.log("account: ",m.getAccount(1));
  return { policyManagement };
});

export default PolicyModule;
