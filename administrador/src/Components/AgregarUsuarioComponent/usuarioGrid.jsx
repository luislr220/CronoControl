import React, { useState } from "react";
import { Grid, Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material";
import { Button, Pagination } from "react-bootstrap";
import { format } from "date-fns";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function UsuarioGrid({
  administrador,
  filtro,
  filtroRegion,
  filtroArea,
  filtroApellidoModal,
  filtroRol,
  abrirModalActualizar,
  mostrarConfirmacion,
}) {
  //FUNCIONES DEL AVATAR DEL USUARIO
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(Nombre) {
    // Verificar si el nombre tiene al menos dos partes separadas por un espacio
    const nombreParts = Nombre.split(" ");
    if (nombreParts.length >= 2) {
      return {
        sx: {
          bgcolor: stringToColor(Nombre),
          width: 150,
          height: 150,
          fontSize: 80,
        },
        children: `${nombreParts[0][0]}${nombreParts[1][0]}`,
      };
    } else if (nombreParts.length === 1) {
      // Si el nombre tiene solo una parte, usar la primera letra de esa parte
      return {
        sx: {
          bgcolor: stringToColor(Nombre),
          width: 150,
          height: 150,
          fontSize: 80,
        },
        children: `${nombreParts[0][0]}`,
      };
    } else {
      // Si el nombre no tiene el formato esperado, manejarlo según sea necesario
      return {
        sx: {
          bgcolor: stringToColor(Nombre),
          width: 150,
          height: 150,
          fontSize: 80,
        },
        children: "", // O proporcionar una cadena predeterminada
      };
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12; // Número de usuarios por página

  // Filtrar los usuarios basado en los criterios de filtro
  const filteredUsers = administrador.filter((administrador) =>
    administrador.Nombre.toLowerCase().includes(filtro.toLowerCase())
  )
  .filter((administrador) =>
    administrador.Region.toLowerCase().includes(filtroRegion.toLowerCase())
  )
  .filter((administrador) =>
    administrador.AreaTrabajo.toLowerCase().includes(filtroArea.toLowerCase())
  )
  .filter((administrador) =>
    `${administrador.AppE} ${administrador.ApmE}`
    .toLowerCase()
    .includes(filtroApellidoModal.toLowerCase())
  )
  .filter((administrador) =>
    filtroRol === "" ||
    administrador.Rol.toLowerCase().includes(filtroRol.toLowerCase())
  );

  // Calcular el número total de páginas basado en los usuarios filtrados y paginados
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Obtener los usuarios para la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Función para generar los números de página a mostrar
  const generatePageNumbers = () => {
    const pagesToShow = 30; // Número de páginas a mostrar
    const midPoint = Math.ceil(pagesToShow / 2);
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > pagesToShow) {
      if (currentPage > midPoint) {
        startPage = currentPage - midPoint + 1;
        endPage = Math.min(currentPage + midPoint - 1, totalPages);
      } else {
        endPage = pagesToShow;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage);
  };

  return (
    <>
      <Grid container spacing={2}>
        {currentUsers.map((administrador, index) => (
          <Grid
            key={index}
            item
            xl={2}
            lg={3}
            md={4}
            sm={6}
            xs={12}
            sx={{ width: "100%", p: 2 }}
            className="GridCardUsuario"
          >
            <Card
              sx={{
                maxWidth: 300,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              className="AGEMCard"
            >
              <CardActionArea>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "center", pt: 2 }}
                >
                  <Avatar {...stringAvatar(administrador.Nombre)} />
                </Stack>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${administrador.Nombre} ${administrador.AppE} ${administrador.ApmE}`}
                  </Typography>
                  <Typography variant="body2">
                    Id: {administrador.id}
                  </Typography>
                  <Typography variant="body2">
                    Correo: {administrador.Correo}
                  </Typography>
                  {administrador.Rol === "Administrador" && (
                    <Typography variant="body2">
                      Contraseña: {administrador.Contraseña.replace(/./g, "*")}{" "}
                      {/* Reemplaza cada carácter de la contraseña con un asterisco */}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    Rol: {administrador.Rol}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha de nacimiento:{" "}
                    {format(new Date(administrador.FechaNac), "yyyy-MM-dd")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sede: {administrador.Region}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Área: {administrador.AreaTrabajo}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="myCardActions">
                <Button
                  variant="primary"
                  className="AGEMBotonverde"
                  onClick={() => abrirModalActualizar(administrador)}
                >
                  Actualizar
                </Button>{" "}
                <Button
                  variant="primary"
                  className="AGEMBotonverde"
                  onClick={() => mostrarConfirmacion(administrador)}
                >
                  Eliminar
                </Button>{" "}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination>
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {generatePageNumbers().map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
}
