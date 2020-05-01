import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import CardPackContent from "./cardPackContent";

class CardPack extends Component {
  state = {
    modalOpen: false
  };

  modalOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Card style={{ backgroundColor: "LightBlue" }}>
        <CardPackContent pack={this.props} />
      </Card>
  );
  }
}

export default CardPack;
