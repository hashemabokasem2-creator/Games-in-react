import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

function Blay({ theme, accentColor, savedData }) {
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

  // useEffect(() => {
  //   if (timeLeft <= 0) {
  //     navigate("/leaderboard", {
  //       state: {
  //         playerData: savedData,
  //         finalScore: score,
  //       },
  //     });
  //     return;
  //   }

  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [timeLeft, navigate, savedData, score]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
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
        </Container>
      </section>
    </>
  );
}

export default Blay;
