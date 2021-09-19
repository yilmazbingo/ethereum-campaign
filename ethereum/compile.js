const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
// removeSync is specific to fx-extra
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

var input = {
  language: "Solidity",
  // we could compile multiple contracts
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input))); // an object
// it spits out bytecode and interface
// console.log("output", output);
// console.log("output-object", output.contracts["Lottery.sol"][contract_name]);
// console.log(output.contracts["Lottery.sol"][contract_name]);

if (output.errors) {
  output.errors.forEach((err) => {
    console.log(err.formattedMessage);
  });
} else {
  const contracts = output.contracts["Campaign.sol"];
  // if dir does not exist it will create it for us
  fs.ensureDirSync(buildPath);
  for (let contractName in contracts) {
    console.log("contractName", contractName);
    const contract = contracts[contractName];
    fs.writeFileSync(
      path.resolve(buildPath, `${contractName}.json`),
      // JSON.stringify(value, replacer, space)
      // A function that alters the behavior of the stringification process, or an array of String and Number that serve as an allowlist for selecting/filtering the properties of the value object to be included in the JSON string. If this value is null or not provided, all properties of the object are included in the resulting JSON string.
      JSON.stringify(contract, null, 2),
      "utf8"
    );
  }
}
