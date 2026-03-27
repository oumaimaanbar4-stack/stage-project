import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function PageTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  
  const currentPath = location.pathname;

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%',
      borderBottom: 1, 
      borderColor: "divider", 
      bgcolor: 'background.paper',
      mb: 3,
    }}>
      <Tabs
        value={currentPath}
        onChange={handleChange}
        variant="scrollable"    
        scrollButtons="auto"                
        aria-label="navigation tabs"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          '& .MuiTabs-scrollButtons.Mui-disabled': { opacity: 0.3 },
        }}
      >
        <Tab label="Mes statistiques" value="/dashboard" />
        <Tab label="Mes envois" value="/envois" />
        <Tab label="Mes demandes de modification" value="" />
        <Tab label="demandes de modifications" value="" />
        <Tab label="creer un client" value="" />
        <Tab label="creer un utilisateur" value="" />
        <Tab label="liste d'utilisateurs" value="" />
      </Tabs>
    </Box>
  );
}