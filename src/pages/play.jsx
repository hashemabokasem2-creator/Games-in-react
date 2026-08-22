import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

const CARDS_DATA = [
  { id: 1, icon: "🌊", color: "#0d6efd" },
  { id: 2, icon: "🔥", color: "#fd7e14" },
  { id: 3, icon: "🌸", color: "#20c997" },
  { id: 4, icon: "🌹", color: "#dc3545" },
  { id: 5, icon: "⭐", color: "#ffc107" },
  { id: 6, icon: "🌿", color: "#198754" },
  { id: 7, icon: "💎", color: "#0dcaf0" },
  { id: 8, icon: "🍑", color: "#d63384" },
];

const COLOR_MATCH_DATA = [
  { id: "yellow", name: "Yellow", color: "#ffc107" },
  { id: "red", name: "Red", color: "#dc3545" },
  { id: "blue", name: "Blue", color: "#0d6efd" },
  { id: "green", name: "Green", color: "#198754" },
];

function Blay({ theme, accentColor, savedData, onSaveSession }) {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  const getInitialTime = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return 90;
      case "hard":
        return 35;
      case "normal":
      default:
        return 60;
    }
  };

  const [timeLeft, setTimeLeft] = useState(() =>
    getInitialTime(savedData.difficulty),
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      onSaveSession(score, "00:00");
      navigate("/leaderboard", {
        state: {
          playerData: savedData,
          finalScore: score,
        },
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const totalCardsCount =
    savedData.difficulty === "easy"
      ? 4
      : savedData.difficulty === "normal"
        ? 6
        : 8;
  const [currentLevel, setCurrentLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [isWatching, setIsWatching] = useState(true);
  const [userStep, setUserStep] = useState(0);

  const getFlashSpeed = (level) => {
    switch (level) {
      case 1:
        return 800;
      case 2:
        return 500;
      case 3:
      default:
        return 300;
    }
  };

  const startNewLevel = () => {
    const availableCards = CARDS_DATA.slice(0, totalCardsCount);
    const cardIds = availableCards.map((card) => card.id);
    const newSequence = cardIds.sort(() => Math.random() - 0.5);
    setSequence(newSequence);
    setUserStep(0);
    setIsWatching(true);
  };

  useEffect(() => {
    if (sequence.length === 0) {
      startNewLevel();
      return;
    }

    let index = 0;
    const speed = getFlashSpeed(currentLevel);
    const interval = setInterval(() => {
      if (index < sequence.length) {
        setActiveCardId(sequence[index]);
        index++;
      } else {
        clearInterval(interval);
        setActiveCardId(sequence[0]);
        setIsWatching(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [sequence, currentLevel]);

  const handleCardClick = (cardId) => {
    if (isWatching) return;

    const expectedCardId = sequence[userStep];

    if (cardId === expectedCardId) {
      const nextStep = userStep + 1;
      setUserStep(nextStep);

      if (nextStep < sequence.length) {
        setActiveCardId(sequence[nextStep]);
      } else {
        setScore((prev) => prev + 10);
        if (currentLevel < 3) {
          setCurrentLevel((prev) => prev + 1);
          startNewLevel();
        } else {
          setActiveCardId(null);
        }
      }
    } else {
      startNewLevel();
    }
  };

  const [targetWord, setTargetWord] = useState(COLOR_MATCH_DATA[0]);
  const [textColor, setTextColor] = useState(COLOR_MATCH_DATA[1]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [matchScore, setMatchScore] = useState(0);
  const [matchMistakes, setMatchMistakes] = useState(0);
  const generateNewMatchRound = () => {
    const randomWordIndex = Math.floor(Math.random() * COLOR_MATCH_DATA.length);
    const selectedWord = COLOR_MATCH_DATA[randomWordIndex];
    let availableColors = COLOR_MATCH_DATA.filter(
      (item) => item.id !== selectedWord.id,
    );
    const randomColorIndex = Math.floor(Math.random() * availableColors.length);
    const selectedColor = availableColors[randomColorIndex];
    const options = [...COLOR_MATCH_DATA].sort(() => Math.random() - 0.5);

    setTargetWord(selectedWord);
    setTextColor(selectedColor);
    setShuffledOptions(options);
  };

  useEffect(() => {
    generateNewMatchRound();
  }, []);

  const [isWon, setIsWon] = useState(false);

  const handleColorMatchClick = (selectedOptionId) => {
    if (isWon) return;

    if (selectedOptionId === targetWord.id) {
      const nextScore = matchScore + 1;
      setMatchScore(nextScore);
      const targetGoal = Number(savedData?.goal) || 10;

      if (nextScore >= targetGoal) {
        setIsWon(true);
        return;
      }
    } else {
      setMatchMistakes((prev) => prev + 1);
    }

    generateNewMatchRound();
  };

  const resetMatchGame = () => {
    setMatchScore(0);
    setMatchMistakes(0);
    setIsWon(false);
    generateNewMatchRound();
  };

  const handleEndGameManual = () => {
    onSaveSession(matchScore, formatTime(timeLeft));
    navigate("/leaderboard");
  };

  useEffect(() => {
    const handleSaveSignal = () => handleEndGameManual();

    window.addEventListener("triggerManualSave", handleSaveSignal);
    return () =>
      window.removeEventListener("triggerManualSave", handleSaveSignal);
  }, [matchScore, timeLeft]);
  return (
    <>
      <section className="py-3">
        <Container style={{ marginTop: "70px" }}>
          <Card
            className="mb-4 rounded-5 shadow-sm glassEffect"
            style={{
              backgroundColor:
                theme === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(18, 18, 18, 0.4)",
              border: `2px solid ${accentColor}`,
            }}
          >
            <Card.Body className="d-flex flex-column">
              <div
                className="pb-2 mb-3"
                style={{ borderBottom: `1px dashed ${accentColor}` }}
              >
                <h5
                  className="mb-1"
                  style={{ color: theme === "light" ? "#0b132a" : "#ffffff" }}
                >
                  Playing as <span>{savedData.name}</span>
                </h5>
              </div>
              <div className="d-flex justify-content-between  align-items-center">
                <p
                  className="mb-0"
                  style={{ color: theme === "light" ? "#6c757d" : "#cccccc" }}
                >
                  Time: {formatTime(timeLeft)}
                </p>

                <div
                  className="text-uppercase rounded-5 fw-bold text-white px-3 py-2"
                  style={{
                    fontSize: "0.75rem",
                    backgroundColor: accentColor,
                  }}
                >
                  {savedData.difficulty}
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card
            className="rounded-5 shadow-sm glassEffect p-3 mb-4"
            style={{
              backgroundColor:
                theme === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(18, 18, 18, 0.4)",
              border: `2px solid ${accentColor}`,
            }}
          >
            <Card.Body>
              <div
                className="d-flex justify-content-between align-items-center pb-2 mb-3"
                style={{ borderBottom: `1px dashed ${accentColor}` }}
              >
                <h6
                  className="fw-bold mb-0"
                  style={{ color: theme === "light" ? "#0b132a" : "#ffffff" }}
                >
                  ✨ Color Memory Master
                </h6>
                <small className="text-secondary">
                  Watch the colors flash, then click them in the same order!
                </small>
              </div>
              <Row className="g-3 justify-content-center my-3">
                {CARDS_DATA.slice(0, totalCardsCount).map((card) => {
                  const isActive = activeCardId === card.id;

                  const isHintTarget =
                    !isWatching && sequence[userStep + 1] === card.id;

                  return (
                    <Col key={card.id} xs={6} sm={3} className="text-center">
                      <div
                        onClick={() => handleCardClick(card.id)}
                        className="position-relative p-4 rounded-4 cursor-pointer transition-all d-flex justify-content-center align-items-center"
                        style={{
                          backgroundColor: isActive
                            ? card.color
                            : theme === "light"
                              ? "rgba(255, 255, 255, 0.7)"
                              : "rgba(30, 30, 35, 0.7)",
                          border: isActive
                            ? `2px solid ${card.color}`
                            : `1px solid ${accentColor}`,
                          boxShadow: isActive
                            ? `0 0 20px ${card.color}`
                            : "none",
                          cursor: isWatching ? "not-allowed" : "pointer",
                          minHeight: "100px",
                          transform: isActive ? "scale(1.03)" : "scale(1)",
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        <span style={{ fontSize: "2rem" }}>{card.icon}</span>
                        {isHintTarget && (
                          <span
                            className="position-absolute rounded-circle"
                            style={{
                              top: "8px",
                              right: "8px",
                              width: "10px",
                              height: "10px",
                              backgroundColor: "#ffffff",
                              boxShadow: "0 0 8px #ffffff",
                            }}
                          />
                        )}
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <div className="d-flex justify-content-between align-items-center mt-4 pt-2">
                <div className="small fw-semibold text-secondary">
                  Level:{" "}
                  <span style={{ color: accentColor }}>{currentLevel} / 3</span>{" "}
                  | Progress:{" "}
                  <span style={{ color: accentColor }}>
                    {userStep} / {sequence.length}
                  </span>
                </div>

                <button
                  type="button"
                  className="btn btn-sm px-3 rounded-pill fw-semibold text-white"
                  onClick={startNewLevel}
                  style={{ backgroundColor: accentColor, border: "none" }}
                >
                  {isWatching ? "Watch the sequence..." : "Reset Game"}
                </button>
              </div>
            </Card.Body>
          </Card>
          <Card
            className="rounded-4 shadow-sm glassEffect p-2 mb-4"
            style={{
              backgroundColor:
                theme === "light"
                  ? "rgba(255, 255, 255, 0.25)"
                  : "rgba(18, 18, 18, 0.35)",
              border: `1.5px solid ${accentColor}`,
            }}
          >
            <Card.Body className="p-3">
              <h6
                className="fw-bold mb-2"
                style={{ color: theme === "light" ? "#0b132a" : "#ffffff" }}
              >
                Color Match
              </h6>
              <div
                className="w-100 mb-2"
                style={{ borderBottom: "1px dashed rgba(255, 255, 255, 0.2)" }}
              />
              <p
                className="small text-secondary mb-3"
                style={{ fontSize: "0.825rem" }}
              >
                Click the <strong>actual color</strong> of the word, not what it
                says.
              </p>
              <div className="mb-3">
                <h2
                  className="fw-bold user-select-none m-0"
                  style={{
                    color: isWon ? accentColor : textColor.color,
                    fontSize: "2.2rem",
                    transition: "color 0.3s ease",
                  }}
                >
                  {isWon ? "🎉 You Won!" : targetWord.name}
                </h2>
              </div>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {shuffledOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    disabled={isWon}
                    onClick={() => handleColorMatchClick(option.id)}
                    className="btn px-3 py-1 rounded-3 fw-medium transition-all"
                    style={{
                      backgroundColor:
                        theme === "light"
                          ? "rgba(255, 255, 255, 0.6)"
                          : "rgba(30, 30, 35, 0.6)",
                      color: theme === "light" ? "#0b132a" : "#ffffff",
                      border: `1.5px solid ${accentColor}`,
                      fontSize: "0.875rem",
                      minWidth: "75px",
                      cursor: isWon ? "not-allowed" : "pointer",
                      opacity: isWon ? 0.6 : 1,
                    }}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
              <div className="d-flex align-items-center gap-3 pt-1">
                <div
                  className="small fw-semibold text-secondary"
                  style={{ fontSize: "0.85rem" }}
                >
                  Score: {matchScore} Mistakes: {matchMistakes}
                </div>

                <button
                  type="button"
                  className="btn btn-sm px-3 py-1 rounded-3 fw-medium"
                  onClick={resetMatchGame}
                  style={{
                    backgroundColor: "transparent",
                    color: accentColor,
                    border: `1.5px solid ${accentColor}`,
                    fontSize: "0.8rem",
                  }}
                >
                  Reset
                </button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </>
  );
}

export default Blay;
