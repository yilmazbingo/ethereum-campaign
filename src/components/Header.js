import React, { useState, useEffect } from "react";
// semantic-ui-react gives components, not style
// for css we could either install semantic-ui-css or add cdn to header
import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";
import classes from "../styles/components/Header.module.css";

const Header = () => {
  // Menu.Item and Link clashes each other. Thats why I use only Link
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (typeof window.web3 !== "undefined") {
      setDisabled(false);
    }
  }, [typeof window !== "undefined" && window.web3]);
  return (
    <Menu
      className={classes.menu}
      style={{
        marginTop: "10px",
      }}
    >
      {/* Link is a generic wrapper component that does not add any Html of its own. Instead it wraps its children with click event */}
      <Link href="/">
        <a style={{ color: "blue" }} className="item">
          CAMPAIGNS
        </a>
      </Link>
      <Menu.Menu className={classes.some} position="right">
        <Link href="/campaigns/new">
          <a style={{ color: "blue" }} className="item">
            Eth Coin
          </a>
        </Link>
        <Link href="/campaigns/new">
          <Button
            disabled={disabled}
            style={{ marginRight: 0 }}
            className="green"
          >
            <a>+</a>
          </Button>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
