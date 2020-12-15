import React from "react";
import { Row, Col, Container, Nav } from "react-bootstrap";

function Footer() {
  return (
    <Container>
      <hr />
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <Row className="justify-content-md-center">
            <Nav.Link href='#'>Home</Nav.Link>
            <Nav.Link href='#'>About</Nav.Link>
            <Nav.Link href='#'>Browse</Nav.Link>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <Row className="justify-content-md-center">
            <Nav.Link href='#'>Contact us</Nav.Link>
            <Nav.Link href='#'>Locations</Nav.Link>
          </Row>
        </Col>
      </Row>
      <p>All rights Reserved 2020</p>
    </Container>
  );
}

export default Footer;
