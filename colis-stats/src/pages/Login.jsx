import { useState } from "react";
import { TextField, Button, Container, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from '../services/api';


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bgPath = "/photo/aman.webp";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/login', {
            email: email, // from your state
            password: password // from your state
        });

        // Save data
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Go to dashboard
        navigate('/dashboard');
    } catch (error) {
        console.error("Login Error:", error.response?.data?.message);
        alert("Email ou mot de passe incorrect");
    }
  };  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column", 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgPath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Container maxWidth="xs">
          <Paper
            elevation={10}
            sx={{
              padding: 4,
              borderRadius: 4,
              textAlign: "center",
              backdropFilter: "blur(5px)", 
              backgroundColor: "rgba(255, 255, 255, 0.95)", 
            }}
          >
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
              <img 
                src="photo/amana.jpeg" 
                alt="Amana Logo" 
                style={{ height: '50px' }} 
                
              />
            </Box>

            <Typography variant="h5" fontWeight="bold" color="#2c3e50" gutterBottom>
              Amana-Track
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              L'intelligence logistique à votre service
            </Typography>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                label="Mot de passe"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  backgroundColor: "#e67e22", 
                  "&:hover": {
                    backgroundColor: "#d35400",
                  },
                }}
                onClick={handleLogin}
              >
                Se connecter
              </Button>
            </Box>  
          </Paper>
        </Container>
        </Box>
        <Box 
          component="footer" 
          sx={{ 
            display: 'flex',  
            gap: 1.5,
            justifyContent:'center',
            pb:2,
            color:'white'
            
            }}>
          <Typography variant="caption" sx={{ fontSize: '0.65rem', opacity: 0.8 }}> 
            © 2026 Amana-Track — Tous droits réservés
          </Typography>
        </Box>
      
    </Box>
  );
}