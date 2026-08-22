import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";

function Home({
  theme,
  accentColor,
  handleNextBg,
  handlePrevBg,
  savedData,
  onSaveData,
}) {
  return (
    <>
      <Hero
        theme={theme}
        accentColor={accentColor}
        handleNextBg={handleNextBg}
        handlePrevBg={handlePrevBg}
        savedData={savedData}
        onSaveData={onSaveData}
      />
      <Footer theme={theme} />
    </>
  );
}

export default Home;
