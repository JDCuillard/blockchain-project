import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CardPackImage from "./cardPackImage";

class CardContent extends Component {
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
            {" "}
            <CardPackImage number={1} />{" "}
          </div>
          <Card.Header>
            Name : <b>{this.props.card.name}</b>
          </Card.Header>
          <Card.Description>
            ID: {this.props.card.id}<br />
            Description: {this.props.card.desc} <br />
            Price: {this.props.card.value} <br />
          </Card.Description>
        </Card.Content>
    );
  }
}
export default CardContent;
