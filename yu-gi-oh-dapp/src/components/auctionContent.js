import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import CardImage from "./cardImage";

class AuctionContent extends Component {
  truncate = (text, startChars, endChars) => {
    if (text.length > 12) {
      var start = text.substring(0, startChars);
      var end = text.substring(text.length - endChars, text.length);
      return start + "..." + end;
    }
    return text;
  };

  render() {
    return (
        <Card.Content textAlign="center">
          <div class="center aligned header">
            <CardImage image_link={this.props.card.image_link} />{" "}
          </div>
          <Card.Header>
            <b>{this.props.card.name}</b>
          </Card.Header>
          <Card.Description>
            ID: {this.props.card.id}<br />
            token: {this.props.card.token}<br />
            Description: {this.props.card.desc} <br />
          </Card.Description>
        </Card.Content>
    );
  }
}
export default CardContent;
