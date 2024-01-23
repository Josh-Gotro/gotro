import { useFetchCeramicFirings } from '../../../useApi.js';
import './kiln.css';
import { useState } from 'react';

const KilnCeramicHistory = () => {
  const ceramicFirings = useFetchCeramicFirings();
  const [openCards, setOpenCards] = useState({}); // New state

  function convertTo12HrFormat(time) {
    let [hours, minutes] = time.split(':');
    let period = +hours < 12 ? 'AM' : 'PM';

    hours = +hours % 12 || 12; // convert "00" to "12"

    return `${hours}:${minutes} ${period}`;
  }

  const toggleCard = (index) => { // New function
    setOpenCards(prev => ({...prev, [index]: !prev[index]}));
  }

  return (
    <div>
      <h2>History</h2>
      {ceramicFirings.map((firing, index) => (
        <div key={index} className={`ceramic-history-card rating-${firing.rating}`} onClick={() => toggleCard(index)}>
          <div className="card-header">
            <h2>Created At: {new Date(firing.created_at).toLocaleDateString()}</h2>
            <h2>Cone Type: {firing.cone_type}</h2>
          </div>
          {openCards[index] && ( // Only render the following if the card is open
            <>
              <p>Room Temp: {firing.room_temp}</p>
              <div className="outer-container">
                <div className="table-notes-container">
                  <table>
                <tr>
                  <td>Low Fire Start Time:</td>
                  <td>{convertTo12HrFormat(firing.low_fire_start_time)}</td>
                </tr>
                <tr>
                  <td>Medium Fire Start Time:</td>
                  <td>{convertTo12HrFormat(firing.medium_fire_start_time)}</td>
                </tr>
                <tr>
                  <td>High Fire Start Time:</td>
                  <td>{convertTo12HrFormat(firing.high_fire_start_time)}</td>
                </tr>
                <tr>
                  <td>Kiln Turn Off Time:</td>
                  <td>{firing.kiln_turn_off_time}</td>
                </tr>
                  </table>
                </div>
                <div className="notes-container">
                  <p className="notes">Loading Notes: </p>
                  <span>{firing.loading_notes}</span>
                  <p className="notes">Unloading Notes:</p>
                  <span>{firing.unloading_notes}</span>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default KilnCeramicHistory;