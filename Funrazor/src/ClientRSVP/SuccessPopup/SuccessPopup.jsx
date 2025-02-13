const SuccessPopup = ({ onClose }) => {
	return (
		<div id="success-popup">
			<p>Success! Your RSVP is complete!</p>
			<button onClick={onClose}>Done</button>
		</div>
	);
};

export default SuccessPopup;