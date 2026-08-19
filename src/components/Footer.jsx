import React from "react";
import { Container } from "react-bootstrap";
import "./Footer.css";

function Footer({theme}) {
  return (
    <>
      <footer className="footerWrapper">
        <Container className="text-center py-3">
          <p
            className="copyrightText"
            style={{ color: theme === "light" ? "#0b132a" : "#ffffff" }}
          >
            © 2025 Alaa Eldin Alhallak
          </p>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
