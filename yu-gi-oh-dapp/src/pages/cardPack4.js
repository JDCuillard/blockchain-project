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

    const pack = [65403020,39674352,66073051,2468169,65957473,91345518,63012333,90407382,31812496,53890795,
                        25773409,52768103,84550200,87340664,50823978,83228073,55001420,18590133,18378582,53776525,
                        44762290,98045062,17655904,80161395,10035717,56433456,82828051,45311864,82705573,18190572,
                        44595286,71983925,44472639,70861343,79649195,26566878,52550973,51838385,51616747,50593156];
    let cardTable = [];
    for (
      var i = this.state.activePage * 9 - 9;
      i < this.state.activePage * 9;
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
    return (
      <div>
        <hr />
        <h2> Card Pack 4 </h2>
        These are that cards that come with card pack 4.
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
