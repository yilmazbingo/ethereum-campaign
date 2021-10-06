import React, { useState } from "react";
import { Button, Form, Message, Input, Icon } from "semantic-ui-react";
import Campaign from "../../../../../ethereum/campaign";
import Link from "next/link";
import Router from "next/router";
import Layout from "@/components/Layout";
import web3 from "../../../../../ethereum/web3";

const NewRequest = (props) => {
  const [value, setValue] = useState();
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { address } = props;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!description || !recipient || !value) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    setError("");
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      // we have to pass 3 args
      const result = await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      Router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <Button icon labelPosition="left">
          <a>Back</a>
          <Icon name="left arrow" />
        </Button>
      </Link>
      <h3> Create Request </h3>
      <Form onSubmit={onSubmit} error={!!error}>
        <Form.Field>
          <label> Description </label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label> Value in Ether </label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label> Recipient </label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: " rgb(150, 61, 61)",,
            // background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
            justifyContent: "space-around",
            marginBottom: "2rem",
            borderRadius: "1rem",
          }}
        >
          <Message
            style={{
              width: "90%",
              margin: "auto auto",
              outline: "none !important",
              border: "none !important",
              backgroundColor: " rgb(150, 61, 61)",
              flex: "1",
            }}
            error
            content={`Oops!  ${error} `}
          />
          {error && (
            <Button
              style={{
                backgroundColor: " rgb(150, 61, 61)",

                border: "1px white solid",
              }}
              onClick={() => setError("")}
            >
              X
            </Button>
          )}
        </div>

        <Button primary loading={loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default NewRequest;

export async function getServerSideProps(context) {
  const paramsId = context.params.id;

  return { props: { address: paramsId } };
}
