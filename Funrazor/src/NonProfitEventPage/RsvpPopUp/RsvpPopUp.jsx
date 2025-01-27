import { useState } from 'react'

function RsvpPopUp({ isOpen, onClose, onRSVP }) {
    const [response, setResponse] = useState('');

    const handleRSVP = () => {
        if (response) {
            onRSVP(response);
            onClose();
        } else {
            alert('RSVP!');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>RSVP for the event</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="Yes"
                            checked={response === 'Yes'}
                            onChange={() => setResponse('Yes')}
                        />
                        Yes
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="No"
                            checked={response === 'No'}
                            onChange={() => setResponse('No')}
                        />
                        No
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="Maybe"
                            checked={response === 'Maybe'}
                            onChange={() => setResponse('Maybe')}
                        />
                        Maybe
                    </label>
                </div>
                <button onClick={handleRSVP}>Submit</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default RsvpPopUp;