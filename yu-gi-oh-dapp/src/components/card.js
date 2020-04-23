import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import CardContent from "./cardContent";
import CardPreview from "./cardPreview";
import CardPackImage from "./cardPackImage";

class PlayingCard extends Component {
  state = {
    modalOpen: false
  };

  modalOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    // return (
    //   <Card style={{ backgroundColor: "LightYellow" }} raised>
    //     <CardContent card={this.props} />
    //   </Card>
    // );
    return (
      <Card style={{ backgroundColor: "LightYellow" }} raised>
        <ReactTooltip delayShow={400} />

        <a
          href="javascript:;"
          data-tip="Click on me to view details about this card"
          onClick={e => this.modalOpen(e)}
        >
          <CardPreview card={this.props} />
        </a>

        {/* a modal is like an "alert", it's a popup that greys out the lower screen and displays its content on top of everything */}

        <Modal open={this.state.modalOpen} onClose={this.handleClose}>
          <Header
            icon="browser"
            content="Here are details about this card"
          />

          <Modal.Content>
            <CardContent card={this.props} />
          </Modal.Content>

          <Modal.Actions>
            <Button color="red" onClick={this.handleClose} inverted>
              <Icon name="cancel" /> Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Card>
    );

  }
}

export default PlayingCard;
