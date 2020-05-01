import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
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

class CardPack extends Component {
  state = {
    CardTable: [],
    activePage: 1,
    totalPages: Math.ceil(40 / 10),
    title: "",
    packInfo: {}

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

    let packNumber = this.props.location.packNumber;

    let requestPackInfo = new XMLHttpRequest();
    requestPackInfo.open("GET", "../../static/cardData/cardPack.json", false);
    requestPackInfo.send(null);
    let packInfo = JSON.parse(requestPackInfo.responseText)[packNumber];
    this.setState({ packInfo });


    let cardTable = [];
    for (
      var i = this.state.activePage * 10 - 10;
      i < this.state.activePage * 10;
      i++
    ) {
      try {
        cardTable.push(
          <PlayingCard
            name = {cardInformation[packInfo["cards"][i]]["name"]}
            id = {packInfo["cards"][i]}
            desc = {cardInformation[packInfo["cards"][i]]["desc"]}
            small_image_link = {cardInformation[packInfo["cards"][i]]["card_images"]["image_url_small"]}
            image_link = {cardInformation[packInfo["cards"][i]]["card_images"]["image_url"]}
          />
        );
      } catch {
        break;
      }
    }
    this.setState({ cardTable });
  };

  render() {
    const buyPack = (
      <div>
        {" "}
        Buy Pack <br /> {this.state.packInfo["price"]} ether{" "}
      </div>
    );
    return (
      <div>
        <table width="100%">
          <tr>
            <td>
              <h2> {this.state.packInfo["title"]} </h2>
            </td>
            <td width="125px" align="right">
              <ActionButton
                pathname="/BuyPack"
                buttonLabel={buyPack}
                data={this.props}
                packNumber={this.props.location.packNumber}
              />
            </td>
          </tr>
          <tr>
            <td>
              {this.state.packInfo["desc"]}
            </td>
          </tr>
        </table>
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
        <Card.Group centered items={this.state.cardTable}> {this.state.cardTable} </Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CardPack);
