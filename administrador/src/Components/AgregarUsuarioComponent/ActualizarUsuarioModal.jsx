import React from 'react';
import { Modal, Button, Form, FormControl, Alert, InputGroup } from "react-bootstrap";



export default function ActualizarUsuarioModal({
  mostrar,
  onClose,
  valoresAdministradorSeleccionado,
  handleInputChange,
  actualizarAdministrador,
  sedes,
  areasPorRegionActualizar,
  errorCorreoDuplicadoActualizar,
  mostrarContraseña, // Definir mostrarContraseña como prop
  setMostrarContraseña, // Definir setMostrarContraseña como prop
  areas, // Definir areas como prop
  setAreasPorRegionActualizar, // Definir setAreasPorRegionActualizar como prop
  setValoresAdministradorSeleccionado,
  rolUsuarioActual
}) {
  return (
    <Modal show={mostrar} onHide={onClose}>
      <Modal.Header closeButton style={{ backgroundColor: "#1C2B67" }}>
        <Modal.Title style={{ color: "#FFFFFF" }}>
          Actualizar Usuario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombreActualizar">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Nombre
            </Form.Label>
            <FormControl
              type="text"
              name="Nombre"
              value={valoresAdministradorSeleccionado.Nombre}
              onChange={(e) =>
                setValoresAdministradorSeleccionado({
                  ...valoresAdministradorSeleccionado,
                  Nombre: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formAppEActualizar">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Apellido Paterno
            </Form.Label>
            <FormControl
              type="text"
              name="AppE"
              value={valoresAdministradorSeleccionado.AppE}
              onChange={(e) =>
                setValoresAdministradorSeleccionado({
                  ...valoresAdministradorSeleccionado,
                  AppE: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formApmEActualizar">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Apellido Materno
            </Form.Label>
            <FormControl
              type="text"
              name="ApmE"
              value={valoresAdministradorSeleccionado.ApmE}
              onChange={(e) =>
                setValoresAdministradorSeleccionado({
                  ...valoresAdministradorSeleccionado,
                  ApmE: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formFechaNacActualizar">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Fecha de Nacimiento
            </Form.Label>
            <FormControl
              type="date"
              name="FechaNac"
              value={valoresAdministradorSeleccionado.FechaNac}
              onChange={(e) =>
                setValoresAdministradorSeleccionado({
                  ...valoresAdministradorSeleccionado,
                  FechaNac: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formCorreoActualizar">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Correo
            </Form.Label>
            <FormControl
              type="email"
              name="Correo"
              value={valoresAdministradorSeleccionado.Correo}
              onChange={handleInputChange}
            />
            {errorCorreoDuplicadoActualizar && (
              <Alert variant="danger">{errorCorreoDuplicadoActualizar}</Alert>
            )}
          </Form.Group>

          <Form.Group controlId="formRolActualizar">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Rol
            </Form.Label>
            <Form.Control
              as="select"
              name="Rol"
              value={valoresAdministradorSeleccionado.Rol}
              onChange={(e) => {
                const nuevoRol = e.target.value;
                setValoresAdministradorSeleccionado({
                  ...valoresAdministradorSeleccionado,
                  Rol: nuevoRol,
                  Contraseña:
                    nuevoRol === "Empleado"
                      ? ""
                      : valoresAdministradorSeleccionado.Contraseña, // Resetear la contraseña si el nuevo rol es "Empleado"
                });
              }}
            >
              <option value="">Selecciona un rol</option>
              {/* Solo muestra la opción de administrador si el usuario actual no es un administrador */}
              {rolUsuarioActual !== "Administrador" && (
                <option value="Administrador">Administrador</option>
              )}
              <option value="Empleado">Empleado</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formContraseñaActualizar">
            {valoresAdministradorSeleccionado.Rol === "Administrador" && (
              <div>
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Nueva Contraseña
                </Form.Label>
                <InputGroup>
                  <FormControl
                    type={mostrarContraseña ? "password" : "text"}
                    name="Contraseña"
                    value={valoresAdministradorSeleccionado.Contraseña}
                    onChange={handleInputChange}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setMostrarContraseña(!mostrarContraseña)}
                  >
                    {mostrarContraseña ? "Mostrar" : "Ocultar"}
                  </Button>
                </InputGroup>
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="formRegionActualizar">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Sede
            </Form.Label>
            <Form.Control
              as="select"
              name="Region"
              value={valoresAdministradorSeleccionado.Region}
              onChange={(e) => {
                const regionSeleccionada = e.target.value;
                setValoresAdministradorSeleccionado({
                  ...valoresAdministradorSeleccionado,
                  Region: regionSeleccionada,
                });
                // Filtrar las áreas por región seleccionada
                const areasFiltradas = areas.filter(
                  (area) => area.sede === regionSeleccionada
                );
                setAreasPorRegionActualizar(areasFiltradas);
              }}
            >
              <option value="">Selecciona una sede</option>
              {sedes.map((sede) => (
                <option key={sede._id} value={sede.nombre}>
                  {sede.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formAreaActualizar">
            <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
              Área de Trabajo
            </Form.Label>
            <Form.Control
              as="select"
              name="AreaTrabajo"
              value={valoresAdministradorSeleccionado.AreaTrabajo}
              onChange={(e) =>
                setValoresAdministradorSeleccionado({
                  ...valoresAdministradorSeleccionado,
                  AreaTrabajo: e.target.value,
                })
              }
            >
              <option value="">Selecciona una área</option>
              {areasPorRegionActualizar.map((area) => (
                <option key={area._id} value={area.nombre}>
                  {area.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="AGEMBotonverde"
          onClick={actualizarAdministrador}
        >
          Actualizar
        </Button>
        <Button variant="primary" className="AGEMBotonverde" onClick={onClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
