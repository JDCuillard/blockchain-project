import React, { Component } from "react";
import {
  Card,
  Grid,
  Input,
  Segment,
  Pagination,
} from "semantic-ui-react";
import { connect } from "react-redux";

import zombieCard from "../components/zombieCard";

import auctionCard from "../components/auctionCard";

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
    let cList = [];
    let cOwner = [];

    await this.setState({ auctionTable: [] }); // clear screen while waiting for data


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
        auctionTable.push(
            <auctionCard
              name={cards[i].name}
              desc={cards[i].desc}
              value={cards[i].value}
            />
        )
      } catch (err) {
        break;
      }
    }

    // create a set of zombie cards in the state table

  /*  let zombieTable = [];
    for (let i = 0; i < zList.length; i++) {
      let myDate = new Date(zList[i].readyTime * 1000).toLocaleString();
      zombieTable.push(
        <ZombieCard
          key={i}
          zombieId={this.state.activePage * 9 - 9 + i}
          zombieName={zList[i].name}
          zombieDNA={zList[i].dna}
          zombieLevel={zList[i].level}
          zombieReadyTime={myDate}
          zombieWinCount={zList[i].winCount}
          zombieLossCount={zList[i].lossCount}
          zombieOwner={zOwner[i]}
          myOwner={this.props.userAddress === zOwner[i]}
        />
      );
    }*/
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
        <div>
          <Card.Group>{this.state.auctionTable}</Card.Group>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AuctionHouse);