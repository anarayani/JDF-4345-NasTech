import './NonProfitHome.css'
import CreateEvent from '../CreateEvent/CreateEvent'
import EventListItem from "../EventListItem/EventListItem.jsx"
import RSVPDashboard from "../RSVPDashboard/RSVPDashboard.jsx";

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import NonProfitEventPage from "../NonProfitEventPage/NonProfitEventPage.jsx";

function NonProfitHome( {orgId} ) {
    const { user, isAuthenticated } = useAuth0();
    const [events, setEvents] = useState([]);
    const [created, setCreated] = useState(false);
    const [toggleEvents, setToggleEvents] = useState(true); // Toggle between current and past events
    const [organization, setOrganization] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        if (isAuthenticated) {
            fetchEvents();
            fetchOrganization();
        }
    }, [isAuthenticated, created]);

    

    /*
    Fetches admin's organization using GET
    */
    const fetchOrganization = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/organizations/${orgId}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setOrganization(data);
        })
        .catch(error => {
            console.error('Error fetching organization', error);
        });
    }

    /*
    Fetches events from organization using GET
    */
    const fetchEvents = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/organizations/${orgId}/events`)
        .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             } else {
                return response.json();
              }
        })
        .then(data => {
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
        document.title = organization.name;
    }, []);

    const today = new Date();
    const currEvents = events.filter(event => new Date(event.date) >= today);
    const pastEvents = events.filter(event => new Date(event.date) < today);
    const filteredEvents = toggleEvents ? currEvents : pastEvents;
    const totalPages = Math.ceil(filteredEvents.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const selectedEvents = filteredEvents.slice(startIndex, startIndex + postsPerPage);
    return (
        isAuthenticated && (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <p>
                            {JSON.stringify(user.name)}
                        </p>
                        <div id="non-profit-header">
                            <p id="non-profit-name">{organization.name}</p>
                            <p id="non-profit-details">{organization.description || 'This non-profit is the best one'}</p>
                            <img src={organization.image || ''} alt="NonProfitImage" id="non-profit-image"/>
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
                                      className={`segmented ${toggleEvents ? 'curr' : ''}`} // Is .curr when active for css
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
                            {selectedEvents.map((event, index) => (
                                <Link to={`/events/${event.id}`} key={index} style={{textDecoration: 'none'}}>
                                    <EventListItem
                                    eventImage={event.eventImage || ''}
                                    eventName={event.name}
                                    rsvps={event.rsvps || 0}
                                    eventDate={event.date}
                                    eventDetails={event.description}
                                    eventDonationProgress={event.donationProgress || 0}
                                    />
                                </Link>
                            ))}
                        </div>
                        <div id="pagination-controls">
                            <button id="pagination-buttons" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                            <span> Page {currentPage} of {totalPages} </span>
                            <button id="pagination-buttons" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                        </div>
                    </Route>
                    <Route path='/create-event'>
                        <CreateEvent updateEvents={updateEvents} orgId={orgId}></CreateEvent>
                    </Route>

                    <Route
                      path='/events/:eventId'
                      render={({ match }) => {
                          const { eventId } = match.params;
                          const selectedEvent = events.find(event => String(event.id) === eventId);
                          return <NonProfitEventPage event={selectedEvent} />;
                      }}
                    />
                </Switch>
            </Router>
        )
    );
}

export default NonProfitHome