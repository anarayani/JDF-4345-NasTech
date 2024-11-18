# JDF-4345-NasTech

# FUNRAZOR

**FUNRAZOR** is a React-based application designed to streamline event creation and management for non-profit organizations. This project includes functionality for creating events, selecting locations (states and cities), and displaying a list of events, providing a starting point for further development.

---

## Release Notes

### Version 0.0.0

#### Features
- **Event Creation Form**:
  - Fields for event name, date, time, state, city, and description.
  - Dynamic suggestions for states and cities based on user input using external API (`countrystatecity.in`).
  - Cascading logic to enable city selection only after a state is selected.
  - Event added to database when form is submitted.
- **Event List Display**:
  - Displays the list of events belonging to organization with basic details like name, date, RSVPs, and donation progress.
- **Routing**:
  - Integrated `react-router-dom` for navigation between the home page and the event creation form.

#### Bug Fixes
- No bug fixes were included in this version since this is the initial release.

#### Known Issues
- **State and City API Dependence**: Application depends on an external API with an access key that may have rate limits or expiration issues.
- **Event Image Placeholder**: Dummy event data includes a placeholder for event images that are not yet implemented.
- **CSS Styling Improvements**: Basic styling is applied, but additional refinement and responsive design improvements are needed.

---

## Technology Stack

- **Frontend Framework**: React.js
- **Routing**: React Router (react-router-dom)
- **CSS**: Basic custom styles for UI components
- **API**: External data source (`countrystatecity.in`) for fetching states and cities.
- **Language**: JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

---

## Rationale for Features in Version 0.0.0

The features implemented in this release were selected to establish a foundational user interface, test external API integration, and initialize our database. By focusing on creating and listing events, we aim to:
1. **Validate Core Functionality**: Establish basic UI and functionality for event creation, forming the foundation for further iterations.
2. **Assess API Integration**: Evaluate the integration of external data sources for real-time user interactions.
3. **Connect Backend to Frontend**: Set up basic frontend and backend communication through basic RESTful API GET and PUSH calls.
4. **Initialize Database Relations**: Creating models for organizations and their events in the database allows us to demonstrate our database relationship tables.
5. **Team Skill Assessment**: Allow team members to familiarize themselves with React and assess proficiency in state management and routing.

---

## Known Limitations and Next Steps

- **Enhanced Styling**: Implementing advanced CSS or integrating a design framework like Material-UI for a polished user experience.
- **Error Handling**: Adding robust error handling for API calls.
- **Responsive Design**: Ensuring backend calls are synced with user actions.

---

This initial version serves as a foundation to test the technical stack and prepare for the next phase of development, ensuring alignment with project goals and team capabilities.
