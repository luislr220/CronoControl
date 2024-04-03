import React, { useState } from "react";
import "./Navigation.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { BsCheckCircle, BsClockHistory, BsPeople, BsBuilding, BsCalendar, BsFilePost } from "react-icons/bs";
import logoEmpresa from "../../assets/logo/LogoPNG.png";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Navbar className="navbar" style={{ backgroundColor: '#1C2B67' }}>
        <Container>
          <IconButton onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon style={{ color: '#ffffff' }} />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <DrawerList />
          </Drawer>
        </Container>
      </Navbar>
    </div>
  );
}

function DrawerList() {
  const drawerItems = [
    { text: "Validar solicitud", icon: <BsCheckCircle />, subItems: [
      { text: "Turno", href: "/ValidarSolis" },
      { text: "Vacaciones", href: "/validarVaca" }
    ] },
    { text: "Agregar Turno", href: "/turnoCrud", icon: <BsClockHistory /> },
    { text: "Agregar usuario", href: "/agregarUsuario", icon: <BsPeople /> },
    { text: "Agregar Sede", href: "/agregarSede", icon: <BsBuilding /> },
    { text: "Agregar Área", href: "/agregarArea", icon: <BsCalendar /> },
    { text: "Agregar Contrato", href: "/agregarContrato", icon: <BsFilePost /> },
    { text: "Agregar Horario", href: "/agregarHorario", icon: <BsFilePost /> },
  ];

  return (
    <Box sx={{ width: 250, backgroundColor: '#1C2B67' }} role="presentation">
      <List>
        <img src={logoEmpresa} alt="Logo Empresa" style={{ margin: '10px auto', height: '140px', width: 'auto', display: 'block', borderRadius: '10px' }} />
        {drawerItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              <Dropdown>
                <Dropdown.Toggle variant="transparent" style={{ border: 'none', background: 'transparent', color: '#ffffff', display: 'flex', justifyContent: 'flex-start' }}> {/* Alinea el contenido del botón a la izquierda */}
                  <ListItem disablePadding>
                    <ListItemButton>
                      <span className="icono-lista icono-desplegable" style={{ color: '#ffffff' }}>{item.icon}</span>
                      <ListItemText primary={item.text} style={{ color: '#ffffff' }} />
                    </ListItemButton>
                  </ListItem>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {item.subItems.map((subItem, subIndex) => (
                    <Dropdown.Item href={subItem.href} key={subIndex}>
                      {subItem.text}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component="a" href={item.href}>
                <span className="icono-lista icono-desplegable" style={{ color: '#ffffff', marginLeft: '10px' }}>{item.icon}</span> {/* Agrega margen izquierdo al icono */}
                  <ListItemText primary={item.text} style={{ color: '#ffffff' }} />
                </ListItemButton>
              </ListItem>
            )}
          </div>
        ))}
      </List>
    </Box>
  );
}
