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
  };

  componentDidMount = async () => {
    await this.makeCardPackCards();
  };

  makeCardPackCards = async () => {

    const cardPacks = [{name : "Legend of Blue Eyes White Dragon", value: "1 Eth"},
                       {name : "Pharaoh's Servant", value: "1 Eth"},
                       {name : "Labyrinth of Nightmare", value: "1 Eth"},
                       {name : "Ancient Sanctuary", value: "1 Eth"},
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
            key={i}
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
        <Card.Group> {this.state.cardPackTable} </Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListPacks);
