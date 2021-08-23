import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class TopNavigation extends Component {
    render()
    {
        return(
            <Navbar bg="success" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand href="/" className="font-weight-bold d-flex align-items-center">
                    <img
                        src="/syringe.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top mr-2"
                        alt="Covvaxine logo"
                    />
                    Covvaxine
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" >District Search</Nav.Link>
                        <Nav.Link href="/pincode-search" >Pincode Search</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default TopNavigation;