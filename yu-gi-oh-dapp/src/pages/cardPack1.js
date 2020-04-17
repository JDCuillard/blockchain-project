import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import PlayingCard from "../components/card";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userZombieCount: state.userZombieCount,
    userAddress: state.userAddress
  };
}

class CardPack1 extends Component {
  state = {
    ZombieTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.userZombieCount / 9)
  };

  componentDidMount = async () => {
    await this.makeCards();
  };

  makeCards = async () => {
    const cards = [{name : "Card 1", id: 1, desc: "description for card 1", value: "a"},
                   {name : "Card 2", id: 2, desc: "description for card 2", value: "b"},
                   {name : "Card 3", id: 3, desc: "description for card 3", value: "c"},
                   {name : "Card 4", id: 4, desc: "description for card 4", value: "d"},
                   {name : "Card 5", id: 5, desc: "description for card 5", value: "e"}
                     ];
    let cardTable = [];
    for (
      var i = 0;
      i < cards.length;
      i++
    ) {
      try {
        let pack = cards[i];
        cardTable.push(
          <PlayingCard
            name = {pack.name}
            id = {pack.id}
            value = {pack.value}
            desc = {pack.desc}
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
        <h2> Card Pack 1 </h2>
        These are that cards that come with card pack 1.
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

export default connect(mapStateToProps)(CardPack1);
