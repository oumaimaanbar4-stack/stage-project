import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const StatCard = ({ title, value, icon, borderColor }) => (
  <Paper 
    elevation={0} 
    sx={{ 
      p: 1.5,
      borderRadius: '8px',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      backgroundColor: 'white',
      borderBottom: `4px solid ${borderColor}`,
      height: '100%',
      minHeight: '85px',
      boxSizing: 'border-box',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.15)',
      }
    }}
  >
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Typography 
        variant="caption" 
        sx={{ 
          color: 'black', 
          fontWeight: 700, 
          fontSize: '0.7rem',
          display: 'block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textTransform: 'uppercase'
        }}
      >
        {title}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 800, color: 'black', lineHeight: 1.2 }}>
        {value}
      </Typography>
    </Box>
    <Box sx={{ opacity: 0.9, display: 'flex', alignItems: 'center', flexShrink: 0, ml: 1 }}>
      {icon}
    </Box>
  </Paper>
);

export default StatCard;