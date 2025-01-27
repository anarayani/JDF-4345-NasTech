import './RSVPDashboard.css'
//import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RSVPDashboard = () =>  {
    useEffect(() => {
        document.title = 'Event RSVPs';
      }, []);

    console.log(id);
    const [entry, setEntry] = useState(null);
    const { eventId } = useParams(); // Get eventId from the URL
    const [rsvps, setRsvps] = useState([]);
    const [statusSummary, setStatusSummary] = useState({});

    const statusArray = ["Confirmed", "Maybe", "No"];

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/events/${eventId}`)
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
    }, [eventId]);

    useEffect(() => {
        const fetchRSVPs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/rsvps/${eventId}`);
                const data = await response.json();
                setRsvps(data.rsvps);
                setStatusSummary(data.statusSummary);
            } catch (error) {
                console.error('Error fetching RSVPs:', error);
            }
        };

        fetchRSVPs();
    }, [eventId]);

    if (!entry) {
        return <div>Loading...</div>;
    }

  return (
    //TODO: get the real encodings for statusSummary
    <>
        <button id='rsvp_button' onClick={() => history.push('/')}>Back</button>
        <h1>Event {eventId} : {entry.name}</h1>
        <h3>RSVPs</h3>
        <table id='rsvp_stats'>
            <tr>
                <th class="yCol">Confirmed</th>
                <th class="mCol">Maybe</th>
                <th class="nCol">No</th>
            </tr>
            <tr>
                <td class="yCol">{statusSummary[0] || 0}</td>
                <td class="mCol">{statusSummary[1] || 0}</td>
                <td class="nCol">{statusSummary[2] || 0}</td>
            </tr>
        </table>
        <h3>RSVP List</h3>
        
        <table id='rsvp_list'>
            <tr id='rsvp_header'>
                <th id='name-header'>Name</th>
                <th id='email-header'>Email</th>
                <th id='status-header'>Status</th>
            </tr>
            {rsvps.map((rsvp) => (
                <tr class="rsvp-row">
                    <td>{rsvp.lname}, {rsvp.fname}</td>
                    <td>{rsvp.email}</td>
                    <td>{statusArray[rsvp.status]}</td>
                </tr>
            ))}
        </table>
    </>
  );
}

export default RSVPDashboard