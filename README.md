## Production

https://ethereum-7g687xy5m-yilmazbingo.vercel.app/

## Demo

In case you have no metamask setup to interact with, here is the demo link:

       https://www.youtube.com/watch?v=ZBB9BOVpiCQ&ab_channel=yilmazbingol

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
