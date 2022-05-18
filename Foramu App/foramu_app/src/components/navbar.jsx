import React from "react";
import { Container, Nav, Navbar, NavDropdown, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ForamuLogo from '../img/others/foramu.png'

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <a class="navbar-brand" href="#">
      <img src={ForamuLogo} alt="..." height="70" width='250' />
    </a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto">
    {/* <Navbar.Brand>Foramu</Navbar.Brand> */}
    <Nav className="me-auto">
    <Nav.Link><Link to="/" active style={{textDecoration: 'none', color: 'inherit'}}>Home</Link></Nav.Link>
    <Nav.Link><Link to="/forum" style={{textDecoration: 'none', color: 'inherit'}}>Forum</Link></Nav.Link>
    <Nav.Link><Link to="/sub_forum" style={{textDecoration: 'none', color: 'inherit'}}>Sub Forum</Link></Nav.Link>
    <Nav.Link><Link to="/discussion" style={{textDecoration: 'none', color: 'inherit'}}>Discussion</Link></Nav.Link>
    <NavDropdown title="Profile" id="basic-nav-dropdown">
          <NavDropdown.Item> <Link to="/profile" style={{textDecoration: 'none', color: 'inherit'}}>My profile</Link></NavDropdown.Item>
          <NavDropdown.Item href="/users">Users List</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#">Logout</NavDropdown.Item>
        </NavDropdown>
    </Nav>
    </ul>
    </div>
    </Container>
  </Navbar>
  );
}

export default Navigation;