// import Web3 from "web3";
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
// const config = require("../config");

let web3;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  window.ethereum.enable();
  // we are on browser and we are running metamask
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on server or user is not runnint metamask
  const provider = new HDWalletProvider({
    mnemonic: {
      phrase: process.env.METAMAST,
    },
    providerOrUrl: RINKEBY_NODE,
  });
  web3 = new Web3(provider);
  // console.log("web3 in broeser", web3);
}
module.exports = web3;
