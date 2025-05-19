import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home_uman";
import About from "./pages/About";
import Header from "./components/index";

function App() {
  return (
    <div className="App">
      {/* <nav>
        <Link to="/">Товари</Link> | <Link to="/about">Про нас</Link>
      </nav> */}

      <Header onClickCart={()=>{}} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
