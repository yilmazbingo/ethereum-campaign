// campaign.methods.createRequest has require statemnt. remove that statement to test it properly
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

// this is in local ganache network gasLimit has to be set to 10million and and factory gas must be 10million
const web3 = new Web3(ganache.provider({ gasLimit: 10000000 }));

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  // we create one factory and then make it available inside each if statement. we use factory to create an instance of campaign
  // ABI is the javascript interpretation of what the contract is

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({
      data: compiledFactory.evm.bytecode.object,
    })
    .send({ from: accounts[0], gas: "10000000" });
  // min 100 wei. since we are modifyin data inside contract so we send a transaction
  // when we send transaction we get no result back, except a tx receipt. That is why created getDeployedCampaigns inside the Factory
  await factory.methods.createCampaign("100").send({
    // accounts[0] will pay for the deploying the fee
    from: accounts[0],
    gas: "1000000",
  });
  // this is 'view' function. we are not changing any data. so we are going to call this.. since we deployed only 1 contract
  [campaignAddress] = await factory.methods.getDeployedCampaign().call();
  // console.log(campaignAddress);
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploys a factory and campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as the camaoign manager", async () => {
    // whenever we make a public variable inside of our contract a get method is automatically created.manager() is automatically created for us
    // since we are not modifying data, we are retriveing data so we use call() instead of send()
    // The executed code is given all available gas for execution making this type of value transfer unsafe against reentrancy.
    const manager = await campaign.methods.manager().call();
    assert.strictEqual(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      // minval=100
      value: "200",
      from: accounts[1],
    });
    // when somone contributes added to donators mapping which is marked as public but we cannot get the entire mapping. we can look up
    const isContributor = await campaign.methods.donators(accounts[1]).call();
    assert(isContributor);
  });
  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (e) {
      assert(e);
    }
  });

  //  -------- this function in contract has a require condition. in order to pass this, remove the require, rebuild the contract and run it
  it("allows a manager to make a payment request", async () => {
    // we are sending a transaction but we wont get nothing back. so we need to reach the request and pullout request
    await campaign.methods
      .createRequest("Buy batteries", "1000", accounts[1])
      .send({
        from: accounts[0],
        gas: "10000000",
      });
    // requests array is public so we have a getter. But we can retrieve one function at a time
    const request = await campaign.methods.requests(0).call();
    console.log("request.description", request.description);
    assert.strictEqual("Buy batteries", request.description);
  });

  it("processes request", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      // it is safer to alot of wei. small amount might get lost
      value: web3.utils.toWei("10", "ether"),
    });
    // acounts[0] is making request to accounts[1]
    await campaign.methods
      .createRequest("Description", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });
    // we created only 1 request so its index is 0
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });
    // getBalance returns string. first turn it to ether then to number
    let balance = await web3.eth.getBalance(accounts[1]);

    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance); // takes a string and converts it into decimal number
    // ganache accounts are not reset after each test. we had to restart the pc. each account ahs 100 eth in ganache
    console.log("balance account 1", balance);
    assert(balance > 103);
  });
});
