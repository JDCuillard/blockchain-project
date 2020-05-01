//
// This is the "Attack Zombie" page
//

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Icon, Form} from "semantic-ui-react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import CardPack from "../components/cardPack";
import PlayingCard from "../components/card";
import getZombieCount from "../utils/getZombieCount";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userAddress: state.userAddress
  };
}

class BuyPack extends Component {
  state = {
    value: "",
    message: "",
    errorMessage: "",
    loading: false,
    zombieId: null,

    CardTable: [],
    activePage: 1,
    totalPages: Math.ceil(40 / 6)
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

    let packNumber = this.props.location.packNumber - 1;
    const pack = [[89631139,45231177,32274490,46986414,91152256,4614116,77007920,63102017,11868825,86318356,
                        83887306,4206964,50045299,40374923,40374923,90963488,34460851,36121917,2863439,37313348,
                        75356564,15401633,57305373,40826495,39004808,18710707,22910685,44287299,85705804,59197169,
                        46130346,24094653,72842870,74677422,76211194,72302403,10202894,54652250,7089711,55444629],
                  [77585513,90908427,49587034,1248895,98299011,34694160,60866277,22359980,16227556,43711255,
                        79106360,42599677,31477025,4266839,30655537,3134241,78193831,6104968,67049542,66927994,
                        24294108,51345461,24128274,27125110,84620194,10992251,21015833,79870141,32269855,4042268,
                        31447217,23615409,5265750,83994646,22959079,93108433,23171610,2311603,98139712,31477025],
                  [69140098,3573512,46821314,31709826,31987274,67371383,87303357,86281779,12953226,21888494,
                        57882509,29549364,82432018,19827717,18605135,21598948,94163677,5494820,33550694,69954399,
                        95220856,65475294,28358902,90147755,53530069,22419772,58818411,21297224,58696829,84080939,
                        57579381,32541773,67105242,66989694,41855169,40133511,77527210,40916023,45894482,44072894],
                  [65403020,39674352,66073051,2468169,65957473,91345518,63012333,90407382,31812496,53890795,
                        25773409,52768103,84550200,87340664,50823978,83228073,55001420,18590133,18378582,53776525,
                        44762290,98045062,17655904,80161395,10035717,56433456,82828051,45311864,82705573,18190572,
                        44595286,71983925,44472639,70861343,79649195,26566878,52550973,51838385,51616747,50593156]];

    let cardTable = [];
    for (
      var i = this.state.activePage * 6 - 6;
      i < this.state.activePage * 6;
      i++
    ) {
      try {
        cardTable.push(
          <PlayingCard
            name = {cardInformation[pack[packNumber][i]]["name"]}
            id = {pack[packNumber][i]}
            desc = {cardInformation[pack[packNumber][i]]["desc"]}
            small_image_link = {cardInformation[pack[packNumber][i]]["card_images"]["image_url_small"]}
            image_link = {cardInformation[pack[packNumber][i]]["card_images"]["image_url"]}
          />
        );
      } catch {
        break;
      }
    }
    this.setState({ cardTable });
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.methods
        .attack(this.state.zombieId, this.state.value) // contains the zombie ID and the target zombie ID
        .send({
          from: this.props.userAddress
        });
      let newZombie = await this.props.CZ.methods
        .zombies(this.state.zombieId)
        .call();

      if (this.state.zombieLevel < newZombie.level) {
        this.setState({
          loading: false,
          message: "Battle complete.  YOU WON!!!!"
        });
        getZombieCount(this.props.CZ, this.props.userAddress);
      } else {
        this.setState({
          loading: false,
          message: "Battle complete.  WAHHHH.  YOU LOST!!!!"
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
        errorMessage: err.message,
        message:
          "User rejected transaction or Cool Down period has not expired."
      });
    }
  };


  render() {
    let packNumber = this.props.location.packNumber
    return (
      <div>
        <br/>
        <Header
          icon="browser"
          content="Please Confirm that this is the card pack you wish to buy"
        />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Button primary type="submit" loading={this.state.loading}>
            <Icon name="check" />
            Buy Pack
          </Button>
          <hr />
          <h2>{this.state.message}</h2>
        </Form>
        <table>
          <tr>
            <th>
              <CardPack
                packNumber={packNumber}
                Name={this.state.zombieId}
                ID={this.props.location.state.zombieName}
              />
            </th>
            <th>

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

            </th>
          </tr>
        </table>
        <br />

      </div>
    );
  }
}

export default connect(mapStateToProps)(BuyPack);
