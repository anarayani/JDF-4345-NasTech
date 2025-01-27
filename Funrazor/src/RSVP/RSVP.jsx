function getInvitationTemplate(eventDetails) {
    const { eventName, eventDate, eventTime, eventLocation, rsvpLink } = eventDetails;
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                }
                .header {
                    text-align: center;
                    background-color: #f4f4f4;
                    padding: 10px 0;
                    border-bottom: 1px solid #ddd;
                }
                .content {
                    padding: 20px;
                }
                .button {
                    display: block;
                    text-align: center;
                    margin: 20px 0;
                }
                a {
                    background-color: #007BFF;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                }
                a:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>${eventName}</h2>
                </div>
                <div class="content">
                    <p>You're invited to an exciting event! Here are the details:</p>
                    <ul>
                        <li><strong>Date:</strong> ${eventDate}</li>
                        <li><strong>Time:</strong> ${eventTime}</li>
                        <li><strong>Location:</strong> ${eventLocation}</li>
                    </ul>
                    <p>We would love to have you there. Please RSVP using the button below:</p>
                    <div class="button">
                        <a href="${rsvpLink}" target="_blank">RSVP Now</a>
                    </div>
                </div>
                <footer style="text-align: center; padding-top: 10px; color: #888;">
                    <p>&copy; 2025 RSVP System. All rights reserved.</p>
                </footer>
            </div>
        </body>
        </html>
    `;
}

function getConfirmationTemplate(guestDetails, eventDetails) {
    const { guestName } = guestDetails;
    const { eventName, eventDate, eventTime, eventLocation } = eventDetails;

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                }
                .header {
                    text-align: center;
                    background-color: #f4f4f4;
                    padding: 10px 0;
                    border-bottom: 1px solid #ddd;
                }
                .content {
                    padding: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Thank You for RSVPing!</h2>
                </div>
                <div class="content">
                    <p>Hi ${guestName},</p>
                    <p>Thank you for confirming your attendance to the following event:</p>
                    <ul>
                        <li><strong>Event:</strong> ${eventName}</li>
                        <li><strong>Date:</strong> ${eventDate}</li>
                        <li><strong>Time:</strong> ${eventTime}</li>
                        <li><strong>Location:</strong> ${eventLocation}</li>
                    </ul>
                    <p>We can't wait to see you there!</p>
                    <p>If you have any questions or need to make changes to your RSVP, please contact us.</p>
                </div>
                <footer style="text-align: center; padding-top: 10px; color: #888;">
                    <p>&copy; 2025 RSVP System. All rights reserved.</p>
                </footer>
            </div>
        </body>
        </html>
    `;
}
