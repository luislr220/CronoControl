import React, { useState } from "react";
import "./css/navigation.css";
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
import logoEmpresa from "../../assets/LogoPNG.png";
import LogoutButton from '../LoginFormComponent/LogoutButton';


export default function Navigation() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div style={{ backgroundColor: '#1C2B67' }}>
      <Navbar className="navbar-custom">
        <Container>
          <IconButton onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon style={{ color: '#ffffff' }} /> {/* Color blanco */}
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
    { text: "Turnos", href: "/Turnos", icon: null },
    { text: "Solicitar vacaciones", href: "/Permisos", icon: null },
  ];

  return (
    <Box sx={{ width: 250, backgroundColor: '#1C2B67' }} role="presentation">
      <List>
        <img src={logoEmpresa} alt="Logo Empresa" style={{ margin: '10px auto', height: '140px', width: 'auto', display: 'block', borderRadius: '10px' }} />
        {drawerItems.map((item, index) => (
          <div key={index}>
            <ListItem disablePadding>
              <ListItemButton component="a" href={item.href}>
                <span className="icono-lista" style={{ color: '#ffffff' }}>{item.icon}</span>
                <ListItemText primary={item.text} style={{ color: '#ffffff' }} />
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
      <LogoutButton />
    </Box>

  );
}
