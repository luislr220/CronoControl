import React from "react";
import "./css/agregarHorario.css"
import Navigation from "../NavigationConponent/Navigation";
import SolicitarHorarioFor from "./SolicitarHorarioFor";

export default function agregarHorario() {
  return (
    <div>
      <Navigation />
      <div className="SolicitudHorarioContenedorComponentPrincipal">
        <SolicitarHorarioFor />
      </div>
    </div>
  );
}
