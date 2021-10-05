const web3 = require("./web3");
// const Web3EthContract = require("web3-eth-contract");
// console.log("web3", web3);
// const campaignFactory = require("../ethereum/build/CampaignFactory.json");
import campaignFactory from "../ethereum/build/CampaignFactory.json";

const factoryContractAccountInstance =
  "0xa660A7Ea19782247cA2a19dDCCE50a9037Eabd7C";
// Web3EthContract.setProvider(
//   "wss://rinkeby.infura.io/ws/v3/6bbc88ad6ea44bd0a8442b596ea8b079"
// );

const campaignFactoryInstance = new web3.eth.Contract(
  campaignFactory.abi,
  factoryContractAccountInstance
);
// console.log("camoaignafactoru instacne", campaignFactoryInstance);

export default campaignFactoryInstance;

// import web3 from "./web3";
// import supplyChainFactory from "../truffle/build/contracts/SupplyChainFactory.json";
// // console.log("supplychainFactory", supplyChainFactory);

// // When you deploy the contract with truffle, you get this
// const factoryContractAccountInstance =
//   "0x004970070D08BaC0a7D00228495405Ff2830A311";

// const supplyChainFactoryInstance = await new web3.eth.Contract(
//   supplyChainFactory.abi,
//   factoryContractAccountInstance
// );

// export default supplyChainFactoryInstance;
