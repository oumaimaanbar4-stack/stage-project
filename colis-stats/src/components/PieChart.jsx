import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const MyPieChart = ({ data, type }) => {

  const getChartData = () => {
    if (type === 'statut') {
      return [
        { label: 'Livré', value: data.filter(d => d.dernierStatut === 'liv').length, color: '#1b4332' },
        { label: 'Transit', value: data.filter(d => d.dernierStatut === 'aexp').length, color: '#000' },
      ];
    }
    if (type === 'paiement') {
      return [
        { label: 'Payé', value: data.filter(d => d.datePaiement).length, color: '#2d6a4f' },
        { label: 'Impayé', value: data.filter(d => !d.datePaiement).length, color: '#e63946' },
      ];
    }
    if (type === 'envois') {
      return [
        { label: 'Livré', value: data.filter(d => d.dernierStatut === 'liv').length, color: '#2d6a4f' },
        { label: 'Retour', value: data.filter(d => d.dernierStatut === 'ret').length, color: '#e63946' },
        { label: 'En cours', value: data.filter(d => d.dernierStatut === 'aexp').length, color: '#ffba08' },
      ];
    }
    return [];
  };

  return (
    <PieChart
      series={[{ data: getChartData(), innerRadius: 50, outerRadius: 80, paddingAngle: 5 }]}
      height={200}
      slotProps={{ legend: { hidden: false } }}
    />
  );
};

export default MyPieChart;