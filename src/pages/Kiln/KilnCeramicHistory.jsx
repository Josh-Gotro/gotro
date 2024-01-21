import { useFetchCeramicFirings } from '../../../useApi.js';

const KilnCeramicHistory = () => {
  const ceramicFirings = useFetchCeramicFirings();

  return (
    <div>
      <h1>Kiln Ceramic History</h1>
      {ceramicFirings.map((firing, index) => (
        <div key={index} className="card">
          <p>Created At: {new Date(firing.created_at).toLocaleDateString()}</p>
          <p>Room Temp: {firing.room_temp}</p>
          <p>Low Fire Start Time: {firing.low_fire_start_time}</p>
          <p>Medium Fire Start Time: {firing.medium_fire_start_time}</p>
          <p>High Fire Start Time: {firing.high_fire_start_time}</p>
          <p>Kiln Turn Off Time: {firing.kiln_turn_off_time}</p>
          <p>Loading Notes: {firing.loading_notes}</p>
          <p>Unloading Notes: {firing.unloading_notes}</p>
          <p>Firing Complete: {firing.firing_complete ? 'Yes' : 'No'}</p>
          <p>Rating: {firing.rating}</p>
          <p>Cone Type: {firing.cone_type}</p>
        </div>
      ))}
    </div>
  );
}

export default KilnCeramicHistory;