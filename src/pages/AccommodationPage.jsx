import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AccommodationPage(props) {
    const [accData, setAccData] = useState("")

    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/accommodations/${id}`)
            .then((response) => {
                setAccData(response.data)
            });

    }, []);

    function handleDelete(id){
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/accommodations/${id}`)
            .then((response) => {
                setAccData(response.data)
            });
    }

    return (
        <div>
            <img src={accData.picture} alt="" />
            <h3>{accData.description}</h3>
            <p>Rooms: {accData.rooms}</p>
            <p>Capacity for {accData.capacity} pax</p>
            <button onClick={handleDelete(accData._id)}>Delete accommodation</button>
        </div>
    )
}