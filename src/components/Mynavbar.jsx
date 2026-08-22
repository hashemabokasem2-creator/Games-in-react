import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Mynavbar.css";

function Mynavbar({ theme, setTheme, accentColor, setAccentColor }) {
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Navbar
        fixed="top"
        className="customNavbar glassEffect my-3 mx-3 px-3"
        style={{
          backgroundColor:
            theme === "light"
              ? "rgba(255, 255, 255, 0.4)"
              : "rgba(18, 18, 18, 0.4)",
          borderBottom: `3px solid ${accentColor}`,
        }}
      >
        <Container fluid className="d-flex align-items-center p-0">
          <div className="avatar" style={{ backgroundColor: accentColor }}>
            AE
          </div>

          <div className="flex-grow-1 d-none d-md-flex flex-column align-items-start ms-3">
            <h1
              className="title"
              style={{ color: theme === "light" ? "#0b132a" : "#ffffff" }}
            >
              Alaa Eldin Alhallak
            </h1>
            <p
              className="subtitle"
              style={{ color: theme === "light" ? "#6c757d" : "#cccccc" }}
            >
              React Advanced Hooks - Games - Router - LocalStorage
            </p>
          </div>
          <Nav className="ms-auto d-flex align-items-center gap-2 me-3">
            <Nav.Link
              as={Link}
              to="/"
              className={`navBtn ${theme === "light" ? "lightNavBtn" : "darkNavBtn"}`}
              style={{
                color: theme === "light" ? "#0b132a" : "#ffffff",
                border:
                  theme === "light"
                    ? "1px solid rgba(0, 0, 0, 0.12)"
                    : "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/play"
              className={`navBtn ${theme === "light" ? "lightNavBtn" : "darkNavBtn"}`}
              style={{
                color: theme === "light" ? "#0b132a" : "#ffffff",
                border:
                  theme === "light"
                    ? "1px solid rgba(0, 0, 0, 0.12)"
                    : "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Play
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/leaderboard"
              className={`navBtn ${theme === "light" ? "lightNavBtn" : "darkNavBtn"}`}
              style={{
                color: theme === "light" ? "#0b132a" : "#ffffff",
                border:
                  theme === "light"
                    ? "1px solid rgba(0, 0, 0, 0.12)"
                    : "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Leaderboard
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            <Button
              className="switchBtn"
              onClick={toggleTheme}
              style={{ backgroundColor: accentColor, borderColor: accentColor }}
            >
              {theme === "light" ? "Dark" : "Light"}
            </Button>

            <input
              type="color"
              className="colorPicker"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
            />
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Mynavbar;
