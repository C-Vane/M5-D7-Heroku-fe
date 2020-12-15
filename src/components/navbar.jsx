import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

function navbar() {
  return (

    <Navbar sticky='top' expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#'> Strive-BookStore</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#'>Home</Nav.Link>
            <Nav.Link href='#'>About</Nav.Link>
            <Nav.Link href='#'>Browse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  );
}

export default navbar;
