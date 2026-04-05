import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button, Chip, Toolbar, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PersonAdd as PersonAddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import PageTabs from "../components/PageTabs";
import api from '../services/api';



const ListeUtilisateurs = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ name: '', role: '' });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleEdit = (user) => {
        console.log("Modifier l'utilisateur:", user);
    };

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
            console.log("Supprimer l'ID:", id);
        }
    };

    useEffect(() => {
    api.get('/user')
        .then(res => setUser(res.data))
        .catch(err => console.error(err));
    }, []);
    
    useEffect(() => {
        api.get('/all-users')
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setLoading(false);
            });
    }, []);

    
    const columns = [
        { field: 'id', headerName: 'ID', width: 68 },
        { field: 'name', headerName: 'Nom Complet', flex: 1, minWidth: 150 },
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
        { 
            field: 'role', 
            headerName: 'Rôle', 
            width: 120,
            renderCell: (params) => (
                <Chip 
                    label={params.value} 
                    size="small"
                    sx={{ 
                        bgcolor: params.value === 'admin' ? '#e8eaf6' : '#f5f5f5',
                        color: params.value === 'admin' ? '#1a237e' : 'inherit',
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                    }} 
                />
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 220,
            sortable: false,
            headerAlign: 'center', 
            align: 'center',       
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                    color="primary" 
                    size="small"
                    onClick={() => handleEdit(params.row)} 
                    title="Modifier"
                >
                    <EditIcon fontSize="small" />
                    <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Modifier
                    </Typography>
                </IconButton>
                <IconButton 
                    color="error" 
                    size="small"
                    onClick={() => handleDelete(params.row.id)} 
                    title="Supprimer"
                >
                    <DeleteIcon fontSize="small" />
                    <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Supprimer
                    </Typography>
                </IconButton>
                </Box>
            )
            }
    ];

    return (
        <>
             <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Box component="main" sx={{mt: 2, flexGrow: 1, p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
                    <NavBar user={user}  />
                    <Toolbar />
                    <PageTabs/>
                    <Box sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h1" fontWeight="bold" sx={{ mb: 1.5, color: "black", fontSize: '1.5rem' }}>
                                Liste des Utilisateurs
                            </Typography>
                            
                            <Button 
                                variant="contained" 
                                startIcon={<PersonAddIcon />}
                                onClick={() => navigate('/utilisateur')} 
                                sx={{ bgcolor: '#1a237e', borderRadius: 2, px: 3 }}
                            >
                                AJOUTER UTILISATEUR
                            </Button>
                        </Box>

                        <Paper sx={{ height: 500, width: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <DataGrid
                                rows={users}
                                columns={columns}
                                loading={loading}
                                pageSize={7}
                                rowsPerPageOptions={[7, 10, 20]}
                                checkboxSelection
                                disableSelectionOnClick
                                sx={{
                                    border: 'none',
                                    '& .MuiDataGrid-columnHeaders': {
                                        bgcolor: '#f8f9fa',
                                        color: '#1a237e',
                                        fontWeight: 'bold'
                                    },
                                }}
                            />
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ListeUtilisateurs;