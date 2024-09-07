# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/VehicleManagement.ts
npx hardhat ignition deploy ./ignition/modules/PolicyManagement.ts

npx hardhat ignition deploy ./ignition/modules/VehicleManagement.ts --network amoy
npx hardhat ignition deploy ./ignition/modules/PolicyManagement.ts --network amoy

npx hardhat run ./PolicyManagementService.ts
```

