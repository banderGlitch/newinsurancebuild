import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    amoy: {
      accounts: [`${process.env.PRIVATE_KEY}`],
      url: `${process.env.AMOY_RPC}`
    },
    hedera: {
      accounts: [`${process.env.HEDERA_ACCOUNT_PRIVATE_KEY}`],
      url: `${process.env.HEDERA_RPC_RELAY_URL}`
    },
    rootstock: {
      chainId: 31,
      accounts: [`${process.env.PRIVATE_KEY}`],
      url: `${process.env.ROOTSTOCK_RPC_URL}`
    },
    barachain_bartio: {
      chainId: 80084,
      accounts: [`${process.env.BERACHAIN_PRIVATE_KEY}`],
      url: `${process.env.BERACHAIN_RPC_URL}`
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000
  }
};

export default config;

//define hardhat task here, which can be accessed in our test file (test/rpc.js) by using hre.run('taskName')
task("deploy-contract", async () => {
  const deployContract = require("./scripts/deployContract");
  return deployContract();
});