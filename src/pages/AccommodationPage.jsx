import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RequestHosting from "../components/RequestHosting";
import { AuthContext } from "../context/auth.context";
import AcceptRequestButton from "../components/AcceptRequestButton";

export default function AccommodationPage(props) {

    const { user, isNgo } = useContext(AuthContext);

    const [accData, setAccData] = useState("");
    const [isOwner, setIsOwner] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/accommodations/${id}`)
            .then((response) => {
                if (response.data.owner._id === user._id) setIsOwner(true);
                return setAccData(response.data);
            })
            
            .catch(err => console.log(err))

    }, [user]);

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
            <img src={accData.imageUrl} alt="" />
            <h3>{accData.description}</h3>
            <p>Rooms: {accData.rooms}</p>
            <p>Capacity for {accData.capacity} pax</p>
            {isOwner && <button onClick={handleDelete}>Delete accommodation</button>}
            {isOwner && (accData.requests) &&
                <>
                    <h2>Requested by:</h2>
                    {accData.requests.map((req)=>{
                        return(
                            <div>
                                <p>Adults: {req.adults}</p>
                                <p>Children: {req.children}</p>
                                <AcceptRequestButton acc={accData} pax={req} />
                                <button>Reject request</button>
                            </div>
                        )
                    })}
                </>
            }
            {isNgo && <RequestHosting accommodation={accData} />}
        </div>
    )
}