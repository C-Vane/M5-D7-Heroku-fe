import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

function Welcome() {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>Welcome to Strive Book Store</h1>
        <p>
          Save 20% off 4 or more used books!
      </p>
      </Container>
    </Jumbotron>
  );
}

export default Welcome;
