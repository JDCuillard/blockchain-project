import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import CardContent from "./cardContent";
import CardImage from "./cardImage";

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
      <Card style={{ backgroundColor: "LightYellow", width:"200px"}} raised>

        <ReactTooltip delayShow={400} />

        <a
          href="javascript:;"
          data-tip="Click on me to view details about this card"
          onClick={e => this.modalOpen(e)}
        >
          <Card.Content>
            <div>
              <CardImage image_link={this.props.small_image_link} />{" "}
            </div>
            <Card.Header>
              <b>{this.props.name}</b>
            </Card.Header>
          </Card.Content>
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
