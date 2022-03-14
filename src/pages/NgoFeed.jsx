import axios from "axios";
import { useEffect, useState } from "react";
import AccommodationCard from "../components/AccommodationCard";

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
            setErrorMessage("Sorry, there wasn't any match for you search.");
            setAccommodations(accomFromDB);
        } else {
            setAccommodations(results);
            setErrorMessage(null);
        };
    };

    return(
        <div>
            <div>
                <h1>Filter hosting:</h1>
                <form onSubmit={handleSubmit}>
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

                    <button className="button__submit" type="submit">
                        Filter
                    </button>

                </form>

                {errorMessage && (
                    <p>{errorMessage}</p>
                )}
            </div>
            <div>
            <h1>Browse available accommodations:</h1>
                {accommodations.map((accommodation) => (
                    <AccommodationCard key={accommodation._id} accommodation={accommodation} />
                ))}
            </div>
        </div>
    );
};