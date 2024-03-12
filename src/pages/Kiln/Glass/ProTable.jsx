import PropTypes from 'prop-types';

const ProTable = ({ firingSchedule }) => {
  console.log(firingSchedule);
  return (
    <>
      {firingSchedule.name && <h2>{firingSchedule.name}</h2>}
      {firingSchedule.slot && <p> Slot: {firingSchedule.slot}</p>}
      {firingSchedule.skip && <p> Slot: {firingSchedule.skip}</p>}

      <table>
        <thead>
          <tr>
            <th>Segment</th>
            <th>Ramp</th>
            <th>Temp</th>
            <th>Hold</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: firingSchedule.segs }, (_, i) => {
            const rate_temp_hr_m =
              firingSchedule[`rate_temp_hr_m_${i + 1}`] || [];
            const ramp = rate_temp_hr_m[0] || '';
            const temp = rate_temp_hr_m[1] || '';
            const holdHrs = rate_temp_hr_m[2];
            const holdMin = rate_temp_hr_m[3];
            const holdParts = [];
            if (holdHrs) {
              holdParts.push(`${holdHrs} Hrs`);
            }
            if (holdMin) {
              holdParts.push(`${holdMin} Min`);
            }
            const hold = holdParts.join('  ');
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{ramp}</td>
                <td>{temp}</td>
                <td>{hold}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

ProTable.propTypes = {
  firingSchedule: PropTypes.object,
};

export default ProTable;
