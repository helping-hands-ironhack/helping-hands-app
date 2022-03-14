import axios from "axios";
import { useEffect, useState } from "react";
import NgoCard from "../components/NgoCard";

export default function HostFeed(){

    const [ngos, setNgos] = useState([]);
    const [rooms, setRooms] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [ngosFromDB, setNgosFromDB] = useState([]);

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_SERVER_URL}/ngo`)
        .then(response => {
            setNgosFromDB(response.data)
            setNgos(response.data)
        })
        .catch(err => console.log(err));
    }, []);

    const handleRooms = (e) => setRooms(e.target.value);
    const handleCapacity = (e) => setCapacity(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        let results = ngos.filter((accommodation) => {
            return (accommodation.capacity === parseFloat(capacity) && accommodation.rooms === parseFloat(rooms));
        });

        if (results.length === 0) {
            setErrorMessage("Sorry, there wasn't any match for you search.");
            setNgos(ngosFromDB);
        } else {
            setNgos(results);
            setErrorMessage(null);
        };
    };

    return(
        <div>
            <div>
                <h1>Filter NGOs:</h1>
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
            <h1>Browse all registered NGOs:</h1>
                {ngos.map((ngo) => (
                    <NgoCard key={ngo._id} ngo={ngo} />
                ))}
            </div>
        </div>
    );
};