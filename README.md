## Deploy the contract

You need configuration settings:

module.exports = {
metamask_mnemonic:
"add your metamask menemonic",
ropsten_network:
"Signup infura and get the url",
};

$ node ethereum/deploy.js

- Deployed address will be logged on terminal

       console.log("Contract deployed to", result.options.address);
