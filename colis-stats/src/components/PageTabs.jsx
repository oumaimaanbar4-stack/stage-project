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
        <Tab label=" demandes de modification" value="/modifications" />
        <Tab label="Mes demandes de modifications" value="/demandes-modification" />
        <Tab label="creer un client" value="/clients" />
        <Tab label="creer un utilisateur" value="/utilisateur" />
        <Tab label="liste d'utilisateurs" value="/utilisateurs" />
      </Tabs>
    </Box>
  );
}