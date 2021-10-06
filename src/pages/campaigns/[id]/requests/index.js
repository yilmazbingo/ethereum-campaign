import React from "react";
import { Button, Table, Icon } from "semantic-ui-react";
import Link from "next/link";
import Layout from "@/components/Layout";
import RequestRow from "@/components/RequestRow";
import Campaign from "../../../../../ethereum/campaign";
export default function Index(props) {
  const { address, requests, donatorsCount, requestCount } = props;
  const { Header, Row, HeaderCell, Body } = Table;
  const renderRows = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          request={request}
          id={index}
          key={index}
          address={address}
          donatorsCount={donatorsCount}
        />
      );
    });
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}`}>
        <Button icon labelPosition="left">
          <a>Back</a>
          <Icon name="left arrow" />
        </Button>
      </Link>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button floated="right" style={{ marginBottom: 10 }} primary>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient Address</HeaderCell>
            <HeaderCell> Donator Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div style={{ color: "white", fontSize: "larger" }}>
        {" "}
        Found {requestCount} requests{" "}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const address = context.params.id;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const donatorsCount = await campaign.methods.donatorsCount().call();
  console.log("requests.count", requestCount);
  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );
  // console.log("requests", requests);
  return {
    props: {
      address,
      requests: JSON.parse(JSON.stringify(requests)),
      requestCount,
      donatorsCount,
    },
  };
}
