import {useState} from 'react';
import RsvpPopUp from "./RsvpPopUp/RsvpPopUp.jsx";

function NonProfitEventPage( {event} ) {
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
	function closeRsvp(){
		setIsModalOpen(false);
		RsvpPopUp.close()
	}
	return (
			<div className="non-profit-event-page">
				<h1>{event.name}</h1>
				<img src={event.eventImage || ''} alt={event.name} className="event-image"/>
				<div>Date: {new Date(event.date).toLocaleDateString()}</div>
				<div>Details: {event.description}</div>
				<p><strong>RSVPs:</strong> {event.rsvps || 0}</p>
				<div>
					<button onClick={() => setIsModalOpen(true)}>RSVP</button>
				</div>

				<RsvpPopUp
					isOpen={isModalOpen}
					onClose={() => closeRsvp()}
				/>
				<p><strong>Donation Progress:</strong> {event.donationProgress || 0}%</p>
			</div>
		);
}

export default NonProfitEventPage;
