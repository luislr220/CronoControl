import React, { useState } from "react";
import { Button, Modal, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

export default function BtnSobrecarga() {
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false); // Nuevo estado para controlar la carga

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
  
    // Verificar la extensión del archivo
    const extensionesPermitidas = ["json", "xlsx", "csv"];
    const extensionArchivo = file.name.split(".").pop().toLowerCase();
    if (!extensionesPermitidas.includes(extensionArchivo)) {
      setAlert({
        variant: "danger",
        message: "La extensión del archivo no es válida. Asegúrate de que sea JSON, XLSX o CSV.",
      });
      return;
    }
  
    try {
      setLoading(true); // Mostrar el spinner mientras se carga el archivo
      setAlert({
        variant: "info",
        message: "Cargando datos, por favor espera...",
      }); // Mostrar un mensaje de carga
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
      if (error.response && error.response.status === 400) {
        // El servidor respondió con error 400, lo que indica un problema en el formato del archivo
        setAlert({
          variant: "danger",
          message: "La estructura del archivo no es la esperada. Asegúrate de que esté en el formato correcto (JSON, XLSX o CSV) y con los campos necesarios.",
        });
      } else {
        // Otro tipo de error
        setAlert({
          variant: "danger",
          message: "Error al cargar el archivo. Inténtelo de nuevo más tarde.",
        });
      }
    } finally {
      setLoading(false); // Ocultar el spinner después de cargar el archivo (ya sea exitosamente o con error)
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
          {alert && (
            <Alert variant={alert.variant}>
              {alert.message}
            </Alert>
          )}
          {loading && <Spinner animation="border" role="status" />}
          {!loading && (
            <>
              <p>Sube tus datos en formato JSON, XLSX o CSV y con la estructura esperada</p>
              <input type="file" onChange={handleFileUpload} />
            </>
          )}
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
