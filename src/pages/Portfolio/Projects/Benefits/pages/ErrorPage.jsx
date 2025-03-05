import React from "react";
import PropTypes from "prop-types";

const ErrorPage = ({ title, message, link }) => {
  return (
    <div>
      <h2>{title}</h2>
      {message && Array.isArray(message) ? (
        message.map((m, idx) => <p key={idx}>{m}</p>)
      ) : (
        <p>{message}</p>
      )}
      {link && <button to={link.to}>{link.title}</button>}
    </div>
  );
};

ErrorPage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  link: PropTypes.shape({
    to: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default ErrorPage;
