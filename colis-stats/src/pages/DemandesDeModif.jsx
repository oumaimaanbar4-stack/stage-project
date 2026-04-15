import React, { useState, useMemo, useEffect} from 'react';
import { Box, Typography, TextField, Button, MenuItem, Alert, Card, CardContent, Toolbar, Chip} from '@mui/material';
import PageTabs from "../components/PageTabs";
import { DataGrid } from '@mui/x-data-grid';
import NavBar from '../components/NavBar';
import SendIcon from '@mui/icons-material/Send';
import { useFilters } from '../context/FilterContext';
import api from "../services/api";

export default function DemandesDeModif() {
  const { rawData } = useFilters();
  const [selectedShipmentId, setSelectedShipmentId] = useState('');
  const [fieldToChange, setFieldToChange] = useState('');
  const [newValue, setNewValue] = useState('');
  const [success, setSuccess] = useState(false);
  const [justification, setJustification] = useState('');
  const [user, setUser] = useState({ name: '', role: '' });
  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    api.get('/modification-requests')
      .then(res => {
        const mapped = res.data.map(item => ({
          id: item.id,
          codeEnvoi: item.code_envoi,
          champ: item.champ,
          ancienneValeur: item.ancienne_valeur,
          nouvelleValeur: item.nouvelle_valeur,
          justification: item.justification,
          status: item.status,
          date: item.created_at ? new Date(item.created_at).toLocaleDateString() : ''
        }));
        setRows(mapped);
      })
      .catch(err => console.error("Erreur lors du chargement:", err));
  }, []);

  

  const [rows, setRows] = useState([]);

  const editableFields = [
    { id: 'nomDest', label: 'Nom Destinataire' },
    { id: 'telDest', label: 'Téléphone Destinataire' },
    { id: 'libville', label: 'Ville / Destination' },
    { id: 'amountCrbt', label: 'Montant CRBT' },
    { id: 'commentaire', label: 'Commentaire' },
    { id: 'adresseDest', label: 'Adresse Destinataire' }
  ];

  const oldValue = useMemo(() => {
    if (!selectedShipmentId || !fieldToChange) return '';
    const shipment = rawData.find(s => s.codeBordereau === selectedShipmentId);
    return shipment ? shipment[fieldToChange] : '';
  }, [selectedShipmentId, fieldToChange, rawData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      code_envoi: selectedShipmentId,
      champ: editableFields.find(f => f.id === fieldToChange)?.label,
      ancienne_valeur: oldValue,
      nouvelle_valeur: newValue,
      justification: justification,
      status: 'En attente',
    };

    try {
      const response = await api.post('/modification-requests', requestData);

      const newRequest = {
        id: response.data.id || Date.now(),
        codeEnvoi: requestData.code_envoi,
        champ: requestData.champ,
        ancienneValeur: requestData.ancienne_valeur,
        nouvelleValeur: requestData.nouvelle_valeur,
        justification: justification,
        status: requestData.status,
        date: new Date().toLocaleDateString()
      };

      setRows(prevRows => [newRequest, ...prevRows]);
      setSuccess(true);
      setNewValue('');
      setJustification('');
      setSelectedShipmentId('');
      setFieldToChange('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
      alert("Impossible d'enregistrer la demande. Vérifiez votre connexion.");
    }
  };

  const columns = [
    { field: 'codeEnvoi', headerName: 'Code Envoi', flex: 1 },
    { field: 'champ', headerName: 'Champ', flex: 1 },
    { field: 'ancienneValeur', headerName: 'Ancienne Valeur', flex: 1.2 },
    { field: 'nouvelleValeur', headerName: 'Nouvelle Valeur', flex: 1.2 },
    { field: 'justification', headerName: 'Justification', flex: 1.5 },
    { 
      field: 'status', 
      headerName: 'Statut', 
      flex: 1,
      renderCell: (params) => {
        let color = 'warning';  
        if (params.value === 'Accepté') color = 'success';
        if (params.value === 'Refusé') color = 'error';

        return (
          <Chip 
            label={params.value} 
            color={color} 
            size="small" 
            sx={{ fontWeight: 'bold' }}
          />
        );
      }
    },
    { field: 'date', headerName: 'Date Demande', flex: 1 },
  ];

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box component='main' sx={{mt: 2, flexGrow: 1, p: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
          <NavBar user={user}/>
          <Toolbar/>
          <PageTabs />
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: "black", fontSize: '1.5rem' }}>
              Gestion des Demandes de Modification
            </Typography>

            

            <Card variant="outlined" sx={{ borderRadius: 2, mb: 4 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem' }}>Créer une demande</Typography>
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                    <TextField select 
                      size="small" 
                      label="Envoi *" 
                      sx={{ width: 200 }} 
                      value={selectedShipmentId} 
                      onChange={(e) => setSelectedShipmentId(e.target.value)} required
                    >
                      {rawData.map((item) => 
                        <MenuItem key={item.codeBordereau} value={item.codeBordereau}>{item.codeBordereau}</MenuItem>)}
                    </TextField>

                    <TextField select 
                      size="small" 
                      label="Champ *" 
                      sx={{ width: 200 }} 
                      value={fieldToChange} 
                      onChange={(e) => setFieldToChange(e.target.value)} 
                      disabled={!selectedShipmentId} required
                    >
                      {editableFields.map((f) => <MenuItem key={f.id} value={f.id}>{f.label}</MenuItem>)}
                    </TextField>

                    <TextField disabled 
                      size="small" 
                      label="Valeur Actuelle" 
                      value={oldValue || ''} 
                      sx={{ width: 200, bgcolor: '#f8fafc' }} 
                    />

                    <TextField 
                      size="small" 
                      label="Nouvelle Valeur *" 
                      sx={{ width: 200 }} 
                      value={newValue} 
                      onChange={(e) => setNewValue(e.target.value)} 
                      disabled={!fieldToChange} required 
                    />
                    <TextField
                      size="small"
                      label="Justification *"
                      sx={{ width: 300 }}
                      value={justification}
                      onChange={(e) => setJustification(e.target.value)}
                      disabled={!fieldToChange}
                      required
                      multiline
                      maxRows={2}

                    />

                    <Button type="submit" variant="contained" startIcon={<SendIcon />} sx={{ bgcolor: '#1e3a8a', height: 40 }}>
                      ENVOYER
                    </Button>
                  </Box>
                </form>
                {success && <Alert severity="success" sx={{ mt: 2 }}>Demande transmise avec succès.</Alert>}
              </CardContent>
            </Card>

            <Box sx={{ height: 450, width: '100%' }}>
              <DataGrid 
                  rows={rows} 
                  columns={columns} 
                  pageSize={100} 
                  sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f8fafc' } }}
              />
            </Box>
          </Box>
      </Box>
    </>
  );
}