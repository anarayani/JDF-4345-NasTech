import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import RsvpPopUp from "./RsvpPopUp/RsvpPopUp.jsx";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const { user, isAuthenticated } = useAuth0();
  const [event, setEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rsvpCount, setRsvpCount] = useState({ confirmed: 0, maybe: 0, no: 0 });

  useEffect(() => {
    // Fetch event details from backend
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error("Error fetching event:", err));

    // Fetch RSVP count
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/rsvps/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setRsvpCount({
          confirmed: data.statusSummary?.Confirmed || 0,
          maybe: data.statusSummary?.Maybe || 0,
          no: data.statusSummary?.No || 0,
        });
      })
      .catch((err) => console.error("Error fetching RSVP data:", err));
  }, [eventId]);

  const handleRSVP = async (response) => {
    if (!isAuthenticated) {
      alert("Please log in to RSVP.");
      return;
    }

    const rsvpData = {
      email: user.name,
      response,
      eventId: parseInt(eventId),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rsvpData),
      });

      if (res.ok) {
        alert("RSVP submitted successfully!");
        setRsvpCount((prev) => ({
          ...prev,
          [response]: prev[response] + 1,
        }));
      } else {
        alert("Failed to submit RSVP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting your RSVP.");
    }
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <img src={event.eventImage || ""} alt={event.name} className="w-full rounded-lg my-4" />
      <p className="text-gray-600">
        {new Date(event.date).toLocaleDateString()} • {event.location}
      </p>
      <p className="mt-4">{event.description}</p>

      <h3 className="mt-4 font-semibold">Event Goals</h3>
      <ul className="list-disc pl-5">
        {event.goals?.map((goal, index) => (
          <li key={index}>{goal}</li>
        ))}
      </ul>

      <h3 className="mt-6 font-semibold">RSVP Status</h3>
      <p>✅ Confirmed: {rsvpCount.confirmed}</p>
      <p>🤔 Maybe: {rsvpCount.maybe}</p>
      <p>❌ No: {rsvpCount.no}</p>

      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white p-2 rounded-lg mt-2">
        RSVP Now
      </button>

      <RsvpPopUp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onRSVP={handleRSVP} />

      <p className="mt-6">
        <strong>Donation Progress:</strong> {event.donationProgress || 0}%
      </p>
    </div>
  );
};

export default EventDetailsPage;
