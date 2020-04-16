import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CardPackImage from "./cardPackImage";

class CardPackContent extends Component {
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
      <Link to={{ pathname: this.props.pack.page}}>
        <Card.Content>
          <div>
            {" "}
            <CardPackImage number={this.props.pack.packNumber} />{" "}
          </div>
          <Card.Header>
            Card Pack Name :{" "} <b>{this.props.pack.name}</b>
          </Card.Header>
          <Card.Description>
            Price: {this.props.pack.value} <br />
          </Card.Description>
        </Card.Content>
      </Link>
    );
  }
}
export default CardPackContent;
