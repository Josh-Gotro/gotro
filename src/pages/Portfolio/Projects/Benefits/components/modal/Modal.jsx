import React from "react";
import { Modal as BootstrapModal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const Modal = ({
  show,
  onClose,
  children,
  buttonAction,
  secondaryButtonAction = null,
  secondaryButtonLabel = null,
  secondaryButtonLoading = false,
  actionButtonLabel,
  closeButtonLabel,
  title,
  buttonExplainer,
}) => (
  <BootstrapModal show={show} onHide={onClose} size="lg" centered>
    <BootstrapModal.Header closeButton>
      <BootstrapModal.Title>{title}</BootstrapModal.Title>
    </BootstrapModal.Header>
    <BootstrapModal.Body>{children}</BootstrapModal.Body>
    <BootstrapModal.Footer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}>
        <div>
          <Button
            variant="secondary"
            onClick={onClose}
            style={{ marginRight: "20px" }}>
            {closeButtonLabel || "Close"}
          </Button>
          <Button variant="primary" onClick={buttonAction}>
            {actionButtonLabel || "Confirm"}
          </Button>
          {secondaryButtonAction && (
            <Button
              variant="primary"
              disabled={secondaryButtonLoading}
              onClick={secondaryButtonAction}
              style={{ marginLeft: "20px" }}>
              {secondaryButtonLoading
                ? "Loading"
                : secondaryButtonLabel || "Refresh"}
            </Button>
          )}
        </div>
        <p
          style={{
            marginTop: "10px",
            fontStyle: "italic",
            textAlign: "center",
          }}>
          {buttonExplainer}
        </p>
      </div>
    </BootstrapModal.Footer>
  </BootstrapModal>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  buttonAction: PropTypes.func,
  actionButtonLabel: PropTypes.string,
  closeButtonLabel: PropTypes.string,
  title: PropTypes.string,
  buttonExplainer: PropTypes.string,
};

export default Modal;
