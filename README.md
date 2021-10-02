## Deploy the contract

You need configuration settings:

module.exports = {
metamask_mnemonic:
"add your metamask menemonic",
ropsten_network:
"Signup infura and get the url",
};

**Compile the Contract**

$ node ethereum/compile.js

**Deploy the Contract**

$ node ethereum/deploy.js

- Deployed address will be logged on terminal

       console.log("Contract deployed to", result.options.address);

in campaignFactoryInstance.js

      const factoryContractAccountInstance ="address of the deployed the contract";
