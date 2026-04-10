import React from "react";
import { Paper, TextField, MenuItem, InputAdornment, Box, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function StatsFilters({ filters, onFilterChange, villes = [] }) {
  
  
  const fieldStyle = { 
    width: 210, 
    '& .MuiInputBase-root': { height: 40 }, 
    '& .MuiInputLabel-root': { fontSize: '0.85rem' }
  };

  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleDateRangeChange = (startKey, endKey, newValue) => {
    
    if (!filters[startKey] || (filters[startKey] && filters[endKey])) {
      onFilterChange({ 
        ...filters, 
        [startKey]: newValue, 
        [endKey]: null 
      });
    } else {
      onFilterChange({ 
        ...filters, 
        [endKey]: newValue 
      });
    }
  };


  const UnderlinedDateRange = ({ label, startKey, endKey }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 210 }}>
      <Typography sx={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', mb: 0.2 }}>
        {label}
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid #cbd5e1', 
        height: 32, 
        px: 0.5
      }}>
        
        <Typography sx={{ fontSize: '0.8rem', color: '#1e293b' }}>
          {filters[startKey] ? filters[startKey].format('MM/DD/YYYY') : 'MM/DD/YYYY'} - {filters[endKey] ? filters[endKey].format('MM/DD/YYYY') : 'MM/DD/YYYY'}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            size="small" 
            sx={{ p: 0.2, mr: 0.5 }} 
            onClick={() => {
              onFilterChange({ 
                ...filters, 
                [startKey]: null, 
                [endKey]: null 
              });
            }}
          >
            <RestartAltIcon sx={{ fontSize: 16, color: '#1e3a8a' }} />
          </IconButton>

          <DatePicker
          
            onChange={(val) => handleDateRangeChange(startKey, endKey, val)}
            slotProps={{
              textField: {
                variant: 'standard',
                InputProps: { disableUnderline: true },
                sx: { width: '24px', '& .MuiInputBase-input': { display: 'none' } } 
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e2e8f0', borderRadius: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: 2.5, 
          alignItems: 'flex-end', 
          justifyContent: 'flex-start' 
        }}>

          <TextField
            size="small"
            placeholder="Code envoi"
            sx={fieldStyle}
            value={filters.codeEnvoi || ''}
            onChange={(e) => handleChange('codeEnvoi', e.target.value)}
            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <SearchIcon 
                    fontSize="small" 
                    sx={{ color: filters.codeEnvoi ? '#2563eb' : 'inherit' }} 
                  />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            size="small"
            placeholder="Tel destinataire"
            sx={fieldStyle}
            value={filters.telephone || ''}
            onChange={(e) => handleChange('telephone', e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon 
                    fontSize="small" 
                    sx={{ color: filters.telephone ? '#2563eb' : 'inherit' }} 
                  />
                </InputAdornment>),
            }}
          />

          <UnderlinedDateRange label="Date dépôt" startKey="dateDepotStart" endKey="dateDepotEnd" />
          <UnderlinedDateRange label="Date statut" startKey="dateStatutStart" endKey="dateStatutEnd" />


        <Box sx={{ display: 'flex', flexDirection: 'column', width: 210 }}>
          <Typography sx={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', mb: 0.2 }}>
            Date paiement
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid #cbd5e1', 
            height: 32, 
            px: 0.5
          }}>
            <Typography sx={{ fontSize: '0.8rem', color: '#1e293b' }}>
              {filters.datePaiement ? filters.datePaiement.format('MM/DD/YYYY') : 'MM/DD/YYYY'}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                size="small" 
                sx={{ p: 0.2, mr: 0.5 }} 
                onClick={() => handleChange('datePaiement', null)}
              >
                <RestartAltIcon sx={{ fontSize: 16, color: '#1e3a8a' }} />
              </IconButton>

              <DatePicker
                value={filters.datePaiement || null}
                onChange={(val) => handleChange('datePaiement', val)}
                slotProps={{
                  textField: {
                    variant: 'standard',
                    InputProps: { disableUnderline: true },
                    sx: { width: '24px', '& .MuiInputBase-input': { display: 'none' } }
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
          

          <TextField select size="small" label="Statut" sx={fieldStyle} value={filters.statut} onChange={(e) => handleChange('statut', e.target.value)}>
            <MenuItem value="Tout statut">Tout statut</MenuItem>
            <MenuItem value="liv">Livré</MenuItem>
            <MenuItem value="aff">En cours</MenuItem>
            <MenuItem value="aexp">En transit</MenuItem>
            <MenuItem value="ret">Retour</MenuItem>
          </TextField>

          <TextField select size="small" label="Ville" sx={fieldStyle} value={filters.ville} onChange={(e) => handleChange('ville', e.target.value)}>
            <MenuItem value="Toute destination">Toute destination</MenuItem>
            {villes.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
          </TextField>

          <TextField select size="small" label="Paiement" sx={fieldStyle} value={filters.paiement} onChange={(e) => handleChange('paiement', e.target.value)}>
            <MenuItem value="Paiement">Tous</MenuItem>
            <MenuItem value="Payé">Payé</MenuItem>
            <MenuItem value="Impayé">Impayé</MenuItem>
          </TextField>

          <TextField select size="small" label="CRBT" sx={fieldStyle} value={filters.crbt} onChange={(e) => handleChange('crbt', e.target.value)}>
            <MenuItem value="CRBT">Tous</MenuItem>
            <MenuItem value="Avec">Avec CRBT</MenuItem>
            <MenuItem value="Sans">Sans CRBT</MenuItem>
          </TextField>

        </Box>
      </LocalizationProvider>
    </Paper>
  );
}