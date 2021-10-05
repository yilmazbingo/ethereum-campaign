import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Router from "next/router";
import factory from "../../../../ethereum/campaignFactoryInstance";

const SupplyChainNew = () => {
  const [minContribution, setMinContribution] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    // ALWAYS ALWAYS ALWAYS
    event.preventDefault();

    if (window.ethereum) {
      /*
				OPEN METAMASK AND ASSIGN TO METAMASK CONNECTED ACCOUNT
			*/
      const connected_account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log("connected", connected_account);
      try {
        setLoading(true);
        setError("");
        // console.log("factorer", factory);

        await factory.methods
          .createCampaign(minContribution)
          // whenever we send transactions in the browser, metamask will automatically calculate the amount of gas we need to run this function. so we dont need to specify
          .send({
            from: connected_account[0],
            // chainId: 1,
          });
        setSuccessMessage("New Campaign successfully created");
        Router.push("/");
      } catch (err) {
        console.log("error in creating a new campaign ", err);
        setError(err.message);
      }
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h3>Create Campaign</h3>
      {/* if there is eerror show the Message property. !! converts string to boolean */}
      <Form onSubmit={onSubmit} error={!!error}>
        <Form.Field>
          <label style={{ color: "red" }}>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minContribution}
            onChange={(event) => setMinContribution(event.target.value)}
          />
        </Form.Field>
        {/* Message component does not show by default. thats why we add error property o form */}
        <Message error header="Error" content={error} />
        <Message success header="Success" content={successMessage} />
        {/* loading will show the spinner */}
        <Button loading={loading} primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export default SupplyChainNew;
