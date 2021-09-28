import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import factory from "../../ethereum/campaignFactoryInstance";
console.log("factory", factory);
import styles from "../styles/Home.module.css";

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
  return <div className={styles.container}>index</div>;
}

export async function getServerSideProps(context) {
  const campaigns = await factory.methods.getDeployedCampaign().call();
  console.log("campaigns", campaigns);
  return {
    props: { campaigns: campaigns.length > 0 ? campaigns[0] : "error" },
  };
}
