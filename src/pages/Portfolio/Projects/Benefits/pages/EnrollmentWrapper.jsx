import React, { Suspense } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import SideBar from "@/components/dashboard/side-bar/SideBar";
import { StaticSiteDataContextProvider } from "@/config/StaticSiteDataContext";
import { SubscriberContextProvider } from "@/config/SubscriberContext";

import EnrollmentRoutes from "./EnrollmentRoutes";
import { LoadingBear } from "../components/loading-provider/LoadingProvider";
import DRBWrapper from "../layout/DRBWrapper";

import "@scss/styles.scss";

export const EnrollmentWrapper = () => {
  return (
    <DRBWrapper>
      <SubscriberContextProvider>
        <StaticSiteDataContextProvider>
          <Container fluid>
            <Row>
              <Col className="column-left d-none d-md-block" md={2}>
                <SideBar />
              </Col>
              <Col className="column-right col">
                <Suspense fallback={<LoadingBear />}>
                  <EnrollmentRoutes />
                </Suspense>
              </Col>
            </Row>
          </Container>
        </StaticSiteDataContextProvider>
      </SubscriberContextProvider>
    </DRBWrapper>
  );
};

export default EnrollmentWrapper;
