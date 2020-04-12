//
// This is the "Feed On Random Cryptokitty" page
//

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Header, Icon, Form, Message } from "semantic-ui-react";
import ZombieCard from "../components/zombieCard";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userAddress: state.userAddress
  };
}

class TransferZombie extends Component {
  state = {
    value: "",
    message: "",
    errorMessage: "",
    loading: false,
    zombieId: null
  };

  // get a random cryptokitty image and the hungry zombie ID when the component mounts

  async componentDidMount() {
    let zombieId = +this.props.location.state.zombieId;
    this.setState({
      zombieId
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.methods
        .transferFrom(this.props.userAddress, this.state.value, this.state.zombieId) // contains the from address, to address, and zombie ID
        .send({
          from: this.props.userAddress
        });
      this.setState({
        loading: false,
        message: "Yay!!!!  The Zombie was successfully transfered!!"
      });
    } catch (err) {
      this.setState({
        loading: false,
        errorMessage: err.message,
        message: "User rejected transaction"
      });
    }
  };

  render() {
    return (
      <div>
        *<Header icon="browser" content="Please give me to a good owner!!" />
        <table>
          <tr>
            <th>
              <ZombieCard
                zombieId={this.state.zombieId}
                zombieName={this.props.location.state.zombieName}
                zombieDNA={this.props.location.state.zombieDNA}
                zombieLevel={this.props.location.state.zombieLevel}
                zombieReadyTime={this.props.location.state.zombieReadyTime}
                zombieWinCount={this.props.location.state.zombieWinCount}
                zombieLossCount={this.props.location.state.zombieLossCount}
                zombieOwner={this.props.userAddress}
                myOwner={false}
              />
            </th>
            <th>
              <img src="static/images/nametag.jpg" alt="name tag" />
            </th>
          </tr>
        </table>
        <br />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>New Zombie Name</label>
            <input
              placeholder="New Owner Address"
              onChange={event =>
                this.setState({
                  value: event.target.value
                })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary type="submit" loading={this.state.loading}>
            <Icon name="check" />
            Transfer Zombie
          </Button>
          <Link to="/MyZombieInventory">
            <Button color="red" inverted>
              <Icon name="cancel" /> Close
            </Button>
          </Link>
          <hr />
          <h2>{this.state.message}</h2>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TransferZombie);
