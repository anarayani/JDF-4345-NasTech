import { useState } from 'react';

const ClientRSVP = ({ eventId }) => {
		const [rsvpStatus, setRsvpStatus] = useState(null);
		const [firstName, setFirstName] = useState('');
		const [lastName, setLastName] = useState('');
		const [email, setEmail] = useState('');
		const [error, setError] = useState('');
		const [success, setSuccess] = useState(false);

		const handleRsvpSubmit = async () => {
			// if (!rsvpStatus || !firstName || !lastName || !email) {
			// 	setError('Please fill out all fields and select an RSVP status.');
			// 	return;
			// }
			// try {
			// 	// Send RSVP to backend
			// 	if (//fails) {
			// 		throw new Error(`HTTP error! status: ${response.status}`);
			// 	}
			// 	setSuccess(true);
			// 	setError('');
			// } catch (error) {
			// 	setError('Server failed. Please try again.');
			// 	console.error('Error submitting RSVP:', error);
			// }
		};

		return (
			<div>
				<h2>RSVP</h2>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				<div>
					<button onClick={() => setRsvpStatus('yes')} style={{ fontWeight: rsvpStatus === 'yes' ? 'bold' : 'normal' }}>Yes</button>
					<button onClick={() => setRsvpStatus('no')} style={{ fontWeight: rsvpStatus === 'no' ? 'bold' : 'normal' }}>No</button>
					<button onClick={() => setRsvpStatus('maybe')} style={{ fontWeight: rsvpStatus === 'maybe' ? 'bold' : 'normal' }}>Maybe</button>
				</div>
				<input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
				<input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
				<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<button onClick={handleRsvpSubmit}>Confirm</button>
				<button onClick={() => {/* Close the RSVP popup */}}>Cancel</button>

				{success && <SuccessPopup onClose={() => setSuccess(false)} />}
			</div>
		);
};

export default ClientRSVP;