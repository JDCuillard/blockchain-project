//
// This is the "Attack Zombie" page
//

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {Button, Header, Icon, Form, Card, Grid, Segment, Input, Pagination} from "semantic-ui-react";
import PlayingCard from "../components/card";

function mapStateToProps(state) {
    return {
        CZ: state.CZ,
        userAddress: state.userAddress
    };
}

class CreateAuction extends Component {
    state = {
        card: [],
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
        let cardId = +this.props.location.state.cardid;
        let tokenId = +this.props.location.state.tokenid;

        var request = new XMLHttpRequest();
        request.open("GET", "../../static/cardData/cardinfo.json", false);
        request.send(null);
        let cardInformation = JSON.parse(request.responseText);

        let card = [];

        try {
            card.push(
            <PlayingCard
            name = {cardInformation[cardId]["name"]}
            id = {cardId}
            token = {tokenId}
            desc = {cardInformation[cardId]["desc"]}
            small_image_link = {cardInformation[cardId]["card_images"]["image_url_small"]}
            image_link = {cardInformation[cardId]["card_images"]["image_url"]}
            />
        );
        } catch {        }

        this.setState({
            card,
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
            <h2> Putting a Card up for Auction? </h2>
            Here is where you set up a card to go onto auction. All you need to fill out is how long you would like the
            auction to go on, and what format (Days, Hours, Minutes).
            <hr />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <Grid columns={3} verticalAlign="middle">
                            <Grid.Column>
                                <Segment secondary>
                                    <Card.Group> {this.state.card} </Card.Group>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <label>How long will this auction last?</label>
                                    <input
                                    placeholder="150"
                                    onChange={event =>
                                    this.setState({
                                        time: +event.target.value})
                                    }
                                    />
                            </Grid.Column>
                                <Grid.Column>
                                    <label>Days, hours, minutes </label>
                                    <select value={this.state.format} onChange={event => this.setState({format: +event.target.value})}>
                                        <option value="0">Days</option>
                                        <option value="1">Hours</option>
                                        <option value="2">Minutes</option>
                                    </select>
                            </Grid.Column>
                        </Grid>
                    </Form.Field>
                    <Button primary type="submit" loading={this.state.loading}>
                        <Icon name="check" />
                        Place Auction
                    </Button>
                    <Link to="/MyCards">
                        <Button color="red" inverted>
                        <Icon name="cancel" /> Close
                    </Button>
                    </Link>
                </Form>
            </div>
    );
    }
}

export default connect(mapStateToProps)(CreateAuction);
