import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import factory from "../../../ethereum/campaignFactoryInstance";
console.log("factory", factory);
import styles from "../styles/Home.module.css";
import { Card, Button } from "semantic-ui-react";

export default function Home(props) {
  const { campaigns } = props;
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
    const items =
      campaigns &&
      campaigns.map((address) => {
        return {
          header: address,
          description: (
            <Link href={`campaigns/${address}`}>
              <a> View Campaign</a>
            </Link>
          ),
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
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>

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
    props: { campaigns: campaigns.length > 0 ? campaigns : [] },
  };
}
