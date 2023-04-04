// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;
    uint public campaignsCount;

    // args will be the args that Campaign conract's constructor need.
    // message variable will be Factory campaig. but we want the user to be sender of Campaign
    // person who calls this should be marked as manager
    function createCampaign(uint minimum) public {
        // msg.sender is the user who tries to create the campaign
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(address(newCampaign));
        campaignsCount++;
    }

    function getDeployedCampaign(uint index) public view returns (address) {
        return deployedCampaigns[index];
    }

    function getCampaignCounts() public view returns (uint) {
        return campaignsCount;
    }
}

contract Campaign {
    // this is a defintion not an instance of Request. it is type
    // we only have to initialize value types, not need to initialzie reference types
    struct Request {
        string description;
        uint value;
        address payable receipient;
        // this is true after finalizing the request
        bool complete;
        uint approvalCount;
    }

    Request[] public requests;
    // keep track of people who voted
    mapping(address => bool) approvals;
    address public manager;
    uint public minimumContribution;
    uint public donatorsCount;
    // we refactored to mapping cause search in array costs alot
    // address[] public approvers;
    mapping(address => bool) public donators;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) {
        // msg.sender who is attempting to create the contract
        // if we create this with Factory contract, manager will be that factory contract.
        // manager=msg.sender;
        manager = creator;
        minimumContribution = minimum;
    }

    // anytime someone is going to send some money we need to mark the corresponding function as being payable
    // when we send transaction we do not send in argument, we sent with msg.value
    function contribute() public payable {
        require(msg.value > minimumContribution);
        // keys are not stored in mapping, only the values
        donators[msg.sender] = true;
        donatorsCount++;
    }

    // variables are storage data
    // Memory remporary place to store data, like RAM
    // Function args are memory data
    // this is a spending request. maneger will call this when it needs to buy something

    function createRequest(
        string memory description,
        uint value,
        address payable recipient
    ) public restricted {
        require(donators[msg.sender]);
        Request memory newRequest = Request({
            description: description,
            value: value,
            receipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    // search time for mapping is O(1), constant time. for array O(N) is linear time. so for-loop would cost too much
    // look-up operation in array is constant time operation.
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        // approvers are donators. make sure callers is a donator
        require(donators[msg.sender]);
        // Make sure caller did not vote before
        require(!approvals[msg.sender]);
        approvals[msg.sender] = true;
        request.approvalCount++;
    }

    // finalize the request. manger should only be able to call this after request has gotten enough votes
    function finalizeRequest(uint index) public restricted {
        // storage says, look for the exactly request obj stored inside the storage
        Request storage request = requests[index];
        require(request.approvalCount > (donatorsCount / 2));
        require(!request.complete);
        // since this address is payable, it has transfer()
        //  .transfer() and .send() send more gas than 2300. Thus making it possible for reentrancy.
        request.receipient.transfer(request.value);
        request.complete = true;
    }

    // we need to display details of contract on UI. If i did not create this, I would make a request for each detail
    function getSummary()
        public
        view
        returns (uint, uint, uint, uint, address)
    {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            donatorsCount,
            manager
        );
    }

    // we cannot retrieve array of structs. so we use this in client to retireve by one one
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}

// function getSummary() public view returns (uint,uint,uint,uint,address){
//         return (
//             minimumContribution,
//             address(this).balance,
//             requests.length,
//             donatorsCount,manager
//         );
//     }
