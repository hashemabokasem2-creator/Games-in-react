import React, { useState } from "react";
import {
  BsArrowLeft,
  BsArrowRight,
  BsChevronDown,
  BsCaretUpFill,
  BsCaretDownFill,
} from "react-icons/bs";
import { Container, Row, Form, Col, Card, Button } from "react-bootstrap";
import "./Hero.css";

function Hero({ theme, accentColor, handleNextBg, handlePrevBg }) {
  const [goal, setGoal] = useState(10);

  const handleIncrement = () => {
    setGoal((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setGoal((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <>
      <Container style={{ marginTop: "75px" }}>
        <Row className="justify-content-center align-items-center min-vh-50">
          <Col lg={5} className="text-center p-3">
            <Card
              className="welcomeCard glassEffect"
              style={{
                backgroundColor:
                  theme === "light"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(18, 18, 18, 0.4)",
                border: `2px solid ${accentColor}`,
              }}
            >
              <Card.Body className="p-4 text-start">
                <div
                  className="pb-2 mb-3"
                  style={{ borderBottom: `1px dashed ${accentColor}` }}
                >
                  <span
                    className="fw-bold fs-6"
                    style={{ color: theme === "light" ? "#0b132a" : "#ffffff" }}
                  >
                    Welcome
                  </span>
                </div>
                <h3
                  className="fw-bold mb-2 d-flex align-items-center gap-2"
                  style={{ color: theme === "light" ? "#0b132a" : "#ffffff" }}
                >
                  Hello, Guest! 👋
                </h3>
                <p className="small text-secondary mb-1">
                  Difficulty: normal · Focus Goal: 10 mins
                </p>
                <p className="fst-italic small text-secondary mb-3">
                  Stay sharp. Keep practicing. — Unknown
                </p>
                <div className="d-flex gap-2">
                  <Button
                    className="actionBtn d-flex align-items-center gap-1"
                    onClick={handlePrevBg}
                    style={{
                      backgroundColor: accentColor,
                      borderColor: accentColor,
                    }}
                  >
                    <BsArrowLeft /> Background
                  </Button>

                  <Button
                    className="actionBtn d-flex align-items-center gap-1"
                    onClick={handleNextBg}
                    style={{
                      backgroundColor: accentColor,
                      borderColor: accentColor,
                    }}
                  >
                    Background <BsArrowRight />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5} className="text-center p-3">
            <Card
              className="welcomeCard glassEffect"
              style={{
                backgroundColor:
                  theme === "light"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(18, 18, 18, 0.4)",
                border: `2px solid ${accentColor}`,
              }}
            >
              <Card.Body className="p-4 text-start">
                <div
                  className="pb-2 mb-3"
                  style={{ borderBottom: `1px dashed ${accentColor}` }}
                >
                  <span
                    className="fw-bold fs-6"
                    style={{ color: theme === "light" ? "#0b132a" : "#ffffff" }}
                  >
                    Profile & Settings
                  </span>
                </div>
                <Form>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="formName">
                        <Form.Label
                          className="customLabel"
                          style={{
                            color: theme === "light" ? "#0b132a" : "#ffffff",
                          }}
                        >
                          Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue="Guest"
                          className="customInput"
                          style={{
                            backgroundColor:
                              theme === "light" ? "#ffffff" : "#080d1d",
                            color: theme === "light" ? "#0d0e0f" : "#edeaea",
                            border: `1px solid ${accentColor}`,
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formDifficulty">
                        <Form.Label
                          className="customLabel"
                          style={{
                            color: theme === "light" ? "#0b132a" : "#ffffff",
                          }}
                        >
                          Difficulty
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Select
                            defaultValue="normal"
                            className="customInput customSelect"
                            style={{
                              backgroundColor:
                                theme === "light" ? "#ffffff" : "#080d1d",
                              color: theme === "light" ? "#0d0e0f" : "#edeaea",
                              border: `1px solid ${accentColor}`,
                            }}
                          >
                            <option value="easy">easy</option>
                            <option value="normal">normal</option>
                            <option value="hard">hard</option>
                          </Form.Select>
                          <BsChevronDown
                            className="selectIcon"
                            style={{
                              color: theme === "light" ? "#0d0e0f" : "#edeaea",
                            }}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formGoal">
                        <Form.Label
                          className="customLabel"
                          style={{
                            color: theme === "light" ? "#0b132a" : "#ffffff",
                          }}
                        >
                          Daily Focus Goal (mins)
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type="number"
                            value={goal}
                            onChange={(e) =>
                              setGoal(Math.max(0, Number(e.target.value)))
                            }
                            className="customInput"
                            style={{
                              backgroundColor:
                                theme === "light" ? "#ffffff" : "#080d1d",
                              color: theme === "light" ? "#0d0e0f" : "#edeaea",
                              border: `1px solid ${accentColor}`,
                            }}
                          />
                          <div className="customSpinners">
                            <BsCaretUpFill
                              className="spinnerIcon"
                              onClick={handleIncrement}
                              onMouseDown={(e) => e.preventDefault()}
                              style={{
                                color:
                                  theme === "light" ? "#0d0e0f" : "#edeaea",
                              }}
                            />
                            <BsCaretDownFill
                              className="spinnerIcon"
                              onClick={handleDecrement}
                              onMouseDown={(e) => e.preventDefault()}
                              style={{
                                color:
                                  theme === "light" ? "#0d0e0f" : "#edeaea",
                              }}
                            />
                          </div>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    type="button"
                    className="saveBtn mt-3"
                    style={{
                      backgroundColor: accentColor,
                      borderColor: accentColor,
                    }}
                  >
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Hero;
