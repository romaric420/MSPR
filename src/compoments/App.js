import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Connexion from '../pages/Connexion';
import Acceuil from '../pages/Acceuil';
import Inscription from '../pages/Inscription'; // 👈 importe la page d'inscription

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/acceuil" element={<Acceuil />} />
        <Route path="/inscription" element={<Inscription />} /> {/* ✅ nouvelle route */}
      </Routes>
    </div>
  );
}

export default App;
