import React, { useState } from "react";
import {AppBar,Toolbar,IconButton,Box,Typography,Avatar,Menu,MenuItem,Divider, ListItemText} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


const NavBar = () => {
  const navigate = useNavigate();

  
  const [menuAnchor, setMenuAnchor] = useState(null);
  const openHamburger = Boolean(menuAnchor);

  const handleHamburgerOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleHamburgerClose = () => setMenuAnchor(null);


  const [avatarAnchor, setAvatarAnchor] = useState(null);
  const openAvatar = Boolean(avatarAnchor);

  const handleAvatarOpen = (event) => setAvatarAnchor(event.currentTarget);
  const handleAvatarClose = () => setAvatarAnchor(null);

 
  const handleLogout = () => {
    localStorage.removeItem("auth"); // On vide la session
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", color: "#333", borderBottom: "1px solid #ddd" }}
      elevation={0}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        
        {/* CÔTÉ GAUCHE : Menu + Infos utilisateur */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={handleHamburgerOpen}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            open={openHamburger}
            onClose={handleHamburgerClose}
            PaperProps={{ sx: { mt: 1, minWidth: 220 } }}
          >

            <MenuItem onClick={() => { handleHamburgerClose(); navigate("/dashboard"); }}>
              <ListItemIcon>
                <BarChartIcon fontSize="small" />
              </ListItemIcon>
              Mes Statistiques
            </MenuItem>

            <MenuItem onClick={() => { handleHamburgerClose(); navigate("/envois"); }}>
              <ListItemIcon>
                <LocalShippingIcon fontSize="small" />
              </ListItemIcon>
              Mes Envois
            </MenuItem>

            <MenuItem onClick={() => { handleHamburgerClose(); navigate("/modifications"); }}>
              <ListItemIcon>
                <EditNoteIcon fontSize="small" />
              </ListItemIcon>
              Mes Demandes De Modification
            </MenuItem>

            <MenuItem onClick={() => { handleHamburgerClose(); navigate("/demandes"); }}>
              <ListItemIcon>
                <FactCheckIcon fontSize="small" />
              </ListItemIcon>
              Demandes De Modifications
            </MenuItem>

            <MenuItem onClick={() => { handleHamburgerClose(); navigate("/creer"); }}>
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              Créer Un Client
            </MenuItem>

            <MenuItem onClick={() => { handleHamburgerClose(); navigate("/create-user"); }}>
              <ListItemIcon>
                <GroupAddIcon fontSize="small" />
              </ListItemIcon>
              Créer Un Utilisateur
            </MenuItem>

            <MenuItem onClick={() => { handleHamburgerClose(); navigate("/users"); }}>
              <ListItemIcon>
                <GroupsIcon fontSize="small" />
              </ListItemIcon>
              Liste D'utilisateurs
            </MenuItem>

          </Menu>

          <Box>
            <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
              Bienvenue: admin
            </Typography>
            <Typography variant="caption">Profil: Client</Typography>
          </Box>
        </Box>

        {/* LOGO CENTRAL */}
        <Box 
          onClick={() => navigate("/dashboard")} 
          sx={{ 
            cursor: "pointer", 
            transition: "transform 0.2s", 
            "&:hover": { transform: "scale(1.05)" }, // Subtle zoom effect on hover
            display: "flex",
            alignItems: "center"
          }}
        >
          <img src="/photo/amana.jpeg" alt="Logo" style={{ height: "40px", objectFit: "contain"}} />
        </Box>

        {/* CÔTÉ DROIT : Avatar + Menu Profil */}
        <Box>
          <IconButton onClick={handleAvatarOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: "#2c3e50", width: 32, height: 32 }}>A</Avatar>
          </IconButton>

          <Menu
            anchorEl={avatarAnchor}
            open={openAvatar}
            onClose={handleAvatarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              elevation: 4,
              sx: {
                mt: 1.5,
                borderRadius: '12px',
                minWidth: 200,
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem onClick={() => { handleAvatarClose(); navigate("/profile"); }}>
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={() => { handleAvatarClose(); navigate("/settings"); }}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;