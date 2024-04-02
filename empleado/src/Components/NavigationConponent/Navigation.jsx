import React, {useState} from 'react';
import LogoutButton from '../LoginFormComponent/LogoutButton';

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
import { BsClockHistory } from 'react-icons/bs';
import logoEmpresa from "../../assets/LogoPNG.png";

export default function Navigation() {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const drawerItems = [
    { text: "Solicitar vacaciones", href: "/Permisos", icon: <BsClockHistory /> },
    { text: "Agregar Horarios", href: "/agregarHorario", icon: <BsClockHistory /> },

  ];

  const DrawerList = (
    <Box sx={{width: 250, backgroundColor: '#1C2B67' }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
      <img src={logoEmpresa} alt="Logo Empresa" style={{ margin: '10px auto', height: '140px', width: 'auto', display: 'block', borderRadius: '10px' }} />
        {drawerItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component="a" href={item.href}>
              <span className="icono-lista" style={{ color: '#ffffff' }}>{item.icon}</span> {/* Color blanco */}
              <ListItemText primary={item.text} style={{ color: '#ffffff' }} /> {/* Color blanco */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (

<div style={{ backgroundColor: '#1C2B67' }}>
<Navbar className="navbar-custom">
  <Container>
    <IconButton onClick={toggleDrawer(true)} aria-label="menu">
      <MenuIcon style={{ color: '#ffffff' }} /> {/* Color blanco */}
    </IconButton>
    <Drawer open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  </Container>
  <LogoutButton/>
</Navbar>
</div>

  )
}
