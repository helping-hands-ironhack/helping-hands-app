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
            .populate("User")
            .populate("Pax")
    }
}