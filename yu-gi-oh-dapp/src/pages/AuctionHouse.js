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
    totalAuctionCount: state.totalAuctionCount,
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
    const cards = [{name : "Card 1", desc: "description for card 1", value: "a"},
      {name : "Card 2", desc: "description for card 2", value: "b"},
      {name : "Card 3", desc: "description for card 3", value: "c"},
      {name : "Card 4", desc: "description for card 4", value: "d"},
      {name : "Card 5", desc: "description for card 5", value: "e"}
    ];
    let auctionTable = [];

    for (
      let i = 0;
      i < cards.length;
      i++
    ) {
      try {
        let pack = cards[i];
        auctionTable.push(
          <AuctionCard
            name = {pack.name}
            desc = {pack.desc}
            value = {pack.value}
          />
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
