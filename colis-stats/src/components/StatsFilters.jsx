import React from "react";
import { Paper, TextField, MenuItem, InputAdornment, Box, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RestartAltIcon from "@mui/icons-material/RestartAlt";


export default function StatsFilters({ filters, onFilterChange, villes = [] }) {

  const selectStyle = {
    width: '100%',
    '& .MuiInputBase-root': { height: 40 },
    '& .MuiInputLabel-root': { fontSize: '0.85rem' },
  };

  const textStyle = {
    width: '100%',
    '& .MuiInputBase-root': { height: 40 },
  };

  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleDateRangeChange = (startKey, endKey, newValue) => {
    if (!filters[startKey] || (filters[startKey] && filters[endKey])) {
      onFilterChange({ ...filters, [startKey]: newValue, [endKey]: null });
    } else {
      onFilterChange({ ...filters, [endKey]: newValue });
    }
  };

  
  const DateRangeField = ({ label, startKey, endKey }) => (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ fontSize: '0.7rem', color: '#64748b', mb: 0.3, lineHeight: 1 }}>
        {label}
      </Typography>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #cbd5e1', height: 33, px: 0.5,
      }}>
        <Typography sx={{ fontSize: '0.76rem', color: '#1e293b', whiteSpace: 'nowrap', flexShrink: 1, overflow: 'hidden' }}>
          {filters[startKey] ? filters[startKey].format('DD/MM/YY') : 'DD/MM/YY'}
          &nbsp;–&nbsp;
          {filters[endKey] ? filters[endKey].format('DD/MM/YY') : 'DD/MM/YY'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, ml: 0.5 }}>
          <IconButton size="small" sx={{ p: 0.2 }}
            onClick={() => onFilterChange({ ...filters, [startKey]: null, [endKey]: null })}>
            <RestartAltIcon sx={{ fontSize: 14, color: '#1e3a8a' }} />
          </IconButton>
          <DatePicker
            onChange={(val) => handleDateRangeChange(startKey, endKey, val)}
            slotProps={{
              textField: {
                variant: 'standard',
                InputProps: { disableUnderline: true },
                sx: { width: '22px', '& .MuiInputBase-input': { display: 'none' } },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  
  const SingleDateField = ({ label, filterKey }) => (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ fontSize: '0.7rem', color: '#64748b', mb: 0.3, lineHeight: 1 }}>
        {label}
      </Typography>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #cbd5e1', height: 33, px: 0.5,
      }}>
        <Typography sx={{ fontSize: '0.76rem', color: '#1e293b' }}>
          {filters[filterKey] ? filters[filterKey].format('DD/MM/YYYY') : 'DD/MM/YYYY'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, ml: 0.5 }}>
          <IconButton size="small" sx={{ p: 0.2 }} onClick={() => handleChange(filterKey, null)}>
            <RestartAltIcon sx={{ fontSize: 14, color: '#1e3a8a' }} />
          </IconButton>
          <DatePicker
            value={filters[filterKey] || null}
            onChange={(val) => handleChange(filterKey, val)}
            slotProps={{
              textField: {
                variant: 'standard',
                InputProps: { disableUnderline: true },
                sx: { width: '22px', '& .MuiInputBase-input': { display: 'none' } },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e2e8f0', borderRadius: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'auto auto',
            columnGap: '14px',
            rowGap: '10px',
            alignItems: 'end',   
          }}
        >

          <TextField
            size="small"
            placeholder="Code envoi"
            sx={{ ...textStyle, gridColumn: '1', gridRow: '1' }}
            value={filters.codeEnvoi || ''}
            onChange={(e) => handleChange('codeEnvoi', e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" sx={{ color: filters.codeEnvoi ? '#2563eb' : 'inherit' }} />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ gridColumn: '2', gridRow: '1' }}>
            <DateRangeField label="Date dépôt" startKey="dateDepotStart" endKey="dateDepotEnd" />
          </Box>

 
          <Box sx={{ gridColumn: '3', gridRow: '1' }}>
            <DateRangeField label="Date statut" startKey="dateStatutStart" endKey="dateStatutEnd" />
          </Box>


          <Box sx={{ gridColumn: '4', gridRow: '1' }}>
            <SingleDateField label="Date paiement" filterKey="datePaiement" />
          </Box>


          <Box sx={{ gridColumn: '5', gridRow: '1 / 3', display: 'flex', alignItems: 'center', pb: '10px' }}>
            <TextField
              select size="small" label="Statut"
              sx={selectStyle}
              value={filters.statut}
              onChange={(e) => handleChange('statut', e.target.value)}
            >
              <MenuItem value="Tout statut">Tout statut</MenuItem>
              <MenuItem value="liv">Livré</MenuItem>
              <MenuItem value="aff">En cours</MenuItem>
              <MenuItem value="aexp">En transit</MenuItem>
              <MenuItem value="ret">Retour</MenuItem>
            </TextField>
          </Box>

          <TextField
            size="small"
            placeholder="Tel destinataire"
            sx={{ ...textStyle, gridColumn: '1', gridRow: '2' }}
            value={filters.telephone || ''}
            onChange={(e) => handleChange('telephone', e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" sx={{ color: filters.telephone ? '#2563eb' : 'inherit' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select size="small" label="Ville"
            sx={{ ...selectStyle, gridColumn: '2', gridRow: '2' }}
            value={filters.ville}
            onChange={(e) => handleChange('ville', e.target.value)}
          >
            <MenuItem value="Toute destination">Toute destination</MenuItem>
            {villes.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
          </TextField>

          <TextField
            select size="small" label="Paiement"
            sx={{ ...selectStyle, gridColumn: '3', gridRow: '2' }}
            value={filters.paiement}
            onChange={(e) => handleChange('paiement', e.target.value)}
          >
            <MenuItem value="Paiement">Tous</MenuItem>
            <MenuItem value="Payé">Payé</MenuItem>
            <MenuItem value="Impayé">Impayé</MenuItem>
          </TextField>

          <TextField
            select size="small" label="CRBT"
            sx={{ ...selectStyle, gridColumn: '4', gridRow: '2' }}
            value={filters.crbt}
            onChange={(e) => handleChange('crbt', e.target.value)}
          >
            <MenuItem value="CRBT">Tous</MenuItem>
            <MenuItem value="Avec">Avec CRBT</MenuItem>
            <MenuItem value="Sans">Sans CRBT</MenuItem>
          </TextField>
        </Box>
      </LocalizationProvider>
    </Paper>
  );
}
