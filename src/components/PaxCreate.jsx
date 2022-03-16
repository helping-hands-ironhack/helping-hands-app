import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function PaxCreate(props) {

    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [title, setTitle] = useState("");
    const ngo = useParams();

    function handleSubmit(event) {
        event.preventDefault()
        const requestBody = { title: title, adults, children, ngo: ngo.id };

        const storedToken = localStorage.getItem('authToken');

        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/pax/create/${ngo.id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
          .then(() => {
            setTitle("")
            setAdults(0);
            setChildren(0);
            props.updateNgo()
          })
          .catch((error) => console.log(error));
    }

    return (
        <div className="PaxCreate">
            <h3>Pax to host:</h3>

            <form onSubmit={handleSubmit}>
            <label>Title or description:</label>    
            <input
              type="text"
              name="title"
              value={title}            
              onChange={(event) => setTitle(event.target.value)}
            />

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