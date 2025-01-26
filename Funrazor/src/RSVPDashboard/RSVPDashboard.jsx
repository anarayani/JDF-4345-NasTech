import './RSVPDashboard.css'
//import { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';

function RSVPDashboard({}) {
    useEffect(() => {
        document.title = 'Event RSVPs';
      }, []);

    const { id } = useParams();
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/organizations/1/events/${id}`)
        .then(response => {
            //  if (!response.ok) {
            //      throw new Error(`HTTP error! status: ${response.status}`);
            //  } else {
                return response.json();
            //   } 
        })
        .then(data => {
            console.log(data);
            setEntry(data);
        })
        .catch(error => {
            console.error('Error fetching events', error);
        });
    }, [id]);

    if (!entry) {
        return <div>Loading...</div>;
    }

  return (
    <>
        <h3>RSVPs</h3>
        <form>
            <div id="RSVPeventName">
                <label>Event Name</label>
                <input type="text" id="RSVPeventNameInput" name="eventNameInput" required></input>
            </div>
            <div id="RSVPdate">
                <label>Date</label>
                <input type="date" id="RSVPdateInput" name="dateInput" required></input>
            </div>
            <div id="RSVPtime">
                <label>Time</label>
                <input type="time" id="RSVPtimeInput" name="timeInput" required></input>
            </div>
        </form>
        <button onClick={() => history.push('/')}>Back</button>
    </>
  );
}

export default RSVPDashboard