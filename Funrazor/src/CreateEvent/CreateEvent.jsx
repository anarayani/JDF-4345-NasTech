import './CreateEvent.css'
import { useState, useEffect } from 'react';

function CreateEvent() {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredStates, setFilteredStates] = useState([]);
    const [isStateSelected, setIsStateSelected] = useState(false);
    const [searchCity, setSearchCity] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [isCitySelected, setIsCitySelected] = useState(false);

    useEffect(() => {
        fetchStates();
    }, []);

    useEffect(() => {
        if (search && !isStateSelected) {
            const results = states.filter(state =>
                state.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredStates(results);
        } else {
            setFilteredStates([]);
        }
    }, [search, states, isStateSelected]);

    useEffect(() => {
        if (searchCity && !isCitySelected) {
            const results = cities.filter(city =>
                city.name.toLowerCase().includes(searchCity.toLowerCase())
            );
            setFilteredCities(results);
        } else {
            setFilteredCities([]);
        }
    }, [searchCity, cities, isCitySelected]);

    const fetchStates = () => {
        fetch(`https://api.countrystatecity.in/v1/countries/US/states`, {
            headers: {
                'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
            }
        })
            .then(response => response.json())
            .then(response => setStates(response))
            .catch(err => console.error(err));
    }

    const fetchCities = (stateISO2) => {
        fetch(`https://api.countrystatecity.in/v1/countries/US/states/${stateISO2}/cities`, {
            headers: {
                'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
            }
        })
            .then(response => response.json())
            .then(response => setCities(response))
            .catch(err => console.error(err));
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setIsStateSelected(false);
    };

    const handleSelectState = (state) => {
        setSearch(state.name);
        setFilteredStates([]);
        setIsStateSelected(true);
        setStateCode(state.iso2);
        fetchCities(state.iso2);
    }

    const handleSearchCityChange = (event) => {
        setSearchCity(event.target.value);
        setIsCitySelected(false);
    };

    const handleSelectCity = (city) => {
        setSearchCity(city.name);
        setIsCitySelected(true);
        setFilteredCities([]);
    };

  return (
    <>
        <h3>New Event</h3>
        <form>
            <div id="eventName">
                <label>Event Name</label>
                <input type="text" id="eventNameInput" name="eventNameInput" required></input>
            </div>
            <div id="date">
                <label>Date</label>
                <input type="date" id="dateInput" name="dateInput" required></input>
            </div>
            <div id="time">
                <label>Time</label>
                <input type="time" id="timeInput" name="timeInput" required></input>
            </div>
            <div id="state">
                <label>State</label>
                <input
                    type="text"
                    id="stateInput"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Start typing to search..."
                    required
                />
                <ul className="suggestions">
                    {filteredStates && filteredStates.map((state) => (
                        <li
                            key={state.iso2}
                            onClick={() => handleSelectState(state)}
                        >
                            {state.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div id="city">
                <label>City</label>
                <input
                    type="text"
                    id="cityInput"
                    value={searchCity}
                    onChange={handleSearchCityChange}
                    placeholder="Start typing to search city..."
                    disabled={!isStateSelected}  // Disable city input until state is selected
                    required
                />
                <ul className="suggestions">
                    {filteredCities.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => handleSelectCity(city)}
                        >
                            {city.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div id="eventDescription">
                <label>Description</label>
                <input type="text" id="eventDescriptionInput" name="eventDescriptionInput" required></input>
            </div>
            <button type="submit">Create Event</button>
        </form>
    </>
  )
}

export default CreateEvent