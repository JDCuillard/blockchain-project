import React, { Component } from "react";

class Greeting extends Component {
  render() {
    const imgStyle = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%"
    };

    return (
      <div>
        <br />
        <h2 style={{ color: "DarkRed", textAlign: "center" }}>
          {" "}
          Welcome to our Yu-Gi-Oh game!
        </h2>
        <br />
        <img src="static/images/Yu-Gi-Oh Logo.png" style={imgStyle} width="600px" alt="Yu-Gi-Oh! logo" />
        <br /> <br />
        <p style={{ textAlign: "center" }}>
          This game allows you to buy card packs as well as buy, sell, and auction individual cards using our auctioning system
          <br /> This DApp was built by Brandon, Falkyn, John, and Mohit
          <br /> Be the best by collecting all of these cards!
        </p>
      </div>
    );
  }
}

export default Greeting;
