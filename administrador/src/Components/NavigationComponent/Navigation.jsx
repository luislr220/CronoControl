import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">CronoControl</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Validar solicitud</Nav.Link>
<<<<<<< HEAD
            <Nav.Link href="/turnoCrud">Turno</Nav.Link>

            <NavDropdown title="Más opciones" id="basic-nav-dropdown">
              <NavDropdown.Item href="/agregarUsuario">Agregar Administrador</NavDropdown.Item>
              <NavDropdown.Item href="/agregarEmpleado">
                Agregar Empleado
              </NavDropdown.Item>
              <NavDropdown.Item href="/agregarSede">
                Agregar Sede
              </NavDropdown.Item>
              <NavDropdown.Item href="/agregarArea">
                Agregar Área
              </NavDropdown.Item>
              <NavDropdown.Item href="/agregarContrato">
                Agregar Contrato
              </NavDropdown.Item>

            </NavDropdown>
=======
            <Nav.Link href="/agregarUsuario">Agregar Administrador</Nav.Link>
            <Nav.Link href="/agregarEmpleado">Agregar Empleado</Nav.Link>
            <Nav.Link href="/agregarSede">Agregar Sede</Nav.Link>
            <Nav.Link href="/agregarArea">Agregar Área</Nav.Link>
            <Nav.Link href="/turnoCrud">Agregar Turno</Nav.Link>
>>>>>>> Cristel
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
