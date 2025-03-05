import PropTypes from 'prop-types';

const Tree = ({ onMouseEnter, onMouseLeave, onClick }) => {
  const branches = Array.from({ length: 13 }, (_, i) => {
    const rotation = -60 + i * 10;
    return (
      <div
        key={i}
        className="branch"
        style={{ transform: `rotate(${rotation}deg)` }}
        onMouseEnter={(event) => {
          event.stopPropagation();
          onMouseEnter(event, 'PORTFOLIO');
        }}
        onMouseLeave={(event) => {
          event.stopPropagation();
          onMouseLeave(event);
        }}
        onClick={onClick}
      ></div>
    );
  });

  return (
    <div className="tree-container">
      <div
        className="tree"
        onMouseEnter={(event) => onMouseEnter(event, 'PORTFOLIO ')}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {branches}
      </div>
    </div>
  );
};

Tree.propTypes = {
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tree;
