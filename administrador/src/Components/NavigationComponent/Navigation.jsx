import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">CronoControl</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Solicitud de Horario</Nav.Link>
            <Nav.Link href="/validar">Validar solicitud</Nav.Link>
            <Nav.Link href="/agregarUsuario">Agregar Usuarios</Nav.Link>
            <Nav.Link href="/agregarEmpleado">Agregar Empleado</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
