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
            <Nav.Link href="/">Validar solicitud</Nav.Link>
            <Nav.Link href="/agregarUsuario">Agregar Administrador</Nav.Link>
            <Nav.Link href="/agregarEmpleado">Agregar Empleado</Nav.Link>
            <Nav.Link href="/agregarSede">Agregar Sede</Nav.Link>
            <Nav.Link href="/agregarArea">Agregar Área</Nav.Link>
            <Nav.Link href="/turnoCrud">Agregar Turno</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
