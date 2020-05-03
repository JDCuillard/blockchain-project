import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import CardPack from "../components/cardPack";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userAddress: state.userAddress
  };
}

class ListPacks extends Component {
  state = {
    cardPackTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.userZombieCount / 9)
  };

  componentDidMount = async () => {
    await this.makeCardPackCards();
  };

  makeCardPackCards = async () => {

    const cardPacks = [{name : "Legend of Blue Eyes White Dragon", value: "a", page: "/cardPack1"},
                       {name : "Pharaoh's Servant", value: "b", page: "/cardPack2"},
                       {name : "Labyrinth of Nightmare", value: "c", page: "/cardPack3"},
                       {name : "Ancient Sanctuary", value: "d", page: "/cardPack4"},
                     ];
    let cardPackTable = [];
    for (
      var i = 0;
      i < cardPacks.length;
      i++
    ) {
      try {
        let pack = cardPacks[i];
        cardPackTable.push(
          <CardPack
            name= {pack.name}
            value = {pack.value}
            page = {"/cardPack1"}
            packNumber={i + 1}
          />
        );
      } catch {
        break;
      }
    }
    this.setState({ cardPackTable });
  };

  render() {
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Transperent" }}>
          <Menu.Item>
            <h2> Buy a card pack! </h2>
          </Menu.Item>
          <Menu.Item>
            There are 40 available cards in a card pack <br/>
            Upon purchase, you will acquire 5 random cards out of those 40
          </Menu.Item>
        </Menu>
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
        <Card.Group> {this.state.cardPackTable} </Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListPacks);
