import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AccommodationPage(props) {
    const [accData, setAccData] = useState("")

    const navigate = useNavigate();

    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/accommodations/${id}`)
            .then((response) => {
                setAccData(response.data)
            });

    }, []);

    function handleDelete(e) {
        e.preventDefault()
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/accommodations/${id}`)
            .then((response) => {
                setAccData(response.data)
            })
            .then((__) => navigate(`/users/${props.user._id}`))
    }

    return (
        <div>
            <img src={accData.picture} alt="" />
            <h3>{accData.description}</h3>
            <p>Rooms: {accData.rooms}</p>
            <p>Capacity for {accData.capacity} pax</p>
            <button onClick={handleDelete}>Delete accommodation</button>
        </div>
    )
}