import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const nav = () => {
    return (
        <>
  <Navbar bg="info" variant="light">
    <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home" active>Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <li class='time'> <b>{new Date().toLocaleTimeString()}</b> </li>
    </Nav>
    </Container>
  </Navbar>
</>
    )
}

export default nav