import React, { Component } from "react";

class CardImage extends Component {


    render() {
            return (
                <div class="pack-preview">
                    <img  className="pack-preview" src={this.props.image_link} alt="card" />
                </div>
            );

    }
}

export default CardImage;