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

    const pack = [77585513,90908427,49587034,1248895,98299011,34694160,60866277,22359980,16227556,43711255,
                        79106360,42599677,31477025,4266839,30655537,3134241,78193831,6104968,67049542,66927994,
                        24294108,51345461,24128274,27125110,84620194,10992251,21015833,79870141,32269855,4042268,
                        31447217,23615409,5265750,83994646,22959079,93108433,23171610,2311603,98139712,31477025];
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
    const buyPack2 = (
      <div>
      {" "}
      Buy Pack <br /> x ether{" "}
      </div>
    );

    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Transperent" }}>
          <Menu.Item>
            <h2> Pharaoh's Servant </h2>
          </Menu.Item>
          <Menu.Item>
            Pharaoh's Servant is a Booster Pack, which is a combination of the Japanese sets Curse of Anubis and Thousand Eyes Bible.
          </Menu.Item>
          <Menu.Item position="right">
            <ActionButton
              pathname="/AttackZombie"
              buttonLabel={buyPack2}
              data={this.props}
              packNumber={2}
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
