import React, { Component } from "react";

class CardImage extends Component {


    render() {
            return (
                <div className="pack-preview">
                    <img  className="pack-preview" src={this.props.image_link} alt="card" style={{width: "100%"}}/>
                </div>
            );

    }
}

export default CardImage;
