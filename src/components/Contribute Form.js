import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";

const ContributeForm = (props) => {
  const { address } = props;
  //   this is in units of ether
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    // this is our contract instance
    const campaign = Campaign(address);
    setLoading(true);
    setError("");
    try {
      const accounts = await web3.eth.getAccounts();
      //   we are sending money with tx object.
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, "ether"),
      });
      console.log("contributed");
      //   const router = useRouter();
      Router.reload();
      //   Router.replace(router.asPath);
      //   Router.(reload(window.location.pathname))
    } catch (error) {
      console.log("erroro in contribution", error);
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <Form onSubmit={onSubmit} error={!!error}>
      <Form.Field>
        <label style={{ color: "red" }}> Amount to Contribute </label>
        {/* all of the balance is in ether, gas fees are in wei */}
        <Input
          label="ether"
          labelPosition="right"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Field>
      {/* <Message error header="Oops!" content={error} /> */}

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
        Contribute
      </Button>
    </Form>
  );
};

export default ContributeForm;
