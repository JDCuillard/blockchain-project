import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import PlayingCard from "../components/card";
import ActionButton from "../components/ActionButton";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    totalZombieCount: state.totalZombieCount,
    userAddress: state.userAddress
  };
}

class CardPack1 extends Component {
  state = {
    CardTable: [],
    activePage: 1,
    totalPages: Math.ceil(40 / 10)
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
    request.send(null)
    let cardInformation = JSON.parse(request.responseText);

    const pack = [69140098,3573512,46821314,31709826,31987274,67371383,87303357,86281779,12953226,21888494,
                        57882509,29549364,82432018,19827717,18605135,21598948,94163677,5494820,33550694,69954399,
                        95220856,65475294,28358902,90147755,53530069,22419772,58818411,21297224,58696829,84080939,
                        57579381,32541773,67105242,66989694,41855169,40133511,77527210,40916023,45894482,44072894];
    let cardTable = [];
    for (
      var i = this.state.activePage * 10 - 10;
      i < this.state.activePage * 10;
      i++
    ) {
      try {
        cardTable.push(
          <PlayingCard
            name = {cardInformation[pack[i]]["name"]}
            id = {pack[i]}
            desc = {cardInformation[pack[i]]["desc"]}
            small_image_link = {cardInformation[pack[i]]["card_images"]["image_url_small"]}
            image_link = {cardInformation[pack[i]]["card_images"]["image_url"]}
          />
        );
      } catch {
        break;
      }
    }
    this.setState({ cardTable });
  };

  render() {
    const buyPack3 = (
      <div>
      {" "}
      Buy Pack <br /> x ether{" "}
      </div>
    );
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Transperent" }}>
          <Menu.Item>
            <h2> Labyrinth of Nightmare </h2>
          </Menu.Item>
          <Menu.Item>
            Labyrinth of Nightmare is a Booster Pack that is an amalgamation
            <br/> of the Japanese sets Labyrinth of Nightmare and Spell of Mask.
          </Menu.Item>
          <Menu.Item position="right">
            <ActionButton
              pathname="/AttackZombie"
              buttonLabel={buyPack3}
              data={this.props}
              packNumber={3}
            />
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
        <Card.Group> {this.state.cardTable} </Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CardPack1);
