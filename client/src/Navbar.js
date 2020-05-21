import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.style = {
            backgroundColor: '#e3f2fd',
        };
        this.linkStyle = {
            color: '#031D44',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '15px',
            opacity: '0.5',
            textDecoration: 'none',
            marginTop: '0.5em',
        };
        this.profileStyle = {
            marginTop: '0.5em',
        }
    }

    isLoggedIn(){
        const user = (
        <Nav as="ul">
        <Nav.Item as="li">
            <Nav.Link href={`/user/`} style={this.linkStyle} active>
                Home
            </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
            <Nav.Link href={`/info/`} style={this.linkStyle}>
                My Info
            </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
            <Nav.Link href={`/pets/`} style={this.linkStyle}>
                My Pets
            </Nav.Link>
        </Nav.Item>
            <img style={this.profileStyle} src={this.props.picSrc} width="30" height="30" className="d-inline-block align-top" alt="Hello" />
            <NavDropdown style={this.profileStyle} alignRight>
                <NavDropdown.Item className="text-center" disabled>{this.props.userName}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={`/info/`}>Your Profile</NavDropdown.Item>
                <NavDropdown.Item href={`/pets/`}>Your Pets</NavDropdown.Item>
                <NavDropdown.Item href={`/user/`}>Your Calendar</NavDropdown.Item>
                <NavDropdown.Item href="#">Sign out</NavDropdown.Item>
            </NavDropdown>
        </Nav>);

        const guest = (
            <Nav as="ul">
                <Nav.Item as="li">
                    <Nav.Link href={`/login`} style={this.linkStyle}>
                        Sign In
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href={`/signup`} style={this.linkStyle}>
                        Sign Up
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            );
        return (
            <div className="box">
                <Navbar
                    expand="sm"
                    variant="light"
                    style={this.style}
                >
                    <Navbar.Brand href={`/`}><strong>TruWalks</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        {this.props.authorized ? user : guest}
                    </Navbar.Collapse>
                </Navbar>
            </div>    
        );
    }

    render() {
        return(
            <React.Fragment>
                {this.isLoggedIn()}
            </React.Fragment>
        );
    }
}
 
export default NavBar;