import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
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
