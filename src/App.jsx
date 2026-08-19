import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Mynavbar from "./components/Mynavbar.jsx";

function App() {
  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("#e00000");

  return (
    <>
      <Mynavbar theme={theme} setTheme={setTheme} accentColor={accentColor} setAccentColor={setAccentColor}/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
