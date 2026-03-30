import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import dayjs from 'dayjs'; // Ensure dayjs is imported

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
    dateDepotStart: null,
    dateDepotEnd: null,
    dateStatutStart: null,
    dateStatutEnd: null,
    datePaiement: null,
  });

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
      // 1. STATUT LOGIC
      const statusValue = filters.statut; 
      const itemCode = item.dernierStatut || ""; 
      const matchStatut = 
        statusValue === 'Tout statut' || 
        itemCode === statusValue || 
        (statusValue === "liv" && itemCode === "liv") ||
        (statusValue === "ret" && itemCode === "ret") ||
        (statusValue === "enc" && itemCode === "aff") ||
        (statusValue === "tra" && (itemCode === "aexp"));

      // 2. RANGE FILTER LOGIC (NEW)
      const checkInRange = (start, end, itemDateValue) => {
        if (!start && !end) return true;
        if (!itemDateValue) return false;
        
        const itemDate = dayjs(itemDateValue);
        if (!itemDate.isValid()) return false;

        const isAfterStart = start ? itemDate.isSame(start, 'day') || itemDate.isAfter(start, 'day')    :true;
        const isBeforeEnd = end ? itemDate.isSame(end, 'day') || itemDate.isBefore(end, 'day') : true;
        return isAfterStart && isBeforeEnd;
      };

      // 3. SINGLE DATE LOGIC (For Paiement)
      const compareSingleDate = (filterDate, itemDate) => {
        if (!filterDate || !filterDate.isValid()) return true;
        if (!itemDate) return false;
        return filterDate.format('YYYY-MM-DD') === dayjs(itemDate).format('YYYY-MM-DD');
      };

      const matchDateDepot = checkInRange(filters.dateDepotStart, filters.dateDepotEnd, item.dateDepot);
      const matchDateStatut = checkInRange(filters.dateStatutStart, filters.dateStatutEnd, item.dateLastStatus || item.dateStatut);
      const matchDatePaiement = compareSingleDate(filters.datePaiement, item.datePaiement || item.paye);

      // 4. PAIEMENT & CRBT
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

      // 5. VILLE & SEARCH
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

  const value = { filters, setFilters, filteredData, rawData, villesUniques, loading };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => useContext(FilterContext);