import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutButton from '../LoginFormComponent/LogoutButton';

export default function Navigation() {
  return (
<Navbar expand="lg" style={{ backgroundColor: '#1C2B67' }}>
  <Container>
    <Navbar.Brand style={{fontWeight: '500'}} href="/">CronoControl</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link style={{fontWeight: '500'}} href="/Turnos">Turnos</Nav.Link>
        <Nav.Link style={{fontWeight: '500'}} href="/Permisos">Solicitar vacaciones</Nav.Link>
        <LogoutButton/>
      </Nav>
      <LogoutButton/>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
