import { useFetchCeramicFirings } from '../../../useApi.js';
import './kiln.css';

const KilnCeramicHistory = () => {
  const ceramicFirings = useFetchCeramicFirings();

  return (
    <div>
      <h1>Kiln Ceramic History</h1>
      {ceramicFirings.map((firing, index) => (
        <div key={index} className={`ceramic-history-card rating-${firing.rating}`}>
          <div className="card-header">
            <h2>Created At: {new Date(firing.created_at).toLocaleDateString()}</h2>
            <h2>Cone Type: {firing.cone_type}</h2>
          </div>
          <table>
            <tr>
              <td>Low Fire Start Time:</td>
              <td>{firing.low_fire_start_time}</td>
            </tr>
            <tr>
              <td>Medium Fire Start Time:</td>
              <td>{firing.medium_fire_start_time}</td>
            </tr>
            <tr>
              <td>High Fire Start Time:</td>
              <td>{firing.high_fire_start_time}</td>
            </tr>
            <tr>
              <td>Kiln Turn Off Time:</td>
              <td>{firing.kiln_turn_off_time}</td>
            </tr>
          </table>
          <p>Room Temp: {firing.room_temp}</p>
          <p className="notes">Loading Notes: {firing.loading_notes}</p>
          <p className="notes">Unloading Notes: {firing.unloading_notes}</p>
        </div>
      ))}
    </div>
  );
}

export default KilnCeramicHistory;