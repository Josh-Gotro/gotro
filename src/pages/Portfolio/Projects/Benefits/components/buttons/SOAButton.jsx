import React from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

import "./soa-button.scss";

const SOAButton = ({
  primary,
  secondary,
  tertiary,
  quaternary,
  outline,
  outlineLight,
  disabled,
  lg,
  sm,
  text,
  onClick,
  width,
}) => {
  let variant = primary
    ? "primary"
    : secondary
      ? "secondary"
      : tertiary
        ? "tertiary"
        : quaternary
          ? "quaternary"
          : outline
            ? "outline"
            : outlineLight
              ? "outline-secondary"
              : "default";
  let size = lg ? "lg" : sm ? "sm" : null;

  return (
    <>
      <Button
        disabled={disabled}
        onClick={onClick}
        size={size}
        style={{ width: width }}
        variant={variant}>
        {text}
      </Button>
    </>
  );
};

SOAButton.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  quaternary: PropTypes.bool,
  outline: PropTypes.bool,
  outlineLight: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  lg: PropTypes.bool,
  sm: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.string,
};

export default SOAButton;
