import React, { useState } from "react";
import axios from "axios";

export default function BtnSobrecarga() { // Cambia el nombre a BtnSobrecarga
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Seleccione un archivo JSON primero.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:3002/administrador/upload-users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Usuarios cargados exitosamente.");
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert("Ocurrió un error al cargar usuarios.");
    }
  };
  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleUpload}>Cargar Usuarios</button>
    </div>
  );
}
