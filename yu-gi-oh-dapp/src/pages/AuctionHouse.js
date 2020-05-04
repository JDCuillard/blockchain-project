import React, { Component } from "react";
import {
  Card,
  Grid,
  Input,
  Segment,
  Pagination,
} from "semantic-ui-react";
import { connect } from "react-redux";
import MyAuction from "../MyAuction";

import AuctionCard from "../components/auctionCard";
import getWeb3 from "../utils/getWeb3";

function mapStateToProps(state) {
  return {
    web3Instance: state.web3Instance,
    CZ: state.CZ,
    userAddress: state.userAddress
  };
}

class AuctionHouse extends Component {
  state = {
    myAuction: null,
    auctionTable: []
  };

  componentDidMount = async () => {
    await this.makeCards();
  };

  onChange = async (e, pageInfo) => {
    await this.setState({});
    this.makeCards();
  };

  makeCards = async () => {
    var request = new XMLHttpRequest();
    request.open("GET", "../../static/cardData/cardinfo.json", false);
    request.send(null);
    let cardInformation = JSON.parse(request.responseText);

    const auctions = await this.props.CZ.methods
        .giveMeAddresses().call();
    let auctionTable = [];
    console.log(auctions);

    for (
      let i = 0;
      i < auctions.length;
      i++
    ) {
      try {
        let auction = auctions[i];
        let MA = new this.props.web3Instance.eth.Contract(MyAuction.abi, auction);
        console.log(MA);
        const end = await MA.methods.auction_end().call();
        const card = await MA.methods.MyCard().call();
        let time = end - +this.now(Date.now());
        let cID = +card.cardid;
        auctionTable.push(
          <AuctionCard
            contract = {MA}
            address = {auction}
            name = {cardInformation[cID]["name"]}
            endTime = {end}
            key = {i}
            id = {cID}
            token = {+card.tokenid}
            remainingTime = {time}
            small_image_link = {cardInformation[cID]["card_images"]["image_url_small"]}
            image_link = {cardInformation[cID]["card_images"]["image_url"]}
            desc = {cardInformation[cID]["desc"]}
          />
        )
      } catch (err) {
        break;
      }
    }
    this.setState({ auctionTable });
  };

  now(time) {
    let t = time.toString();
    let r = t.slice(0, t.length-3);
    return r;
  }

  render() {
    return (
      <div>
        <hr />
        <h2> Welcome to the Auction House </h2>
        All cards in here are cards listed on auction by other users. Click on any desired card you may make a
        bid on this card. Once an auction has concluded the final person to make a bid will have won the auction.
        <hr />
        <br /> <br />
          <Card.Group>{this.state.auctionTable}</Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AuctionHouse);
