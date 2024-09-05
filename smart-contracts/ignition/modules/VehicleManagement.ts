import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VehicleModule = buildModule("VehicleModule", (m) => {
  const vehicleManagement = m.contract("VehicleManagement", []);

  return { vehicleManagement };
});

export default VehicleModule;
