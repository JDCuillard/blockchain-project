import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Create an action button with link

class ActionButton extends Component {
  // format long names and addresses into xxxx...xxxx form


  render() {
    const zombieData = {
      zombieName: this.props.data.zombieName,
      zombieId: this.props.data.zombieId,
      zombieDNA: this.props.data.zombieDNA,
      zombieLevel: this.props.data.zombieLevel,
      zombieReadyTime: this.props.data.zombieReadyTime,
      zombieWinCount: this.props.data.zombieWinCount,
      zombieLossCount: this.props.data.zombieLossCount
    };

    const pathName = this.props.pathname;
    const buttonLabel = this.props.buttonLabel;

    console.log("button label", this.props.buttonLabel, pathName, zombieData);
    return (
      <Link
        to={{
          pathname:  pathName ,
          state:  zombieData
        }}
      >
        <Button primary disabled={this.props.disableMe}> {buttonLabel} </Button>
      </Link>
    );
  }
}

export default ActionButton;
