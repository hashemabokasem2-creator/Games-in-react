import { Card, Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer.jsx";

function Leaderboard({ recentSessions, accentColor, theme }) {
  return (
    <>
      <section style={{ marginTop: "70px" }}>
        <Container>
          <Row className="justify-content-center g-3 my-4">
            <Col xs={12} lg={5}>
              <Card
                className="rounded-4 shadow-sm glassEffect h-100"
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
                    Overall Score
                  </h6>
                  <div
                    className="w-100 mb-3"
                    style={{
                      borderBottom: "1px dashed rgba(255, 255, 255, 0.2)",
                    }}
                  />
                  <div
                    className="display-4 fw-bolder mb-2"
                    style={{ color: accentColor }}
                  >
                    {recentSessions.length > 0 ? recentSessions[0].score : 0}
                  </div>
                  <p
                    className="small text-secondary m-0"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Aggregate score (demo). Extend with per-game scoring easily.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} lg={5}>
              <Card
                className="rounded-4 shadow-sm glassEffect h-100"
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
                    Recent Sessions
                  </h6>
                  <div
                    className="w-100 mb-3"
                    style={{
                      borderBottom: "1px dashed rgba(255, 255, 255, 0.2)",
                    }}
                  />

                  <div className="d-flex flex-column gap-2">
                    {recentSessions.length > 0 ? (
                      recentSessions.map((session) => (
                        <div
                          key={session.id}
                          className="p-2 rounded-3 d-flex justify-content-between align-items-center"
                          style={{
                            backgroundColor:
                              theme === "light"
                                ? "rgba(255, 255, 255, 0.4)"
                                : "rgba(30, 30, 35, 0.5)",
                            border: `1px solid ${accentColor}44`,
                            fontSize: "0.8rem",
                          }}
                        >
                          <span className="text-secondary">{session.date}</span>
                          <span className="fw-semibold text-white">
                            Player:{" "}
                            <strong style={{ color: accentColor }}>
                              {session.playerName}
                            </strong>
                          </span>
                          <span className="text-secondary">
                            Time left: {session.timeLeft}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-secondary small text-center py-2">
                        No recent sessions found.
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer theme={theme} />
    </>
  );
}

export default Leaderboard;
