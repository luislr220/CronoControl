import React from "react";
import Navigation from "../NavigationComponent/Navigation";
import './css/solicitudHorario.css';

export default function SolicitudHorario() {
  return (
    <div>
      <Navigation />
      <table>
            <thead>
              <tr>
                <th className="es1">Turno</th>
                <th className="es1">Cantidad de Empleados</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="row">
                    <label
                      className="mr-2 text-black"
                      style={{ fontSize: "18px" }}
                    >
                      Área:
                    </label>
                    <input
                      type="text"
                      className="custom-input"
                      placeholder="Ingrese el área"
                    />
                  </div>
                  <div className="row">
                    <label
                      className="mr-2 text-black"
                      style={{ fontSize: "18px" }}
                    >
                      Horario:
                    </label>
                    <input
                      type="text"
                      className="custom-input"
                      placeholder="Ingrese el horario"
                    />
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div className="col-md-4 d-flex justify-content-around align-items-center">
                      <button type="button" className="btn btn-success">
                        {" "}
                        +{" "}
                      </button>
                      <input type="number" placeholder="0" />
                      <button type="button" className="btn btn-success">
                        {" "}
                        -{" "}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="row">
                    <label
                      className="mr-2 text-black"
                      style={{ fontSize: "18px" }}
                    >
                      Área:
                    </label>
                    <input
                      type="text"
                      className="custom-input"
                      placeholder="Ingrese el área"
                    />
                  </div>
                  <div className="row">
                    <label
                      className="mr-2 text-black"
                      style={{ fontSize: "18px" }}
                    >
                      Horario:
                    </label>
                    <input
                      type="text"
                      className="custom-input"
                      placeholder="Ingrese el horario"
                    />
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div className="col-md-4 d-flex justify-content-around align-items-center">
                      <button type="button" className="btn btn-success">
                        {" "}
                        +{" "}
                      </button>
                      <input type="number" placeholder="0" />
                      <button type="button" className="btn btn-success">
                        {" "}
                        -{" "}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="row">
                    <label
                      className="mr-2 text-black"
                      style={{ fontSize: "18px" }}
                    >
                      Área:
                    </label>
                    <input
                      type="text"
                      className="custom-input"
                      placeholder="Ingrese el área"
                    />
                  </div>
                  <div className="row">
                    <label
                      className="mr-2 text-black"
                      style={{ fontSize: "18px" }}
                    >
                      Horario:
                    </label>
                    <input
                      type="text"
                      className="custom-input"
                      placeholder="Ingrese el horario"
                    />
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div className="col-md-4 d-flex justify-content-around align-items-center">
                      <button type="button" className="btn btn-success">
                        {" "}
                        +{" "}
                      </button>
                      <input type="number" placeholder="0" />
                      <button type="button" className="btn btn-success">
                        {" "}
                        -{" "}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
    </div>
  );
}
