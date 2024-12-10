import React from "react";
import {
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="#home"><strong>Cashier</strong> App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Product</Nav.Link>
              <Nav.Link href="#link">Category</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
