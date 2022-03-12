import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

export default function AddAccommodation(props) {
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState("");
    const [rooms, setRooms] = useState("");

    const userId = props.user._id

    const navigate = useNavigate();

    const handleDescription = (e) => setDescription(e.target.value);
    const handleCapacity = (e) => setCapacity(e.target.value);
    const handleRooms = (e) => setRooms(e.target.value);

    function handleSubmit(event) {
        event.preventDefault()
        const requestBody = { description, capacity, rooms }
        console.log(requestBody);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/accommodations/new/${userId}`, requestBody)
            .then(() => navigate(`/users/${userId}`))
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }

    return (
        <div>
            <h1>Register an Accommodation</h1>
            <form onSubmit={handleSubmit} className="auth__form">
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
                    placeholder="The total of people you can host"
                    value={capacity}
                    onChange={handleCapacity}
                    required
                />

                <label htmlFor="input-description">Description:</label>
                <input
                    id="input-description"
                    type="textarea"
                    name="description"
                    placeholder="Example: an apartment next to the city center"
                    value={description}
                    onChange={handleDescription}
                    required
                />
                <button className="button__submit" type="submit">
                    Add
                </button>
            </form>
        </div>
    )
}