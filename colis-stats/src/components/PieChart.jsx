import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

const MyPieChart = ({ data, type }) => {
  const total = data.length || 1;

  const getChartData = () => {
    if (type === 'statut') {
      const livre = data.filter(d => d.dernierStatut === 'liv').length;
      const transit = data.filter(d => d.dernierStatut === 'aexp').length;
      return [
        { id: 0, label: 'Livré', value: livre, color: '#000000' },
        { id: 1, label: 'Transit', value: transit, color: '#333333' },
      ];
    }

    if (type === 'paiement') {
      const paye = data.filter(d => d.datePaiement).length;
      // Removed the 'const impaye' line that was causing the warning
      return [
        { id: 0, label: 'Payé', value: paye, color: '#0066FF' },
        { id: 1, label: 'Impayé', value: total - paye, color: '#FF0000' }, // Use math instead of a new variable
      ];
    }

    if (type === 'envois') {
      return [
        { id: 0, label: 'Livré', value: data.filter(d => d.dernierStatut === 'liv').length, color: '#2d6a4f' },
        { id: 1, label: 'En cours', value: data.filter(d => d.dernierStatut === 'aexp').length, color: '#808080' },
        { id: 2, label: 'Retour', value: data.filter(d => d.dernierStatut === 'ret').length, color: '#FF0000' },
      ];
    }
    return [];
  };

  const chartData = getChartData();
  const payeCount = data.filter(d => d.datePaiement).length;
  const payePercent = `${((payeCount / total) * 100).toFixed(2)}% Payé`;

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: 250, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      <PieChart
        series={[
          {
            data: chartData,
            innerRadius: 70,
            outerRadius: 90,
            paddingAngle: 5,
            startAngle: type === 'paiement' ? -90 : 0,
            endAngle: type === 'paiement' ? 90 : 360,
            cy: type === 'paiement' ? 140 : 125, 
            arcLabel: (item) => type === 'statut' ? `${((item.value / total) * 100).toFixed(1)}%` : '',
          },
        ]}
        sx={{
          '& .MuiPieArcLabel-root': {
            fill: 'white',
            fontWeight: 400,
            fontSize: '11px',
          },
        }}
        height={250}
        margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
        slotProps={{ 
            legend: { 
                hidden: type === 'paiement', 
                direction: 'row',
                position: { vertical: 'top', horizontal: 'middle' },
                labelStyle: { fontSize: 12, fontWeight: 400 }
            } 
        }}
      />
      
      {type === 'paiement' && (
        <Typography 
          variant="body2" 
          sx={{
            position: 'absolute',
            top: '155px', 
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            fontWeight: 400,
            fontSize: '12px',
            color: 'text.secondary'
          }}
        >
          {payePercent}
        </Typography>
      )}
    </Box>
  );
};

export default MyPieChart;