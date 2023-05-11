import 'dotenv/config'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-solhint'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-deploy'
// import "hardhat-deploy-ethers";
import 'hardhat-gas-reporter'
import 'hardhat-spdx-license-identifier'
import 'hardhat-watcher'
import 'solidity-coverage'
import '@tenderly/hardhat-tenderly'
import './tasks'

import { HardhatUserConfig } from 'hardhat/config'
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { removeConsoleLog } from 'hardhat-preprocessor'

const accounts = {
  mnemonic: process.env.MNEMONIC || 'test test test test test test test test test test test junk',
}

const namedAccounts = {
  deployer: {
    default: 0,
  },
  admin: {
    default: 1,
  },
  dev: {
    default: 2,
  },
  owner: {
    default: 3,
  },
  wallet: {
    default: 4,
  },
  beneficiary1: {
    default: 5,
  },
  beneficiary2: {
    default: 6,
  },
  user: {
    default: 7,
  },
}

export type Signers = { [name in keyof typeof namedAccounts]: SignerWithAddress }

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  // external: {
  //   contracts: [
  //     {
  //       artifacts: "node_modules/@sushiswap/contracts/artifacts",
  //       // Cannot use import statement outside a module?
  //       deploy: "node_modules/@sushiswap/contracts/deploy",
  //     },
  //   ],
  // },
  gasReporter: {
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: 'USD',
    enabled: process.env.REPORT_GAS === 'true',
  },
  namedAccounts,
  networks: {
    ethereum: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 1,
    },
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ['local'],
    },
    hardhat: {
      forking: {
        enabled: process.env.FORKING === 'true',
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      },
      live: false,
      saveDeployments: true,
      tags: ['test', 'local'],
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts,
      chainId: 3,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gasMultiplier: 15,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 4,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gasMultiplier: 15,
    },
    arbitrumGoerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_GOERLI_ARBITRUM_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
      chainId: 421613,
      live: true,
      saveDeployments: true,
      gasMultiplier: 15,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 5,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gasMultiplier: 15,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 42,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gasMultiplier: 10,
    },
    avalanche: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      accounts,
      chainId: 43114,
      live: true,
      saveDeployments: true,
    },
    polygon: {
      url: 'https://polygon-rpc.com',
      accounts,
      chainId: 137,
      live: true,
      saveDeployments: true,
      gasMultiplier: 2,
    },
    fantom: {
      url: 'https://rpcapi.fantom.network',
      accounts,
      chainId: 250,
      live: true,
      saveDeployments: true,
    },
    harmony: {
      url: 'https://api.harmony.one',
      accounts,
      chainId: 1666600000,
      live: true,
      saveDeployments: true,
      gasMultiplier: 2,
    },
    moonriver: {
      url: 'https://rpc.moonriver.moonbeam.network',
      accounts,
      chainId: 1285,
      live: true,
      saveDeployments: true,
    },
    moonbeam: {
      url: 'https://rpc.api.moonbeam.network',
      accounts,
      chainId: 1284,
      live: true,
      saveDeployments: true,
    },
    bsc: {
      url: 'https://bsc-dataseed.binance.org',
      accounts,
      chainId: 56,
      live: true,
      saveDeployments: true,
    },
    arbitrum: {
      url: 'https://arb1.arbitrum.io/rpc',
      accounts,
      chainId: 42161,
      live: true,
      saveDeployments: true,
    },
  },
  preprocess: {
    eachLine: removeConsoleLog((bre) => bre.network.name !== 'hardhat' && bre.network.name !== 'localhost'),
  },
  solidity: {
    version: '0.6.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  tenderly: {
    project: process.env.TENDERLY_PROJECT || '',
    username: process.env.TENDERLY_USERNAME || '',
  },
  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./contracts'],
      verbose: true,
    },
  },
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
export default config
