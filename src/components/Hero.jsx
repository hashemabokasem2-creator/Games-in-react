import { useState } from "react";
import {
  BsArrowLeft,
  BsArrowRight,
  BsChevronDown,
  BsCaretUpFill,
  BsCaretDownFill,
} from "react-icons/bs";
import {
  Container,
  Row,
  Form,
  Col,
  Card,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "./Hero.css";

function Hero({
  theme,
  accentColor,
  handleNextBg,
  handlePrevBg,
  savedData,
  onSaveData,
}) {
  const [formData, setFormData] = useState({
    name: savedData.name,
    difficulty: savedData.difficulty,
    goal: savedData.goal,
  });

  const handleSave = () => {
    const newName = formData.name.trim() !== "" ? formData.name : "Guest";
    const isDataChanged =
      newName !== savedData.name ||
      formData.difficulty !== savedData.difficulty ||
      Number(formData.goal) !== Number(savedData.goal);
    if (!isDataChanged) return;
    const updatedData = {
      name: newName,
      difficulty: formData.difficulty,
      goal: formData.goal,
    };

    onSaveData(updatedData);

    setShowToast(false);
    setTimeout(() => {
      setShowToast(true);
    }, 50);
  };

  const handleIncrement = () => {
    setFormData((prev) => ({
      ...prev,
      goal: prev.goal + 1,
    }));
  };

  const handleDecrement = () => {
    setFormData((prev) => ({
      ...prev,
      goal: prev.goal > 0 ? prev.goal - 1 : 0,
    }));
  };

  const [showToast, setShowToast] = useState(false);

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
                  Hello, {savedData.name}! 👋
                </h3>
                <p className="small text-secondary mb-1">
                  Difficulty: {savedData.difficulty} · Focus Goal:{" "}
                  {savedData.goal} mins
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
                          value={formData.name}
                          className="customInput"
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
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
                            value={formData.difficulty}
                            className="customInput customSelect"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                difficulty: e.target.value,
                              })
                            }
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
                            value={formData.goal}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                goal: Number(e.target.value),
                              })
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
                    onClick={handleSave}
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
      <ToastContainer position="bottom-end" className="p-3 style-toast">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          style={{
            backgroundColor: theme === "light" ? "#ffffff" : "#121212",
            color: theme === "light" ? "#0b132a" : "#ffffff",
            border: `2px solid ${accentColor}`,
          }}
        >
          <Toast.Body className="d-flex align-items-center justify-content-between fw-semibold">
            <span>Data saved successfully!</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Hero;
