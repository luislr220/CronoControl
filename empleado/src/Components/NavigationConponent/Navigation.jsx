import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutButton from '../LoginFormComponent/LogoutButton';

export default function Navigation() {
  const [activeLink, setActiveLink] = useState('');

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#1C2B67' }}>
      <Container>
        <Navbar.Brand style={{ fontWeight: '500' }} href="/">CronoControl</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              style={{
                fontWeight: '500',
                color: activeLink === 'Turnos' ? 'white' : '#000',
              }}
              href="/Turnos"
              onClick={() => setActiveLink('Turnos')}
            >
              Turnos
            </Nav.Link>
            <Nav.Link
              style={{
                fontWeight: '500',
                color: activeLink === 'Permisos' ? 'white' : '#000',
              }}
              href="/Permisos"
              onClick={() => setActiveLink('Permisos')}
            >
              Solicitar vacaciones
            </Nav.Link>
          </Nav>
          <LogoutButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
