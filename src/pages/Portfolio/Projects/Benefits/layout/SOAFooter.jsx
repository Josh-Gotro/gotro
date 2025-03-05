import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export const SOAFooter = () => {
  return (
    <Container className="px-0" style={{ maxWidth: "960px" }}>
      <footer id="soafoot">
        <Row id="SOAfooterlinks">
          <Col className="pt-3 text-center small">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a className="text-dark" href="https://alaska.gov/">
                  State of Alaska
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-dark" href="https://my.alaska.gov/">
                  myAlaska
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-dark" href="https://alaska.gov/akdir1.html">
                  Departments
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="text-dark"
                  href="https://alaska.gov/employeeHome.html">
                  State Employees
                </a>
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                COPYRIGHT &copy; STATE OF ALASKA
              </li>
              <li className="list-inline-item">&bull;</li>
              <li className="list-inline-item">
                <a className="text-dark" href="http://doa.alaska.gov/drb/">
                  RETIREMENT AND BENEFITS
                </a>
              </li>
              <li className="list-inline-item">&bull;</li>
              <li className="list-inline-item">
                <a className="text-dark" href="mailto:doa.drb@alaska.gov">
                  EMAIL THE WEBMASTER
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
