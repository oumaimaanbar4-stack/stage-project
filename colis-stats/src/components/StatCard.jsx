import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const StatCard = ({ title, value, icon, borderColor }) => (
  <Paper 
    elevation={1} 
    sx={{ 
      p: 1.5, // Only one layer of padding
      borderRadius: 0, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      backgroundColor: 'white',
      borderBottom: `4px solid ${borderColor}`,
      height: '100%',
      minHeight: '85px',
      boxSizing: 'border-box'
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
          textOverflow: 'ellipsis'
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