import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export const SOAFooter = () => {
  const handleNavigation = () => {
    window.location.href = '/portfolio';
  };

  return (
    <Container className="px-0" style={{ maxWidth: "960px" }}>
      <footer id="soafoot">
        <Row id="SOAfooterlinks">
          <Col className="pt-3 text-center small">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a className="text-dark" href="/portfolio" onClick={handleNavigation}>
                  Company Portal
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-dark" href="/portfolio" onClick={handleNavigation}>
                  My Account
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-dark" href="/portfolio" onClick={handleNavigation}>
                  Departments
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-dark" href="/portfolio" onClick={handleNavigation}>
                  Employees
                </a>
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                COPYRIGHT &copy; DEMO COMPANY
              </li>
              <li className="list-inline-item">&bull;</li>
              <li className="list-inline-item">
                <a className="text-dark" href="/portfolio" onClick={handleNavigation}>
                  RETIREMENT AND BENEFITS
                </a>
              </li>
              <li className="list-inline-item">&bull;</li>
              <li className="list-inline-item">
                <a className="text-dark" href="/portfolio" onClick={handleNavigation}>
                  CONTACT SUPPORT
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </Container>
  );
};

export default SOAFooter;
