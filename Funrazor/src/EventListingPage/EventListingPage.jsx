import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventListItem from "./EventListItem";

const EventListingPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>

      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <Link to={`/events/${event.id}`} key={event.id} className="block">
              <EventListItem
                eventImage={event.eventImage || ""}
                eventName={event.name}
                eventDate={new Date(event.date).toLocaleDateString()}
                rsvps={event.rsvpResponses ? event.rsvpResponses.length : 0}
                eventDonationProgress={event.donationProgress || 0}
                eventDetails={event.description}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventListingPage;
