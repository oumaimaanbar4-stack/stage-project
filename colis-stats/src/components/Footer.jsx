// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 2, 
        py: 1, 
        px: 3, 
        backgroundColor: '#e67e22', 
        color: 'white',
        borderTopLeftRadius: '15px', 
        borderTopRightRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography variant="caption" sx={{ fontSize: '0.65rem', opacity: 0.8 }}>
          © 2026 Amana-Track
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Typography variant="caption" sx={{ fontSize: '0.65rem', cursor: 'pointer', '&:hover': { opacity: 1 } }}>
            Conditions
          </Typography>
          
          <Typography 
            variant="caption" 
            onClick={() => navigate('/settings')} 
            sx={{ 
              fontSize: '0.65rem', 
              cursor: 'pointer', 
              textDecoration: 'underline',
              transition: 'color 0.2s',
              '&:hover': { color: '#000000' } 
            }}
          >
            Sécurité et Confidentialité
          </Typography>
        </Box>
      </Box>

      <Box 
        sx={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}
      >
        <img 
          src="photo/amana.jpeg" 
          alt="Amana Logo" 
          style={{ height: '18px'}} 
        />
      </Box>
    </Box>
  );
};

export default Footer;