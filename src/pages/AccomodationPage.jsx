import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

export default function AddAccomodation(props) {
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState("");
    const [pics, setPics] = useState([]);

    const navigate = useNavigate();
    
    const handleDescription = (e) => setDescription(e.target.value);
    const handleCapacity = (e) => setCapacity(e.target.value);
    const handlePics = (e) => setPics(e.target.value);

    function handleSubmit(event) {
        event.preventDefault()
        const requestBody = { description, capacity, pics }

        axios
            .post(`${API_URL}/api/accomodations`, requestBody)
            .populate("owner")
            .populate("requests")
            .populate("currentGuests")
            .then(() => navigate("/profile"))
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }

    return (
        <div>
            <h1>Register an Accomodation</h1>
            <form onSubmit={handleSubmit} className="auth__form">
            <label htmlFor="input-firstName">Capacity:</label>
            <input
            id="input-capacity"
            type="number"
            name="capacity"
            value={capacity}
            onChange={handleCapacity}
            required
        />
            <label htmlFor="input-pics">Pics:</label>
            <input
            id="input-pics"
            type="file"
            name="pics"
            value={pics}
            onChange={handlePics}
            required
        />

            <label htmlFor="input-description">Description:</label>
            <input
            id="input-description"
            type="textarea"
            name="description"
            value={description}
            onChange={handleDescription}
            required
        />
            </form>
        </div>
    )
}