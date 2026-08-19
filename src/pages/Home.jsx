import React from "react";
import Hero from "../components/Hero.jsx";

function Home({ theme, accentColor, handleNextBg, handlePrevBg, }) {
  return (
    <>
      <Hero
        theme={theme}
        accentColor={accentColor}
        handleNextBg={handleNextBg}
        handlePrevBg={handlePrevBg}
      />
    </>
  );
}

export default Home;
