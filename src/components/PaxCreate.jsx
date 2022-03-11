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
          .then(() => {
            setAdults(0);
            setChildren(0);
            props.refreshNgo();
          })
          .catch((error) => console.log(error));
    }

    return (
        <div className="PaxCreate">
            <h3>Create Papapapapapax</h3>

            <form onSubmit={handleSubmit}>
            <label>Adults:</label>    
            <input
              type="number"
              name="adults"
              value={adults}            
              onChange={(event) => setAdults(event.target.value)}
            />

            <label>Children:</label>    
            <input
              type="number"
              name="children"
              value={children}            
              onChange={(event) => setChildren(event.target.value)}
            />  

            <button type="submit">Add Movidas</button>
            </form>
        </div>
    )
}