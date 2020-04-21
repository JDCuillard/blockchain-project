import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CardImage from "./cardImage";

class CardPreview extends Component {
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
        <Card.Content>
          <div>
            <CardImage image_link={this.props.card.small_image_link} />{" "}
          </div>
          <Card.Header>
            Name : <b>{this.props.card.name}</b>
          </Card.Header>
        </Card.Content>
    );
  }
}
export default CardPreview;
