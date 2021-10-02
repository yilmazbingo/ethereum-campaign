import React, { useEffect } from "react";

import Layout from "../../components/Layout";
import factory from "../../../../ethereum/campaignFactoryInstance";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { Card, Button } from "semantic-ui-react";

// we need to show summary here, Balance, min Contribution, pending reqs, contribution
// if we handle this here we need to make a request for each detaul, which is too expensive
// Instead add 'getSummary` method on solidity
const ShowCampaign = (props) => {
  const { minContribution, balance, requestsCount, donatorsCount, manager } =
    props;
  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: "Address of the Manager",
        description:
          "This campaign is created by manager and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become a donator",
      },
      {
        header: requestsCount,
        meta: "Number of requests",
        description:
          "A request tries to withdraw money from the contract. Request must be approved by the donators",
      },
      {
        header: donatorsCount,
        meta: "Number of donators",
        description: "Number of people who already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        desscription:
          "The balance is how much money this campaign has left to spend",
      },
    ];
    return <Card.Group items={items} />;
  };

  return <Layout>{renderCards()}</Layout>;
};

export const getServerSideProps = async (context) => {
  const paramsId = context.params.id;

  const campaign = Campaign(paramsId);
  const summary = await campaign.methods.getSummary().call();
  return {
    props: {
      minContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      donatorsCount: summary[3],
      manager: summary[4],
    },
  };
};
export default ShowCampaign;
