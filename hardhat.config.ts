import { HardhatUserConfig } from "hardhat/types";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import '@openzeppelin/hardhat-upgrades';
import "@nomiclabs/hardhat-etherscan";
// import "@openzeppelin/contracts-upgradeable"
import "./src";
const RINKEBY_RPC_URL = "https://eth-rinkeby.alchemyapi.io/v2/taLEpPnjCmIER87tLROTW6GNlvIheNen"
const KOVAN_RPC_URL = "https://eth-kovan.alchemyapi.io/v2/taLEpPnjCmIER87tLROTW6GNlvIheNen"
const ETHERSCAN_API_KEY = "RKBUWRB6YXGNKBE9VA134A1R763PD6U2M4"
// optional
const PRIVATE_KEY = "a3d3f11bfe51468f16efbb6f15d2f3dd33eee513241812c401196aeb538e2842"


module.exports= {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking:{
        url:"https://eth-mainnet.g.alchemy.com/v2/hK1w_lNLh9MOTnr5iZm2K_vOT8ZNYeXM",
        blockNumber: 15846319
      }
    },
    local: {
      url: 'http://127.0.0.1:8545/'
    },
 mainnet:{
  url: "https://eth-mainnet.g.alchemy.com/v2/hK1w_lNLh9MOTnr5iZm2K_vOT8ZNYeXM" ,
  accounts: [PRIVATE_KEY],
  chainId: 1,
 },
 mumbai:{
  url: "https://polygon-mumbai.g.alchemy.com/v2/7MHqFUExjcK_3fYrll3nNKnMb8_3EwoS" ,
  accounts: [PRIVATE_KEY],
  chainId: 80001,
 },
    goerli:{
      url: "https://eth-goerli.g.alchemy.com/v2/CFKeOAiXYkjT6o-18rkEdSClaM6zdPYl" ,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    kovan: {
      url: KOVAN_RPC_URL,
      accounts: [PRIVATE_KEY],
      // accounts: {
      //   mnemonic: "",
      // },
    gasPrice:"auto",   
      // # of confs to wait between   deployments. (default: 0)   

 // # of blocks before 
      // a deployment  times out  (minimum/default: 50)

    },
  },

  solidity: {
    compilers: [
      { version: "0.8.7", settings: { optimizer: {
        enabled: true,
        runs: 200,
      },} },
      { version: "0.8.12", settings: { optimizer: {
        enabled: true,
        runs: 200,
      },} },
      { version: "0.5.16", settings: { optimizer: {
        enabled: true,
        runs: 200,
      },} },
      { version: "0.6.6", settings: { optimizer: {
        enabled: true,
        runs: 200,
      },} },
    ],
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
};


