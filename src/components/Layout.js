import React from "react";
import { Container } from "semantic-ui-react";
import HeadTags from "./Head";
import Header from "./Header";

const Layout = (props) => (
  <Container>
    <HeadTags></HeadTags>
    <Header />
    {props.children}
  </Container>
);

export default Layout;
