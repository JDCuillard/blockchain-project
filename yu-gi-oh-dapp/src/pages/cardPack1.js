import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import PlayingCard from "../components/card";

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
    totalPages: Math.ceil(40 / 9)
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

    const pack1 = [89631139,45231177,32274490,46986414,91152256,4614116,77007920,63102017,11868825,86318356,
                        83887306,4206964,50045299,40374923,40374923,90963488,34460851,36121917,2863439,37313348,
                        75356564,15401633,57305373,40826495,39004808,18710707,22910685,44287299,85705804,59197169,
                        46130346,24094653,72842870,74677422,76211194,72302403,10202894,54652250,7089711,55444629];
    let cardTable = [];
    for (
      var i = this.state.activePage * 9 - 9;
      i < this.state.activePage * 9;
      i++
    ) {
      try {
        cardTable.push(
          <PlayingCard
            name = {cardInformation[pack1[i]]["name"]}
            id = {pack1[i]}
            desc = {cardInformation[pack1[i]]["desc"]}
            small_image_link = {cardInformation[pack1[i]]["card_images"]["image_url_small"]}
            image_link = {cardInformation[pack1[i]]["card_images"]["image_url"]}
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
