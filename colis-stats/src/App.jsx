import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import ProtectedRoute from "./utils/ProtectedRoute"; 
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MesEnvois from "./pages/MesEnvois";
import CreerClient from "./pages/CreerClient";
import Settings from "./pages/Settings";

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
            <Route path="/creer" element={<CreerClient />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

       
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
}

export default App;