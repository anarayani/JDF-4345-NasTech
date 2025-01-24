import './NonProfitHome.css'
import CreateEvent from '../CreateEvent/CreateEvent'
import EventListItem from "../EventListItem/EventListItem.jsx"
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

function NonProfitHome() {
    const { user, isAuthenticated } = useAuth0();
    const [events, setEvents] = useState([]);
    const [created, setCreated] = useState(false);
    const [toggleEvents, setToggleEvents] = useState(true); // Toggle between current and past events

    useEffect(() => {
        fetchEvents();
    }, [created]);

    //Populate from backend
    const dummyEventData = [
        {
            eventImage: '',
            eventName: 'Awesome Event',
            rsvps: 150,
            eventDate: '2025-12-01',
            eventDetails: 'Join us for awesome event!',
            eventDonationProgress: 75,
        },
        {
            eventImage: '',
            eventName: 'Super Cool Event',
            rsvps: 300,
            eventDate: '2025-11-20',
            eventDetails: 'Come check out how super cool this event is!',
            eventDonationProgress: 50,
        },
        {
            eventImage: '',
            eventName: 'Old Event',
            rsvps: 150,
            eventDate: '2024-12-01',
            eventDetails: 'Join us for awesome event!',
            eventDonationProgress: 20,
        },
    ];

    /*
    Fetches events from organization 1 using GET
    */
    const fetchEvents = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/organizations/1/events`)
        .then(response => {
            //  if (!response.ok) {
            //      throw new Error(`HTTP error! status: ${response.status}`);
            //  } else {
                return response.json();
            //   }
        })
        .then(data => {
            console.log(data);
            setEvents(data);
        })
        .catch(error => {
            console.error('Error fetching events', error);
        });
    }

    const updateEvents = () => {
        setCreated(!created);
    }
    useEffect(() => {
        document.title = 'Best Non-Profit Event Page';
      }, []);

    const today = new Date();
    const currEvents = dummyEventData.concat(events).filter(event => new Date(event.eventDate || event.date) >= today);
    const pastEvents = dummyEventData.concat(events).filter(event => new Date(event.eventDate || event.date) < today);

    return (
        isAuthenticated && (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <p>
                            {JSON.stringify(user.name)}
                        </p>
                        <p>
                            <div id="non-profit-header">
                                <p id="non-profit-name">Best Non-Profit</p>
                                <p id="non-profit-details">This non-profit is the best one</p>
                                <img src="" alt="NonProfitImage" id="non-profit-image"/>
                            </div>
                            <div id="event-buttons">
                                <div id="create-event-button">
                                    <Link to='/create-event'>
                                        <button>+ Create Event</button>
                                    </Link>
                                </div>
                                <div id="event-filter">
                                    <div id="segmented-button">
                                        <button
                                        className={`segmented ${toggleEvents ? 'curr' : ''}`} //Is .curr when active for css
                                        onClick={() => setToggleEvents(true)}
                                        >
                                            Current
                                        </button>
                                        <button
                                        className={`segmented ${!toggleEvents ? 'curr' : ''}`}
                                        onClick={() => setToggleEvents(false)}
                                        >
                                            Old
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div id="event-list">
                                {(toggleEvents ? currEvents : pastEvents).map((event, index) => (
                                <EventListItem
                                    key={index}
                                    eventImage={event.eventImage}
                                    eventName={event.eventName || event.name}
                                    rsvps={event.rsvps || 0}
                                    eventDate={event.eventDate || event.date}
                                    eventDetails={event.eventDetails || event.description}
                                    eventDonationProgress={event.eventDonationProgress || 0}
                                />
                                ))}
                            </div>
                        </p>
                    </Route>
                    <Route path='/create-event'>
                        <CreateEvent updateEvents={updateEvents}></CreateEvent>
                    </Route>
                </Switch>
            </Router>
        )
    )
}

export default NonProfitHome