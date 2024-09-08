# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
cd backend/smart-contracts
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node

deployment commands:

npx hardhat ignition deploy ./ignition/modules/VehicleManagement.ts
npx hardhat ignition deploy ./ignition/modules/PolicyManagement.ts




Script running command:
npx hardhat run ./PolicyManagementService.ts


npx hardhat run ./scripts/vehicleRegister.ts --network hedera

```

## Deploy Smart Contracts

### Hedera:

        npx hardhat ignition deploy ./ignition/modules/VehicleManagement.ts --network hedera
        npx hardhat ignition deploy ./ignition/modules/PolicyManagement.ts --network hedera

### Polygon Amoy:

        npx hardhat ignition deploy ./ignition/modules/VehicleManagement.ts --network amoy
        npx hardhat ignition deploy ./ignition/modules/PolicyManagement.ts --network amoy

### Berachain Bartio:

        npx hardhat ignition deploy ./ignition/modules/VehicleManagement.ts --network barachain_bartiobarachain_bartio
        npx hardhat ignition deploy ./ignition/modules/PolicyManagement.ts --network barachain_bartio

## Add User Vehicles:

### Mock some Vehicle details in mocks/userVehicle.json file with following format:

    {
        "vehicleId": <VEHICLE_ID>,
        "owner": "<USER_WALLET_ADDRESS>",
        "model": "<VEHICLE_MODEL_NAME>",
        "purchaseDate": <DATE_IN_EPOCH_TIMESTAMP>,
        "vin": "<VEHICLE_VIN_NUMBER>",
        "color": "<VEHICLE_COLOR>",
        "plateNumber": "<VEHICLE_PLATE_NUMBER>",
        "createdAt": <DATE_IN_EPOCH_TIMESTAMP>,
        "updatedAt": <DATE_IN_EPOCH_TIMESTAMP>
    }

    Example:

    {
        "vehicleId": 1,
        "owner": "0x17d7565b1E8eD70060fcb01CD11e323357f5a72B",
        "model": "Wrath",
        "purchaseDate": 1725706143,
        "vin": "1HGCM82633A123456",
        "color": "Black",
        "plateNumber": "KA01MN0100",
        "createdAt": 1725706143,
        "updatedAt": 1725706143
    }

### Modify scripts/vehicleRegister.ts file

    add user1,user2 and user3 private keys from .env and rpc url in vehicleRegister.ts file. Then run following command:

    npx hardhat run ./scripts/vehicleRegister.ts 

    if provider is for Hedera, then this will register vehicles on Hedera.