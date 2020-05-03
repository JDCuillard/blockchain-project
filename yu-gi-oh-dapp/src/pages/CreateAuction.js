//
// This is the "Attack Zombie" page
//

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Icon, Form} from "semantic-ui-react";
import PlayingCard from "../components/card";

function mapStateToProps(state) {
    return {
        CZ: state.CZ,
        userAddress: state.userAddress
    };
}

class CreateAuction extends Component {
    state = {
        time: null,
        format: null,
        cardId: null,
        tokenId: null,
        loading: false,
        errorMessage: "",
        message: ""
    };

    componentDidMount = async() => {
        await this.setAspects();
    }

    setAspects = async () => {
        let cardId = this.props.id;
        let tokenId = await this.props.CZ.methods
            .cardUniqueID(cardId, this.props.userAddress)
            .call();;
        this.setState({
            cardId,
            tokenId
        });
    }

    onSubmit = async event => {
        event.preventDefault();
        this.setState({
            loading: true,
            errorMessage: "",
            message: "Waiting for blockchain transaction to complete..."
        });
        try {
            await this.props.CZ.methods
                .createAuctionContract(this.state.time, this.state.format, this.props.userAddress, this.state.cardId, this.state.tokenId)
                .send({
                    from: this.props.userAddress
                });
            this.setState({
                loading: false,
                message: "Congratulations, this card is now up for auction!!"
            })
        } catch (err) {
            this.setState({
                loading: false,
                errorMessage: err.message,
                message: "User rejected transaction"
            });
        }
    };


    render() {
        return (
            <div>
            <hr />
            <h2> Welcome to the Auction House </h2>
            All cards in here are cards listed on auction by other users. Click on any desired card you may make a
            bid on this card. Once an auction has concluded the final person to make a bid will have won the auction.
            <hr />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
            <label>How long will this auction last?</label>
                <input
                    placeholder="150"
                    onChange={event =>
                        this.setState({
                            time: event.target.time})
                            }
                />
            <label>Days, hours, minutes </label>
            <select value={this.state.value} onChange={event => this.setState({format: +this.state.value})}>
                <option value="0">Days</option>
                <option value="1">Hours</option>
                <option value="2">Minutes</option>
            </select>
            </Form.Field>
            <Button primary type="submit" loading={this.state.loading}>
                <Icon name="check" />
                Place Auction
            </Button>
            </Form>
        </div>
    );
    }
}

export default connect(mapStateToProps)(CreateAuction);
