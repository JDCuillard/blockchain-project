import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ZombieChar from "./zombieChar";

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
      <Link to={{ pathname: this.props.pack.page }}>
        <Card.Content>
          <div>
            {" "}
            <ZombieChar DNA={this.props.pack.zombieDNA} />{" "}
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