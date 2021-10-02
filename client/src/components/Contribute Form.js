import React from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";

import { Menu } from "semantic-ui-react";
import Link from "next/link";

const ContributeForm = () => {
  return (
    <Form>
      <Form.Field>
        <label> Amount to contribute </label>
        {/* all of the balance is in ether, gas fees are in wei */}
        <Input label="ether" labelPosition="right" />
      </Form.Field>
      <Button primary>Contribute</Button>
    </Form>
  );
};

export default ContributeForm;
