import React, { Component } from "react";
import "./cardPackImage.css";

class CardPackImage extends Component {

    currentCardPack ()  {
        let i = parseInt(this.props.number);
        return "static/images/pack" + i + ".png";
    }

    render() {
            return (
                <div class="pack-preview">
                    <img  className="pack-preview" src={this.currentCardPack()} alt="card pack " />
                </div>
            );

    }
}

export default CardPackImage;