import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import ProtectedRoute from "./utils/ProtectedRoute"; 
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MesEnvois from "./pages/MesEnvois";
import CreerClient from "./pages/CreerClient";
import CreerUtilisateur from "./pages/CreerUtilisateur";
import ListeUtilisateurs from "./pages/ListeUtilisateurs";
import Settings from "./pages/Settings";
import CreerShipment from "./pages/CreerShipment";
import Clients from "./pages/Clients";
import Profile from "./pages/Profile";
import ListeBord from "./pages/ListeBord";
import DemandesDeModif from "./pages/DemandesDeModif";
import MesDemandeDeModif from "./pages/MesDemandeDeModif";
import ArchivedClients from "./pages/ArchivedClients";
import ArchivedUsers from './pages/ArchivedUsers';

function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          
       
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/envois" element={<MesEnvois />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/creer" element={<CreerClient />} /> 
            <Route path="/utilisateurs" element={<ListeUtilisateurs />} />
            <Route path="/utilisateur" element={<CreerUtilisateur />} />
            <Route path="/creer-shipment/:clientId" element={<CreerShipment />} />
            <Route path="/bordereaux/:clientId" element={<ListeBord />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/demandes-modification" element={<DemandesDeModif />} />
            <Route path ="/modifications" element={<MesDemandeDeModif/>}/>
            <Route path="/clients/archived" element={<ArchivedClients />} />
            <Route path="/utilisateurs/archives" element={<ArchivedUsers />} />

          </Route>

       
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
}

export default App;