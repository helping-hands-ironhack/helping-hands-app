import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

export default function PaxCreate(props) {
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);

    function handleSubmit(event) {
        event.preventDefault()
        const { ngoId } = props;
        const requestBody = { adults, children, ngoId };

        const storedToken = localStorage.getItem('authToken');

        axios
          .post(`${API_URL}/api/pax`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
          

    }
}