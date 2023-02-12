require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY =
  process.env.GOERLI_PRIVATE_KEY ||
  "533746b20bf76abd75a22441ccc27b9e86227f8667d88af45e613b4e3405b6a4";
module.exports = {
  solidity: "0.8.17",
  etherscan: {
    apikey: "91I1NHBHTEG6V5EQNAD4EM16I69JDGQ1JF",
  },
  networks: {
    goerli: {
      url:
        process.env.QUICKNODE_API_KEY_URL ||
        "https://quiet-red-dew.ethereum-goerli.discover.quiknode.pro/346f2b06ce6744f26b38d83dbf237c509367009e/ ",
      accounts: [PRIVATE_KEY] || "",
    },
  },
};
