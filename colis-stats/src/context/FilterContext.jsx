import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import dayjs from 'dayjs'; 
import api from '../services/api';
import axios from 'axios';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [rawData, setRawData] = useState([]);
  const [envois, setEnvois] = useState([]);
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
    const fetchEnvois = async () => {
      setLoading(true);
      try {
        // Bypasses browser cache by making the URL unique
        const response = await axios.get(`http://localhost:8000/api/shipments?t=${new Date().getTime()}`);

        // If Laravel sends back the full object (including the debug info we added)
        // make sure you access the correct property, e.g., response.data.all_data
        // But if you reverted the Controller to just return the list, response.data is fine.
        const data = response.data.all_data || response.data;

        setEnvois(data); 
        setRawData(data); // KEEP THIS: It's your filter backup!
      } catch (err) {
        console.error("Erreur de récupération des envois:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvois();
  }, []); // Empty dependency array means this runs once on page load

  const filteredData = useMemo(() => {
    return rawData.filter((item) => {
      const statusValue = filters.statut ? filters.statut.toLowerCase() : 'tout statut'; 

      const matchStatut = 
        statusValue === 'tout statut' || 
        
        (item.dernierStatut && item.dernierStatut.toLowerCase() === statusValue) || 
        
        (statusValue === "aff" && (item.dernierStatut?.toLowerCase() === "enc" || item.dernierStatut?.toLowerCase() === "aff")) ||
      
        (statusValue === "aexp" && (item.dernierStatut?.toLowerCase() === "tra" || item.dernierStatut?.toLowerCase() === "aexp")) ||
     
        (statusValue === "liv" && item.dernierStatut?.toLowerCase() === "liv") ||
       
        (statusValue === "ret" && item.dernierStatut?.toLowerCase() === "ret");

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
      const matchDateStatut = checkInRange(filters.dateStatutStart, filters.dateStatutEnd, item.dateLastStatus); 
      const matchDatePaiement = compareSingleDate(filters.datePaiement, item.datePaiement);

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
      const itemVille = (item.libville || item.city || item.ville || "").toUpperCase();
      const matchVille = filters.ville === 'Toute destination' || itemVille === filters.ville.toUpperCase();
      const matchCode = filters.codeEnvoi === '' || 
        (item.codeBordereau && item.codeBordereau.toLowerCase().includes(filters.codeEnvoi.toLowerCase()));
      const matchTel = filters.telephone === '' || 
       (item.telDest && String(item.telDest).trim().includes(filters.telephone));
      
      return matchStatut && matchDateDepot && matchDateStatut && matchDatePaiement && 
             matchPaiement && matchCrbt && matchVille && matchCode && matchTel;
    });
  }, [rawData, filters]);

  const villesUniques = useMemo(() => {
    const transformed = rawData.map(item => {
      const val = item.libville || item.city || item.ville || "";
      return val.trim().toUpperCase(); 
    });
    return [...new Set(transformed)].filter(Boolean).sort();
  }, [rawData]);

  const value = { filters, setFilters, filteredData, rawData, villesUniques, loading };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => useContext(FilterContext);