import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import PlayingCard from "../components/card";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userCardCount: state.userCardCount,
    userAddress: state.userAddress
  };
}

class MyCards extends Component {
  state = {
    cardTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.userCardCount / 10)
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
  };

  makeCards = async () => {
    var request = new XMLHttpRequest();
    request.open("GET", "../../static/cardData/cardinfo.json", false);
    request.send(null);
    let cardInformation = JSON.parse(request.responseText);


    const myCards = await this.props.CZ.methods
      .getCardsByOwner(this.props.userAddress)
      .call();
    const tokens = await this.props.CZ.methods
        .getCardsTokenByOwner(this.props.userAddress)
        .call();

    let cardTable = [];
    for (
      var i = this.state.activePage * 10 - 10;
      i < this.state.activePage * 10;
      i++
    ) {
      try {
        cardTable.push(
          <PlayingCard
            name = {cardInformation[myCards[i]]["name"]}
            id = {myCards[i]}
            token = {tokens[i]}
            desc = {cardInformation[myCards[i]]["desc"]}
            small_image_link = {cardInformation[myCards[i]]["card_images"]["image_url_small"]}
            image_link = {cardInformation[myCards[i]]["card_images"]["image_url"]}
          />
        );
      } catch {
        break;
      }
    }
    this.setState({ cardTable });
  };

  render() {
    return (
      <div>
        <hr />
        <h2> Your Cards </h2>
        This is a collection of cards you own.
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
        <Card.Group> {this.state.cardTable} </Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MyCards);
