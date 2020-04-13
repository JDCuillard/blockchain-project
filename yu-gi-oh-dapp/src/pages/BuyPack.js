import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import CardPack from "../components/cardPack";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userZombieCount: state.userZombieCount,
    userAddress: state.userAddress
  };
}

class BuyPack extends Component {
  state = {
    ZombieTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.userZombieCount / 9)
  };

  componentDidMount = async () => {
    await this.makeCardPackCards();
  };

  makeCardPackCards = async () => {
    const myZombies = await this.props.CZ.methods
      .getZombiesByOwner(this.props.userAddress)
      .call();
    const cardPacks = [{name : "Card Pack 1", value: "a", page: "/cardPack1"},
                       {name : "Card Pack 2", value: "b", page: "/cardPack2"},
                       {name : "Card Pack 3", value: "c", page: "/cardPack3"},
                       {name : "Card Pack 4", value: "d", page: "/cardPack4"},
                       {name : "Card Pack 5", value: "e", page: "/cardPack5"}
                     ];
    let zombieTable = [];
    for (
      var i = 0;
      i < cardPacks.length;
      i++
    ) {
      try {
        let pack = cardPacks[i];
        let z = myZombies[i];
        let zombie = await this.props.CZ.methods.zombies(z).call();
        let myDate = new Date(zombie.readyTime * 1000).toLocaleString();
        zombieTable.push(
          <CardPack
            name= {pack.name}
            value = {pack.value}
            page = {pack.page}
            number={i + 1}

          />
        );
      } catch {
        break;
      }
    }
    this.setState({ zombieTable });
  };

  render() {
    return (
      <div>
        <hr />
        <h2> Buy a new Card Pack </h2>
        Buy a new card pack to add to your dueling arsenal. In each pack, is 40 predetermined Cards
        as well as 5 random cards. They can be lucky. You can keep these cards or put them up for auction!
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
        <Card.Group> {this.state.zombieTable} </Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BuyPack);
