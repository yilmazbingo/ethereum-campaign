import React, { useEffect, useState } from "react";

import Link from "next/link";
import Layout from "@/components/Layout";
import factory from "../../ethereum/campaignFactoryInstance";
import classes from "@/styles/Home.module.css";
import { Card, Button, Message } from "semantic-ui-react";

export default function Home(props) {
  const [disabled, setDisabled] = useState(false);
  const { campaigns } = props;

  console.log("props", props);
  useEffect(() => {
    if (typeof window.web3 === "undefined") {
      setDisabled(true);
    }
  }, []);

  const renderCampaigns = () => {
    const items =
      campaigns &&
      campaigns.map((address) => {
        return {
          header: address,
          description: (
            <Link href={`campaigns/${address}`}>
              <Button
                disabled={disabled}
                style={{ color: "green", marginTop: "1rem" }}
              >
                <a style={{ color: "black" }}> View Campaign</a>
              </Button>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            margin: "auto auto",
            justifyContent: "space-around",
            // width: "70%",
            marginBottom: "2rem",
            borderRadius: "1rem",
          }}
        >
          <Message
            style={{
              outline: "none !important",
              border: "none !important",
              backgroundColor: " rgb(150, 61, 61)",
              flex: "1",
            }}
            error
            content="No Metamask wallet detected! You cannot interact with the contract"
          />
          {/* {error && (
            <Button
              style={{
                backgroundColor: " rgb(150, 61, 61)",

                border: "1px white solid",
              }}
              onClick={() => setError("")}
            >
              X
            </Button>
          )} */}
        </div>

        <h1> OPEN CAMPAIGNS </h1>
        <Link href="/campaigns/new">
          <a>
            <Button
              disabled={disabled}
              // floated="right"
              content="Create Campaign"
              style={{ marginBottom: "2rem" }}
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
