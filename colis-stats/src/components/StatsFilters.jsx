import React from "react";
import { Paper, TextField,  MenuItem, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// On ajoute les "props" comme ta binôme pour recevoir l'état du parent
export default function StatsFilters({ filters, onFilterChange, villes = [] }) {
  
  const fieldStyle = { width: 220 };

  // Cette fonction imite celle de ta binôme : elle met à jour l'objet global
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>

          {/* Recherche par Code */}
          <TextField
            size="small"
            placeholder="Code envoi"
            sx={fieldStyle}
            value={filters.codeEnvoi} // Utilise l'objet central
            onChange={(e) => handleChange('codeEnvoi', e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Recherche par Téléphone */}
          <TextField
            size="small"
            placeholder="Tel destinataire"
            sx={fieldStyle}
            value={filters.telephone}
            onChange={(e) => handleChange('telephone', e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* DATE PICKERS : On passe l'objet central au lieu des states locaux */}
          <DatePicker
            label="Date dépôt"
            value={filters.dateDepot || null}
            onChange={(newValue) => handleChange('dateDepot', newValue)}
            slotProps={{ textField: { size: "small", sx: fieldStyle } }}
          />

          <DatePicker
            label="Date statut"
            value={filters.dateStatut || null}
            onChange={(newValue) => handleChange('dateStatut', newValue)}
            slotProps={{ textField: { size: "small", sx: fieldStyle } }}
          />

          <DatePicker
            label="Date paiement"
            value={filters.datePaiement || null}
            onChange={(newValue) => handleChange('datePaiement', newValue)}
            slotProps={{ textField: { size: "small", sx: fieldStyle } }}
          />

          {/* SELECTS */}
          <TextField
            select
            size="small"
            sx={fieldStyle}
            value={filters.statut}
            onChange={(e) => handleChange('statut', e.target.value)}
          >
            <MenuItem value="Tout statut">Tout statut</MenuItem>
            <MenuItem value="liv">Livré</MenuItem>
            <MenuItem value="enc">En cours</MenuItem>
            <MenuItem value="tra">En transit</MenuItem>
            <MenuItem value="ret">Retour</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            sx={fieldStyle}
            value={filters.ville}
            onChange={(e) => handleChange('ville', e.target.value)}
          >
            <MenuItem value="Toute destination">Toute destination</MenuItem>
            {villes.map((v) => (
              <MenuItem key={v} value={v}>{v}</MenuItem>
            ))}
          </TextField>

          <TextField
            select
            size="small"
            sx={fieldStyle}
            value={filters.paiement}
            onChange={(e) => handleChange('paiement', e.target.value)}
          >
            <MenuItem value="Paiement">Paiement</MenuItem>
            <MenuItem value="Payé">Payé</MenuItem>
            <MenuItem value="Impayé">Impayé</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            sx={fieldStyle}
            value={filters.crbt}
            onChange={(e) => handleChange('crbt', e.target.value)}
          >
            <MenuItem value="CRBT">CRBT</MenuItem>
            <MenuItem value="Avec">Avec CRBT</MenuItem>
            <MenuItem value="Sans">Sans CRBT</MenuItem>
          </TextField>

        </Box>
      </LocalizationProvider>
    </Paper>
  );
}