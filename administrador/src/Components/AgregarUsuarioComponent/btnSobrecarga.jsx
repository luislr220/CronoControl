import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

export default function BtnSobrecarga() {
  const [showModal, setShowModal] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:3002/administrador/cargar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Recargar la página después de cargar el archivo exitosamente
      window.location.reload();
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
      // Puedes mostrar un mensaje de error si lo deseas
    }
  };

  return (
    <div>
      <Button
        variant="primary"
        className="AGEMBotonCargaMasiva"
        onClick={() => setShowModal(true)}
      >
        Cargar archivo
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cargar archivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sube tus datos en formato JSON y con la estructura esperada</p>
          <input type="file" onChange={handleFileUpload} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
