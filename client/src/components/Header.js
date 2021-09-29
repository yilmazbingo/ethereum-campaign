import React from "react";
// semantic-ui-react gives components, not style
// for css we could either install semantic-ui-css or add cdn to header
import { Menu } from "semantic-ui-react";
import Link from "next/link";

const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link href="/">
        <a className="item">Test Coin</a>
      </Link>
      <Menu.Menu position="right">
        <Link href="/supply-chain/new">
          <a className="item">Campaigns</a>
        </Link>
        <Link href="/supply-chain/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
