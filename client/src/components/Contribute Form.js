import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
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
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <Form onSubmit={onSubmit} error={!!error}>
      <Form.Field>
        <label> Amount to contribute </label>
        {/* all of the balance is in ether, gas fees are in wei */}
        <Input
          label="ether"
          labelPosition="right"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Field>
      <Message error header="Oops!" content={error} />
      <Button primary loading={loading}>
        Contribute
      </Button>
    </Form>
  );
};

export default ContributeForm;
