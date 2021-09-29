import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Router from "next/router";

const SupplyChainNew = () => {
  const [supplyChainTitle, setSupplyChainTitle] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {};

  return (
    <Layout>
      <h3>Create a Supply Chain</h3>
      <Form onSubmit={onSubmit} error={!!error}>
        <Form.Field>
          <label>Supply Chain Title</label>
          <Input
            label="Title"
            labelPosition="right"
            value={supplyChainTitle}
            onChange={(event) => setSupplyChainTitle(event.target.value)}
          />
        </Form.Field>
        <Message error header="Error" content={error} />
        <Message success header="Success" content={successMessage} />
        <Button loading={loading} primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export default SupplyChainNew;
