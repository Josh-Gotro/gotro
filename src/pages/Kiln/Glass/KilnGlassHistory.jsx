import '../kiln.css';
import PropTypes from 'prop-types';

const KilnGlassHistory = ({ kilnGlassRecords }) => {
  return (
    <div>
      {kilnGlassRecords.map((record, index) => (
        <div key={index} className='glass-history-card'>
          <h2>Created At: {record.created_at}</h2>
          <h2>Glass Type: {record.glass_type}</h2>
          <h2>Mode: {record.mode}</h2>
          <h2>Firing Schedule: {record.firing_schedule}</h2>
        </div>
      ))}
    </div>
  );
};

KilnGlassHistory.propTypes = {
  kilnGlassRecords: PropTypes.array,
};

export default KilnGlassHistory;
