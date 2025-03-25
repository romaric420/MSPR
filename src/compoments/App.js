import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Connexion from '../pages/Connexion';
import Acceuil from '../pages/Acceuil';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/acceuil" element={<Acceuil />} />
      </Routes>
    </div>
  );
}

export default App;
