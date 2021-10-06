const web3 = require("./web3");
// const Web3EthContract = require("web3-eth-contract");
// const campaignFactory = require("../ethereum/build/CampaignFactory.json");
import campaignFactory from "./build/CampaignFactory.json";

const factoryContractAccountInstance =
  "0xa660A7Ea19782247cA2a19dDCCE50a9037Eabd7C";

const campaignFactoryInstance = new web3.eth.Contract(
  campaignFactory.abi,
  factoryContractAccountInstance
);
// console.log("camoaignafactoru instacne", campaignFactoryInstance);

export default campaignFactoryInstance;
