import React, { useEffect, useState } from 'react';
import {
    Box, Paper, Typography, Button, Chip, Toolbar,
    Drawer, TextField, FormControl, InputLabel, Select,
    MenuItem, Alert, Divider, IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    PersonAdd as PersonAddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Close as CloseIcon,
    Save as SaveIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import PageTabs from "../components/PageTabs";
import ConfirmDialog from '../components/ConfirmDialog';
import api from '../services/api';



const ListeUtilisateurs = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ name: '', role: '' });
    const [loading, setLoading] = useState(true);
    const [confirmDialog, setConfirmDialog] = useState({ open: false, userId: null, userName: '' });

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editData, setEditData] = useState({ id: null, name: '', email: '', password: '', role: 'user' });
    const [editStatus, setEditStatus] = useState({ type: '', msg: '' });
    const [editLoading, setEditLoading] = useState(false);

    const navigate = useNavigate();

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

    const handleEdit = (row) => {
        // Normalize role to lowercase to match MenuItem values
        setEditData({ id: row.id, name: row.name, email: row.email, password: '', role: (row.role || '').toLowerCase() });
        setEditStatus({ type: '', msg: '' });
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setEditStatus({ type: '', msg: '' });
    };

    const handleEditSave = async () => {
        setEditLoading(true);
        try {
            const payload = { name: editData.name, email: editData.email, role: editData.role };
            if (editData.password) payload.password = editData.password;

            await api.put(`/users/${editData.id}`, payload);

            setUsers(prev => prev.map(u =>
                u.id === editData.id
                    ? { ...u, name: editData.name, email: editData.email, role: editData.role }
                    : u
            ));

            setEditStatus({ type: 'success', msg: 'Utilisateur modifié avec succès !' });
            setTimeout(() => closeDrawer(), 1500);
        } catch (error) {
            console.error("Erreur modification:", error);
            setEditStatus({ type: 'error', msg: 'Erreur lors de la modification.' });
        } finally {
            setEditLoading(false);
        }
    };

    const handleDelete = (id, name) => {
        setConfirmDialog({ open: true, userId: id, userName: name });
    };

    const handleDeleteConfirm = async () => {
        const { userId } = confirmDialog;
        setConfirmDialog({ open: false, userId: null, userName: '' });
        try {
            await api.delete(`/users/${userId}`);
            setUsers(users.filter(u => u.id !== userId));
        } catch (error) {
            console.error("Erreur lors de l'archivage:", error);
        }
    };

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
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
                    <Button
                        size="small"
                        startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />}
                        onClick={() => handleEdit(params.row)}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.78rem',
                            color: '#1a237e',
                            border: '1px solid #c5cae9',
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.5,
                            backgroundColor: '#f0f2ff',
                            '&:hover': { backgroundColor: '#e8eaf6', borderColor: '#9fa8da' },
                        }}
                    >
                        Modifier
                    </Button>
                    <Button
                        size="small"
                        startIcon={<DeleteIcon sx={{ fontSize: '14px !important' }} />}
                        onClick={() => handleDelete(params.row.id, params.row.name)}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.78rem',
                            color: '#c62828',
                            border: '1px solid #ffcdd2',
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.5,
                            backgroundColor: '#fff5f5',
                            '&:hover': { backgroundColor: '#ffebee', borderColor: '#ef9a9a' },
                        }}
                    >
                        Supprimer
                    </Button>
                </Box>
            )
        }
    ];

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Box component="main" sx={{ mt: 2, flexGrow: 1, p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
                    <NavBar user={user} />
                    <Toolbar />
                    <PageTabs />
                    <Box sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h1" fontWeight="bold" sx={{ mb: 1.5, color: "black", fontSize: '1.5rem' }}>
                                Liste des Utilisateurs
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    onClick={() => navigate('/utilisateurs/archives')}
                                    sx={{ borderRadius: 2, px: 3, fontWeight: 'bold' }}
                                >
                                    VOIR ARCHIVES
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<PersonAddIcon />}
                                    onClick={() => navigate('/utilisateur')}
                                    sx={{ bgcolor: '#1a237e', borderRadius: 2, px: 3 }}
                                >
                                    AJOUTER UTILISATEUR
                                </Button>
                            </Box>
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
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={closeDrawer}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: 420 },
                        borderRadius: '16px 0 0 16px',
                        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
                    }
                }}
            >
                {/* Header */}
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    px: 3, py: 2.5, backgroundColor: '#1a237e',
                }}>
                    <Box>
                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem' }}>
                            Modifier l'utilisateur
                        </Typography>
                        <Typography sx={{ color: '#9fa8da', fontSize: '0.8rem', mt: 0.2 }}>
                            {editData.name}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={closeDrawer}
                        size="small"
                        sx={{ color: '#fff', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider />

                {/* Form fields */}
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5, overflowY: 'auto', flexGrow: 1 }}>

                    {editStatus.msg && (
                        <Alert severity={editStatus.type} sx={{ borderRadius: 2 }}>
                            {editStatus.msg}
                        </Alert>
                    )}

                    <TextField
                        label="Nom Complet"
                        fullWidth
                        size="small"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />

                    <TextField
                        label="Adresse Email"
                        fullWidth
                        size="small"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />

                    <TextField
                        label="Nouveau mot de passe"
                        type="password"
                        fullWidth
                        size="small"
                        placeholder="Laisser vide pour ne pas changer"
                        value={editData.password}
                        onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                    />

                    <FormControl fullWidth size="small">
                        <InputLabel>Rôle</InputLabel>
                        <Select
                            value={editData.role}
                            label="Rôle"
                            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="manager">Manager</MenuItem>
                            <MenuItem value="user">Utilisateur</MenuItem>
                            <MenuItem value="livreur">Livreur</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Footer */}
                <Box sx={{ px: 3, py: 2.5, borderTop: '1px solid #e2e8f0', display: 'flex', gap: 1.5 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={closeDrawer}
                        sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 600,
                            borderColor: '#cbd5e1',
                            color: '#374151',
                            '&:hover': { borderColor: '#94a3b8', backgroundColor: '#f8fafc' }
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleEditSave}
                        disabled={editLoading}
                        sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 700,
                            backgroundColor: '#1a237e',
                            boxShadow: 'none',
                            '&:hover': { backgroundColor: '#283593', boxShadow: 'none' }
                        }}
                    >
                        {editLoading ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </Box>
            </Drawer>
            <ConfirmDialog
                open={confirmDialog.open}
                onClose={() => setConfirmDialog({ open: false, userId: null, userName: '' })}
                onConfirm={handleDeleteConfirm}
                title="Archiver cet utilisateur ?"
                message={
                    <>
                        <strong>{confirmDialog.userName}</strong> sera archivé définitivement.
                        Ses données resteront dans le système.
                    </>
                }
                confirmText="Archiver"
                cancelText="Annuler"
                severity="error"
            />
        </>
    );
};

export default ListeUtilisateurs;
