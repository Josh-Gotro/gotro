import PropTypes from 'prop-types';

export const RouterWrapper = ({ children }) => {
  // Just pass through the children, no Router
  return <>{children}</>;
};

RouterWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouterWrapper;
