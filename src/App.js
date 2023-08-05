import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Watchlater } from "./components/Watchlater";
import Home from "./components/Home";
import { Add } from "./components/Add";
import "./App.css";
import { GlobalProvider } from "./context/GlobalState";


function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/watchlater" element={<Watchlater />} />
          <Route exact path="/add" element={<Add />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;