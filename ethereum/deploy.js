const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("./web3");
// import web3 from "./web3";
// we are deploying the campaignFactory.
const compiledFactory = require("./build/CampaignFactory.json");
// const config = require("../config");

const { abi, evm } = compiledFactory;

const bytecode = evm.bytecode.object;
const abi_string = JSON.stringify(abi);

// console.log("abi_String", abi_string);

// const metamask_mnemonic = config.metamask_mnemonic;

// const rinkeby_network = config.rinkeby_network;
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: process.env.METAMASK,
  },
  providerOrUrl: process.envRINKEBY_NODE,
});

// const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(abi)
      // Calling deploy does not deploy anything. calling deploy starts to create an object that can be deployed to the network.
      .deploy({ data: "0x" + bytecode })
      .send({ from: accounts[0], gas: 5000000 });
    // this address is used in etherscan to find the account
    console.log("Contract deployed to", result.options.address);
    console.log("ABI:" + abi_string);
  } catch (error) {
    console.log(error);
  }
};
deploy();
