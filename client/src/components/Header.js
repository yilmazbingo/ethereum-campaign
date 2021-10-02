import React from "react";
// semantic-ui-react gives components, not style
// for css we could either install semantic-ui-css or add cdn to header
import { Menu } from "semantic-ui-react";
import Link from "next/link";

const Header = () => {
  // Menu.Item and Link clashes each other. Thats why I use only Link
  return (
    <Menu style={{ marginTop: "10px" }}>
      {/* Link is a generic wrapper component that does not add any Html of its own. Instead it wraps its children with click event */}
      <Link href="/">
        <a className="item">Campaigns</a>
      </Link>
      <Menu.Menu position="right">
        <Link href="/campaigns/new">
          <a className="item">CrowdCoin</a>
        </Link>
        <Link href="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
