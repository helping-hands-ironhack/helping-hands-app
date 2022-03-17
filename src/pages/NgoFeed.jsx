import axios from "axios";
import { useEffect, useState } from "react";
import AccommodationCard from "../components/AccommodationCard";
import { Link } from "react-router-dom";
import './NgoFeed.css';

export default function NgoFeed(){

    const [accommodations, setAccommodations] = useState([]);
    const [rooms, setRooms] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [accomFromDB, setAccomFromDB] = useState([]);

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_SERVER_URL}/accommodations`)
        .then(response => {
            setAccomFromDB(response.data)
            setAccommodations(response.data)
        })
        .catch(err => console.log(err));
    }, []);

    const handleRooms = (e) => setRooms(e.target.value);
    const handleCapacity = (e) => setCapacity(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        let results = accommodations.filter((accommodation) => {
            return (accommodation.capacity === parseFloat(capacity) && accommodation.rooms === parseFloat(rooms));
        });

        if (results.length === 0) {
            setErrorMessage("⚠ Sorry, there is no match for your criteria.");
            setAccommodations(accomFromDB);
        } else {
            setAccommodations(results);
            setErrorMessage(null);
        };
    };

    return(
        <div className="ngoFeedBackground">
            <div className="ngoFilterContainer">
                <h2>Filter hosting</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <div className="labelInput">
                            <label htmlFor="input-firstName">Rooms:</label>
                            <input
                                id="input-rooms"
                                type="number"
                                name="rooms"
                                placeholder="Number of rooms"
                                value={rooms}
                                onChange={handleRooms}
                                required
                            />
                        </div>

                        <div className="labelInput">
                            <label htmlFor="input-firstName">Capacity:</label>
                            <input
                                id="input-capacity"
                                type="number"
                                name="capacity"
                                placeholder="Number of people you need host"
                                value={capacity}
                                onChange={handleCapacity}
                                required
                            />
                        </div>
                    </div>


                    <button className="filter" type="submit">
                        Filter
                    </button>

                </form>

                {errorMessage && (
                    <p className="errorMsg">{errorMessage}</p>
                )}
            </div>
            <div>
                <h2>Available accommodations:</h2>
                <div className="acccommodations-list">
                    {accommodations.map((accommodation) => (
                        <AccommodationCard key={accommodation._id} accommodation={accommodation} />
                    ))}
                </div>
            </div>
        </div>
    );
};