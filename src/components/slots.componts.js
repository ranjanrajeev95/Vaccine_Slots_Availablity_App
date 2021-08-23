import React, { Component } from 'react';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import { Card } from 'semantic-ui-react';

export default class Slots extends Component {
    constructor(props) {
        super(props);

        this.showCards = this.showCards.bind(this);

        this.state = {
            cardItem: [],
        };
    }

    componentDidMount() {
        this.setState({
            cardItem: this.props.cardItem
        });
    }

    showCards() {
        let cards = [];
        this.state.cardItem.forEach((ele, index) => {
            let timeSlots = [];
            ele.slots.forEach((item, index) => {
                timeSlots.push(<ListGroup.Item key={index} variant={index%2===0?'warning':'light'} className="text-center font-weight-bold">{item}</ListGroup.Item>);
            });
            cards.push(
            <Card color="violet" key={index}>
                <Card.Content>
                    <Card.Header>{ele.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            {ele.address}, {ele.pincode} <br/> 
                        </span>
                    </Card.Meta>
                    <hr/>
                    <Card.Description>
                        {/* <ListGroup>
                            {timeSlots}
                        </ListGroup> */}
                        <Button variant="warning" size="sm" className="mr-1 mt-1" disabled>Dose 1 <Badge variant="light">{ele.available_capacity_dose1}</Badge></Button>{' '}
                        <Button variant="warning" size="sm" className="mr-1 mt-1" disabled>Dose 2 <Badge variant="light">{ele.available_capacity_dose2}</Badge></Button>{' '}
                        <Button variant="warning" size="sm" className="mr-1 mt-1" disabled>Total Dose <Badge variant="light">{ele.available_capacity}</Badge></Button>{' '}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra className="d-flex justify-content-center">
                    <ListGroup horizontal>
                        <ListGroup.Item className="text-danger border-danger">{ele.min_age_limit}+</ListGroup.Item>
                        <ListGroup.Item className="text-success border-success">{ele.vaccine}</ListGroup.Item>
                        <ListGroup.Item className="text-primary border-primary">{ele.fee_type}</ListGroup.Item>
                    </ListGroup>
                </Card.Content>
            </Card>);
        })
        return cards;
    }

    render() {
        return (
            <div className="py-3">
                <Card.Group centered>
                    {this.showCards()}
                </Card.Group>
            </div>
        );
    }
}