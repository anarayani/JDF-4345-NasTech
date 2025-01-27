import {useState} from 'react';
import RsvpPopUp from "./RsvpPopUp/RsvpPopUp.jsx";
import { useAuth0 } from '@auth0/auth0-react'

function NonProfitEventPage( {event} ) {
	const { user, isAuthenticated } = useAuth0();
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

	function closeRsvp(){
		setIsModalOpen(false);
	}

	const onRSVP = async (response) => {
		const rsvpData = {
			email: user.name,
			response,
			eventId: event.id,
		};
	
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/rsvp`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(rsvpData),
			});
	
			if (res.ok) {
				const result = await res.json();
				alert('RSVP submitted successfully!');
			} else {
				const error = await res.json();
				console.error(error.message);
				alert('Failed to submit RSVP. Please try again.');
			}
		} catch (err) {
			console.error(err);
			alert('An error occurred while submitting your RSVP.');
		}
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
					onRSVP={onRSVP}
				/>
				<p><strong>Donation Progress:</strong> {event.donationProgress || 0}%</p>
			</div>
		);
}

export default NonProfitEventPage;
