import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmarEliminacionModal({
  mostrarModalConfirmacion,
  ocultarConfirmacion,
  eliminarAdministrador,
  usuarioAEliminar
}) {
  return (
    <Modal show={mostrarModalConfirmacion} onHide={ocultarConfirmacion}>
    <Modal.Header closeButton>
      <Modal.Title>Confirmar eliminación</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      ¿Estás seguro de que quieres eliminar este usuario?
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="primary"
        className="AGEMBotonverde"
        onClick={() => eliminarAdministrador(usuarioAEliminar._id)}
      >
        Sí, eliminar
      </Button>

      <Button
        variant="primary"
        className="AGEMBotonverde"
        onClick={ocultarConfirmacion}
      >
        Cancelar
      </Button>
    </Modal.Footer>
  </Modal>

  );
}
