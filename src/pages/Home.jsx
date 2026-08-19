import React from "react";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";

function Home({ theme, accentColor, handleNextBg, handlePrevBg, }) {
  return (
    <>
      <Hero
        theme={theme}
        accentColor={accentColor}
        handleNextBg={handleNextBg}
        handlePrevBg={handlePrevBg}
      />
      <Footer theme={theme} />
    </>
  );
}

export default Home;
