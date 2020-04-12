import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

// import BuyPack from "./BuyPack";

import { Menu, Header } from "semantic-ui-react";

function mapStateToProps(state) {
  return {
    userAddress: state.userAddress,
    userZombieCount: state.userZombieCount,
    totalZombieCount: state.totalZombieCount
  };
}

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {
  render() {
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Salmon" }}>
        <Menu.Item>
          <Link to={{ pathname: "/BuyPack" }}>
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
          <h2>Welcome To our Yu-Gi-Oh Trading card Game</h2>
        </div>
        Your account address: {this.props.userAddress}
        <br />
        You own {this.props.userZombieCount} zombie(s) out of a total of approximately {this.props.totalZombieCount}.
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);
