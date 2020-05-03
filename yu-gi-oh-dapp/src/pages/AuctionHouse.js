import React, { Component } from "react";
import {
  Card,
  Grid,
  Input,
  Segment,
  Pagination,
} from "semantic-ui-react";
import { connect } from "react-redux";

import AuctionCard from "../components/auctionCard";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userAddress: state.userAddress
  };
}

class AuctionHouse extends Component {
  state = {
    auctionTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.totalAuctionCount / 9)
  };

  componentDidMount = async () => {
    await this.makeCards();
  };

  onChange = async (e, pageInfo) => {
    await this.setState({ activePage: pageInfo.activePage });
    this.makeCards();
  };

  handleInputChange = async (e, { value }) => {
      await this.setState({ activePage: value });
      this.makeCards();
  }

  makeCards = async () => {
    const auctions = await this.props.CZ.methods
        .giveMeAddresses().call();
    let auctionTable = [];

    for (
      let i = 0;
      i < auctions.length;
      i++
    ) {
      try {
        let auction = auctions[i];
        auctionTable.push(
          /*<AuctionCard
            address = {auction}
          />*/
        )
      } catch (err) {
        break;
      }
    }
    this.setState({ auctionTable });
  };

  render() {
    return (
      <div>
        <hr />
        <h2> Welcome to the Auction House </h2>
        All cards in here are cards listed on auction by other users. Click on any desired card you may make a
        bid on this card. Once an auction has concluded the final person to make a bid will have won the auction.
        <hr />
        <Grid columns={2} verticalAlign="middle">
          <Grid.Column>
            <Segment secondary>
              <div>activePage: {this.state.activePage}</div>
              <Input
                min={1}
                max={this.state.totalPages}
                onChange={this.handleInputChange}
                type="range"
                value={this.state.activePage}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Pagination
              activePage={this.state.activePage}
              onPageChange={this.onChange}
              totalPages={this.state.totalPages}
            />
          </Grid.Column>
        </Grid>
        <br /> <br />
          <Card.Group>{this.state.auctionTable}</Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AuctionHouse);
