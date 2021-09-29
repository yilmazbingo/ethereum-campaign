import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import factory from "../../../ethereum/campaignFactoryInstance";
console.log("factory", factory);
import styles from "../styles/Home.module.css";
import { Card, Button } from "semantic-ui-react";

export default function Home(props) {
  console.log("props", props);
  useEffect(() => {
    // call() if we are not changing state
    // const callCampaigns = async () => {
    //   campaigns = await factory.methods.getDeployedCampaigns().call();
    //   return campaigns;
    // };
    // callCampaigns();
  });

  const renderCampaigns = () => {
    const items = props.campaigns.map((address) => {
      return {
        header: address,
        description: <a> View Campaign</a>,
        // fluid:true, will stretch its entire width
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };
  return (
    <Layout>
      <div>
        <h3> Open Campaigns </h3>

        <Button
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        />
        {renderCampaigns()}
      </div>
      ;
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const campaigns = await factory.methods.getDeployedCampaign().call();
  console.log("campaigns", campaigns);
  return {
    props: { campaigns: campaigns.length > 0 ? campaigns : "error" },
  };
}
