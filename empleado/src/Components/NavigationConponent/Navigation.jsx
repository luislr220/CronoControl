import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutButton from '../LoginFormComponent/LogoutButton';

export default function Navigation() {
  return (
<Navbar expand="lg" style={{ backgroundColor: '#1C2B67' }}>
  <Container>
    <Navbar.Brand href="/">CronoControl</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link style={{fontWeight: '5'}} href="/Turnos">Turnos</Nav.Link>
        <Nav.Link href="/Permisos">Solicitar vacaciones</Nav.Link>
        <LogoutButton/>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  )
}
