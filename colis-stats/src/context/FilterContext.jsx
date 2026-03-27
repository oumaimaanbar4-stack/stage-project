import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    codeEnvoi: '',
    telephone: '',
    statut: 'Tout statut',
    ville: 'Toute destination',
    paiement: 'Paiement',
    crbt: 'CRBT',
    dateDepot: null,
    dateStatut: null,
    datePaiement: null,
  });

  // Fetch data once
  useEffect(() => {
    fetch('/data/command.json')
      .then((res) => res.json())
      .then((json) => {
        setRawData(json);
        setLoading(false);
      })
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  
  const filteredData = useMemo(() => {
    return rawData.filter((item) => {
      // --- 1. STATUT LOGIC (Fixing En Transit) ---
      const statusValue = filters.statut; 
      const itemCode = item.dernierStatut || ""; 
      const matchStatut = 
        statusValue === 'Tout statut' || 
        itemCode === statusValue || 
        (statusValue === "enc" && itemCode === "aff") ||
        (statusValue === "tra" && (itemCode === "aexp"));

      // --- 2. DATE FILTERS LOGIC ---
      // Function to compare if two dates match (Year-Month-Day)
      // --- 2. DATE FILTERS LOGIC ---
  const compareDate = (filterDate, itemDate) => {

    if (!filterDate || !filterDate.isValid()) return true; // do not filter if the date isn't selected

    // checks if the specific item in json is missing or null
    if (!itemDate) return false;//If a user selects a date => null=> false hide the row 

    try {
      //(from DatePicker) to "YYYY-MM-DD": D.P gives you a complex JS.o that contains T.Z, ms, methods
      const formattedFilter = filterDate.format('YYYY-MM-DD');
      const formattedItem = String(itemDate).substring(0, 10);

      return formattedFilter === formattedItem;
    } catch (err) {
      console.error("Date comparison error:", err);
      return false;
    }
  };

  // Check the fields against your JSON keys
  const matchDateDepot = compareDate(filters.dateDepot, item.dateDepot);
  const matchDateStatut = compareDate(filters.dateStatut, item.dateLastStatus || item.dateStatut);
  const matchDatePaiement = compareDate(filters.datePaiement, item.datePaiement || item.paye);

      // --- 3. PAIEMENT & CRBT LOGIC ---
      const isPayed = item.datePaiement !== null || item.paye !== null;
      const matchPaiement = 
        filters.paiement === 'Paiement' || 
        (filters.paiement === 'Payé' && isPayed) || 
        (filters.paiement === 'Impayé' && !isPayed);

      const hasCrbt = Number(item.amountCrbt) > 0;
      const matchCrbt = 
        filters.crbt === 'CRBT' || 
        (filters.crbt === 'Avec' && hasCrbt) || 
        (filters.crbt === 'Sans' && !hasCrbt);

      // --- 4. VILLE & SEARCH ---
      const itemVille = item.libville || item.city || item.ville || "";
      const matchVille = filters.ville === 'Toute destination' || itemVille === filters.ville;
      const matchCode = filters.codeEnvoi === '' || 
        (item.codeBordereau && item.codeBordereau.toLowerCase().includes(filters.codeEnvoi.toLowerCase()));
      const matchTel = filters.telephone === '' || 
        (item.telDest && item.telDest.includes(filters.telephone));
      
      return matchStatut && matchDateDepot && matchDateStatut && matchDatePaiement && 
            matchPaiement && matchCrbt && matchVille && matchCode && matchTel;
    });
  }, [rawData, filters]);

  const villesUniques = useMemo(() => {
    return [...new Set(rawData.map(item => item.libville || item.city || item.ville))].filter(Boolean);
  }, [rawData]);

  const value = {
    filters,
    setFilters,
    filteredData,
    rawData,
    villesUniques,
    loading
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);