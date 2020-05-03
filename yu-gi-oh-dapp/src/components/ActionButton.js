import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Create an action button with link

class ActionButton extends Component {
  // format long names and addresses into xxxx...xxxx form


  render() {
    const cardData = {
      cardid: +this.props.data.id,
      tokenid: +this.props.data.token,
    };

    const pathName = this.props.pathname;
    const packNumber = this.props.packNumber;
    const buttonLabel = this.props.buttonLabel;

    console.log("button label", this.props.buttonLabel, pathName, cardData);
    return (
      <Link
        to={{
          pathname:  pathName ,
          packNumber: packNumber,
          state:  cardData
        }}
      >
        <Button primary disabled={this.props.disableMe}> {buttonLabel} </Button>
      </Link>
    );
  }
}

export default ActionButton;
