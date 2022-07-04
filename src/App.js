import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SinglePokemon from "./pages/SinglePoke";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="pokemon/:name" element={<SinglePokemon />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
