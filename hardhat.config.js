require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.MUMBAI_PRIVATE_KEY], // Replace with your Mumbai testnet private key
      chainId: 80001
    },
    hardhat: {
      chainId: 1337, // Change this to your desired chain ID
    },
  },
};
