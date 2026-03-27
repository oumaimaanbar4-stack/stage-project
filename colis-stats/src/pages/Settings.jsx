import React, { useState } from "react";
import { Box, Container, Paper, Typography, TextField, Button, Grid, Avatar, Divider, Alert } from "@mui/material";
import NavBar from "../components/NavBar";

import SaveIcon from "@mui/icons-material/Save";

const SettingsPage = () => {
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleSave = () => {
  
    if (passwords.new !== passwords.confirm) {
      setStatus({ type: "error", msg: "Les mots de passe ne correspondent pas !" });
      return;
    }
    
    setStatus({ type: "success", msg: "Modification simulée ! (Nécessite une base de données pour être réelle)" });
  };

  return (
    <>
      <NavBar />
      <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", py: 5 }}>
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: 4, borderRadius: "16px", border: "1px solid #eee" }}>
            
            {/* Header Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <Avatar sx={{ bgcolor: "#1a237e", width: 56, height: 56 }}>AD</Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold" color="#1a237e">Paramètres de sécurité</Typography>
                <Typography variant="body2" color="text.secondary">Gérez votre mot de passe et la sécurité de votre compte Amana</Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {status.msg && <Alert severity={status.type} sx={{ mb: 3 }}>{status.msg}</Alert>}

            {/* Password Form */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>Mot de passe actuel</Typography>
                <TextField 
                  fullWidth 
                  type="password" 
                  size="small"
                  placeholder="••••••••"
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>Nouveau mot de passe</Typography>
                <TextField 
                  fullWidth 
                  type="password" 
                  size="small"
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>Confirmer le mot de passe</Typography>
                <TextField 
                  fullWidth 
                  type="password" 
                  size="small"
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                />
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="text" color="inherit">Annuler</Button>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ 
                  bgcolor: "#ff6d00", // Amana Orange
                  "&:hover": { bgcolor: "#e65100" },
                  px: 4,
                  borderRadius: "8px",
                  fontWeight: "bold"
                }}
              >
                Sauvegarder
              </Button>
            </Box>

          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default SettingsPage;