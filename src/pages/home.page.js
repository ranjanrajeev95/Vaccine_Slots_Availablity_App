import React, { Component } from 'react';
import { Tabs, Tab, Badge } from 'react-bootstrap';
import { Dropdown, Container, Form, Button, Message } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from 'moment';
import '../App.css';
import Slots from '../components/slots.componts';

class Homepage extends Component {

    constructor(props) {
        super(props);

        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeDistrict = this.onChangeDistrict.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.showCards = this.showCards.bind(this);

        this.state = {
            stateOption: [],
            districtOption: [],
            state_id: null,
            district_id: null,
            slots: [],
            date: new Date(),
            startDate: new Date(),
            isSubmitting: false,
            formError: false,
            cardItemAll: [],
            cardItem18: [],
            cardItem45: [],
            tabs: [],
            flag: false,
        };
    }

    componentDidMount() {
        document.title = "Search By District | Covvaxine";

        axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
        .then(response => {
            let stateOption = response.data.states.map(elem => Object({key: elem.state_id, text: elem.state_name, value: elem.state_id}));
            this.setState({
                stateOption: stateOption
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    onChangeState(e, data) {
        // console.log(data.value);
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${data.value}`)
        .then(response => {
            this.setState({
                state_id: data.value,
                flag: false
            });
            let districtOption = response.data.districts.map(elem => Object({key: elem.district_id, text: elem.district_name, value: elem.district_id}));
            this.setState({
                districtOption: districtOption
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    onChangeDistrict(e, data) {
        // console.log(data.value);
        this.setState({
            district_id: data.value,
            flag: false
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date,
            flag: false
        });
    }

    onSubmit(e) {
        e.preventDefault(); 
        this.setState({
            isSubmitting: true,
            flag: false,
            slots: [],
            cardItemAll: [],
            cardItem18: [],
            cardItem45: [],
        });
        if(this.state.state_id === null || this.state.district_id === null)
        {
            this.setState({
                formError: true,
            });
            this.setState({
                isSubmitting: false
            });
        }
        else{
            this.setState({
                formError: false,
            });
            axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.district_id}&date=${moment(this.state.date).format('DD-MM-YYYY')}`)
            .then(response => {
                // console.log(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.district_id}&date=${moment(this.state.date).format('DD-MM-YYYY')}`);
                // console.log(response.data);
                this.setState({
                    isSubmitting: false,
                    slots: response.data.sessions,
                    flag: true
                });

                this.setState({
                    cardItemAll: this.state.slots,
                    cardItem18: this.state.slots.filter(item => parseInt(item.min_age_limit)===18),
                    cardItem45: this.state.slots.filter(item => parseInt(item.min_age_limit)===45),
                });

                let tabs = [];
                tabs.push(
                    <span>All {' '}<Badge variant="warning" className="font-weight-normal">{this.state.cardItemAll.length}</Badge></span>
                )
                tabs.push(
                    <span>18-44 {' '}<Badge variant="warning" className="font-weight-normal">{this.state.cardItem18.length}</Badge></span>
                )
                tabs.push(
                    <span>45+ {' '}<Badge variant="warning" className="font-weight-normal">{this.state.cardItem45.length}</Badge></span>
                )

                this.setState({
                    tabs: tabs
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isSubmitting: false
                });
            });
        }
    }

    render()
    {
        return(
            <div className="container-fluid mt-5 pt-3">
                <Container>
                    <Form loading={this.state.isSubmitting} error={this.state.formError} onSubmit={this.onSubmit}>
                        { this.state.formError === true?
                            <Message
                                error
                                header='Action Forbidden'
                                content='Please fill all the fields.'
                            />:''
                        }
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                <label>Select State</label>
                                <Dropdown
                                    placeholder='Select State'
                                    fluid
                                    selection
                                    options={this.state.stateOption}
                                    onChange={this.onChangeState}
                                    className=""
                                    error={this.state.formError && this.state.state_id === null}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Select District</label>
                                <Dropdown
                                    placeholder='Select District'
                                    fluid
                                    selection
                                    options={this.state.districtOption}
                                    onChange={this.onChangeDistrict}
                                    className=""
                                    error={this.state.formError && this.state.district_id === null}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Select Date</label>
                                <div className="customDatePickerWidth">
                                    <DatePicker selected={this.state.date} minDate={this.state.startDate} onChange={this.onChangeDate} className="" />
                                </div>
                            </Form.Field>
                        </Form.Group>
                        <Form.Field className="text-center"><Button color="pink" type="submit" className="">Search Slots</Button></Form.Field>
                    </Form>
                </Container>
                <hr className="mb-5" />
                { this.state.cardItemAll.length !== 0 ?
                    <div className="container mt-3 pt-2 border border-2 border-secondary"> 
                        <Tabs defaultActiveKey="all" className="d-flex justify-content-center font-weight-bold h4" id="uncontrolled-tab-example">
                            <Tab variant="pills" eventKey="all" title={this.state.tabs[0]}>
                            { this.state.cardItemAll.length !== 0 ? 
                                <Slots cardItem={this.state.cardItemAll} /> :
                                <Message
                                    warning
                                    header='No slots available'
                                    content='Please come back after some time.'
                                    className="my-3"
                                />
                            }
                            </Tab>
                            <Tab variant="pills" eventKey="above18" title={this.state.tabs[1]}>
                                { this.state.cardItem18.length !== 0 ? 
                                    <Slots cardItem={this.state.cardItem18} /> :
                                    <Message
                                        warning
                                        header='No slots available'
                                        content='Please come back after some time.'
                                        className="my-3"
                                    />
                                }
                            </Tab>
                            <Tab variant="pills" eventKey="above44" title={this.state.tabs[2]}>
                                { this.state.cardItem45.length !== 0 ? 
                                    <Slots cardItem={this.state.cardItem45} /> :
                                    <Message
                                        warning
                                        header='No slots available'
                                        content='Please come back after some time.'
                                        className="my-3"
                                    />
                                }
                            </Tab>
                        </Tabs> 
                    </div> : 
                    this.state.flag == true?
                    <Container>
                        <Message
                            warning
                            header='No slots available'
                            content='Please come back after some time.'
                            className="mb-3"
                        /> 
                    </Container> : '' 
                }
            </div>
        );
    }
}

export default Homepage;