import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Mynavbar from "./components/Mynavbar.jsx";

const bgImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80",
];

function App() {
  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("#e00000");
  const [bgIndex, setBgIndex] = useState(0);

  const handleNextBg = () => {
    if (bgIndex === bgImages.length - 1) {
      setBgIndex(0);
    } else {
      setBgIndex(bgIndex + 1);
    }
  };

  const handlePrevBg = () => {
    if (bgIndex === 0) {
      setBgIndex(bgImages.length - 1);
    } else {
      setBgIndex(bgIndex - 1);
    }
  };

  useEffect(() => {
    const overlay =
      theme === "light"
        ? "linear-gradient(rgba(255, 255, 255, 0.30), rgba(255, 255, 255, 0.30))"
        : "linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.35))";

    document.body.style.backgroundImage = `${overlay}, url(${bgImages[bgIndex]})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  }, [bgIndex, theme]);

  return (
    <>
      <Mynavbar
        theme={theme}
        setTheme={setTheme}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              theme={theme}
              accentColor={accentColor}
              handleNextBg={handleNextBg}
              handlePrevBg={handlePrevBg}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
