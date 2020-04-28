import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import CardContent from "./cardContent";
import CardPreview from "./cardPreview";
import CardPackImage from "./cardPackImage";

class auctionCard extends Component {
  state = {
    modalOpen: false
  };

  modalOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const bidButton = (
      <div>
        {" "}
        Make a higher bid! (" "}
      </div>
     );

    const cancelAuctionButton = (
      <div>
        {" "}
        End your current auction early! (" "}
      </div>
    );

    return (
      <Card style={{ backgroundColor: "LightYellow" }} raised>
        <ReactTooltip delayShow={400} />

        <a
          href="javascript:;"
          data-tip="Click on me to view auction details"
          onClick={e => this.modalOpen(e)}
        >
          <CardPreview card={this.props} />
        </a>

        {/* a modal is like an "alert", it's a popup that greys out the lower screen and displays its content on top of everything */}

        <Modal open={this.state.modalOpen} onClose={this.handleClose}>
          <Header
            icon="browser"
            content="Here are details about the card you clicked"
          />

          <Modal.Content>
            <ActionButton
              buttonLabel={bidButton}
              data={this.props}
            />
            <ActionButton
              buttonLabel={cancelAuctionButton}
              data={this.props}
            />
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
