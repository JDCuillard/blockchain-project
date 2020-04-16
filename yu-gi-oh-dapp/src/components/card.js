import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import CardContent from "./cardContent";

class PlayingCard extends Component {
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
        <CardContent card={this.props} />
      </Card>
  );
  }
}

export default PlayingCard;
