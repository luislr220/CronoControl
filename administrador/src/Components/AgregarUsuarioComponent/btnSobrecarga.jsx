import React from "react";
import axios from "axios";

export default function BtnSobrecarga() {
  // Cambia el nombre a BtnSobrecarga
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/usuarios/cargar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // Mensaje de éxito desde el backend
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}
