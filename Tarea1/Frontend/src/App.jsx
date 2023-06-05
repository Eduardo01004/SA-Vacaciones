import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Pokemons from './pages/pokemons';
import Soap from './pages/soap';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={ <Pokemons/> } />
        <Route  path="/about" element={ <Soap/> } />
      </Routes>
    </Router>
  );
}

export default App;