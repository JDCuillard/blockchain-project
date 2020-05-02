import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

// import BuyPack from "./BuyPack";

import { Menu, Header } from "semantic-ui-react";

function mapStateToProps(state) {
  return {
    userAddress: state.userAddress
  };
}

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {
  render() {
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Salmon" }}>
        <Menu.Item>
          <Link to={{ pathname: "/ListPacks" }}>
            <Button primary>Buy a Card Pack</Button>
          </Link>
        </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/MyCards" }}>
              <Button primary>My Cards</Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/ZombieInventory" }}>
              <Button primary>Auction House</Button>
            </Link>
          </Menu.Item>

          <Menu.Item position="right">
            <Link to={{ pathname: "/" }}>
              <Header size="large">CS481A3 </Header>
            </Link>
          </Menu.Item>
        </Menu>
        <div className="center">
        </div>
        Your account address: {this.props.userAddress}
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);
