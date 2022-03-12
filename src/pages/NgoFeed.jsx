import axios from "axios";
import { useEffect, useState } from "react";
import AccommodationCard from "../components/AccommodationCard";

export default function NgoFeed(){

    const [accommodations, setAccommodations] = useState([]);

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_SERVER_URL}/accommodations`)
        .then(response => setAccommodations(response.data))
        .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        
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
                        onChange={''}
                        required
                    />

                    <label htmlFor="input-firstName">Capacity:</label>
                    <input
                        id="input-capacity"
                        type="number"
                        name="capacity"
                        placeholder="The total of people you can host"
                        onChange={''}
                        required
                    />

                    <button className="button__submit" type="submit">
                        Filter
                    </button>

                </form>
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