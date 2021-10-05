import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import factory from "../../ethereum/campaignFactoryInstance";
import classes from "@/styles/Home.module.css";
import { Card, Button } from "semantic-ui-react";

export default function Home(props) {
  const { campaigns } = props;
  console.log("props", props);
  useEffect(() => {
    // call() if we are not changing stat
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

    return (
      <Card.Group
        className={classes.post}
        style={{ backgroundColor: "#e48900" }}
        items={items}
      />
    );
  };
  return (
    <Layout>
      <div style={{ marginTop: "5rem" }}>
        <h1> OPEN CAMPAIGNS </h1>
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let campaigns;
  let campaignsCount;
  try {
    // campaigns = await factory.methods.getDeployedCampaign().call();
    campaignsCount = await factory.methods.getCampaignCounts().call();
    // getCampaignCounts().call();

    campaigns = await Promise.all(
      Array(parseInt(campaignsCount))
        .fill()
        .map((element, index) => {
          return factory.methods.getDeployedCampaign(index).call();
        })
    );
    console.log("camapigns in index", campaigns);
  } catch (e) {
    console.log("error in index server", e);
  }
  // console.log("campaigns", campaigns);
  return {
    props: { campaigns: campaigns || [] },
  };
}
