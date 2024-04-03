import React from "react";
import { Modal, Button, Form, FormControl, Alert } from "react-bootstrap";

export default function AgregarUsuarioModal({
    mostrar,
    onClose,
    nuevoAdministrador,
    handleInputChange,
    handleRegionChange,
    agregarAdministrador,
    loading,
    sedes,
    areasPorRegion,
    errorCorreoDuplicado,
    handleRolChange, // Recibir handleRolChange como prop
    mostrarContraseña, // Recibir mostrarContraseña como prop
  }) {
  return (
    <Modal show={mostrar} onHide={onClose}>
      <Modal.Header closeButton style={{ backgroundColor: "#1C2B67" }}>
        <Modal.Title style={{ color: "#FFFFFF" }}>Agregar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Nombre
            </Form.Label>
            <FormControl
              type="text"
              name="Nombre"
              value={nuevoAdministrador.Nombre}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAppE">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Apellido Paterno
            </Form.Label>
            <FormControl
              type="text"
              name="AppE"
              value={nuevoAdministrador.AppE}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formApmE">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Apellido Materno
            </Form.Label>
            <FormControl
              type="text"
              name="ApmE"
              value={nuevoAdministrador.ApmE}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formFechaNac">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Fecha de Nacimiento
            </Form.Label>
            <FormControl
              type="date"
              name="FechaNac"
              value={nuevoAdministrador.FechaNac}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formCorreo">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Correo
            </Form.Label>
            <FormControl
              type="email"
              name="Correo"
              value={nuevoAdministrador.Correo}
              onChange={handleInputChange}
            />
            {errorCorreoDuplicado && (
              <Alert variant="danger">{errorCorreoDuplicado}</Alert>
            )}
          </Form.Group>

          <Form.Group controlId="formRol">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Rol
            </Form.Label>
            <Form.Control
              as="select"
              name="Rol"
              value={nuevoAdministrador.Rol}
              onChange={(e) => {
                handleInputChange(e); // Manejar el cambio de forma común
                handleRolChange(e); // Llamar al manejador de cambio de rol
              }}
            >
              <option value="">Selecciona un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formContraseña">
            {mostrarContraseña && (
              <>
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Contraseña
                </Form.Label>
                <FormControl
                  type="password"
                  name="Contraseña"
                  value={nuevoAdministrador.Contraseña}
                  onChange={handleInputChange}
                />
              </>
            )}
          </Form.Group>

          <Form.Group controlId="formRegion">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Sede
            </Form.Label>
            <Form.Control
              as="select"
              name="Region"
              value={nuevoAdministrador.Region}
              onChange={handleRegionChange}
            >
              <option value="">Selecciona una Sede</option>
              {loading ? (
                <option disabled>Cargando sedes...</option>
              ) : (
                sedes.map((sede) => (
                  <option key={sede._id} value={sede.nombre}>
                    {sede.nombre}
                  </option>
                ))
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formArea">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Área de Trabajo
            </Form.Label>
            <Form.Control
              as="select"
              name="AreaTrabajo"
              value={nuevoAdministrador.AreaTrabajo}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una área</option>
              {loading ? (
                <option disabled>Cargando áreas...</option>
              ) : (
                areasPorRegion.map((area) => (
                  <option key={area._id} value={area.nombre}>
                    {area.nombre}
                  </option>
                ))
              )}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="AGEMBotonverde"
          onClick={agregarAdministrador}
        >
          Agregar
        </Button>
        <Button variant="primary" className="AGEMBotonverde" onClick={onClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
