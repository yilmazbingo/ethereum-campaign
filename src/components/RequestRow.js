import React from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import Campaign from "../../ethereum/campaign";

export default function RequestRow(props) {
  const { id, request, address, donatorsCount } = props;
  const readyToFinalize = request.approvalCount > donatorsCount;
  // console.log("request", request);
  const { Row, Cell } = Table;
  const onApprove = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };

  const onFinalize = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  };
  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      {/* request.value,'ether' default is ether */}
      <Cell>{web3.utils.fromWei(request.value)} </Cell>
      <Cell> {request.receipient} </Cell>
      <Cell>
        {request.approvalCount}/{donatorsCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="green" onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="teal" onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}
