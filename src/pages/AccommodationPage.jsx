import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RequestHosting from "../components/RequestHosting";
import { AuthContext } from "../context/auth.context";
import AcceptRequestButton from "../components/AcceptRequestButton";
import RejectRequestButton from "../components/RejectRequestButton";

export default function AccommodationPage(props) {

    const { user, isNgo } = useContext(AuthContext);

    const [accData, setAccData] = useState("");
    const [isOwner, setIsOwner] = useState(false);

    const [isRejected, setIsRejected] = useState(false)
    const [isAccepted, setIsAccepted] = useState(false)
    const [showRequests, setShowRequests] = useState(false)


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

    function toggleRequests(){
        showRequests?setShowRequests(false):setShowRequests(true)
    }

    return (
        <div>
            <img src={accData.imageUrl} alt="" />
            <h3>{accData.description}</h3>
            <p>Rooms: {accData.rooms}</p>
            <p>Capacity for {accData.capacity} pax</p>
            {isOwner && <button onClick={handleDelete}>Delete accommodation</button>}
            {isOwner && (accData.requests) && (!accData.isHosting) &&

                <>
                    <button onClick={toggleRequests}>Show requests</button>
                    {showRequests &&
                        <>
                            <h2>Requested by:</h2>

                            {accData.requests.map((req) => {

                                return (
                                    <div key={req._id}>
                                        <h3>{req.title}</h3>
                                        <p>Adults: {req.adults}</p>
                                        <p>Children: {req.children}</p>
                                        <>
                                            <AcceptRequestButton acceptedState={setIsAccepted} acc={accData} pax={req} />
                                            <RejectRequestButton rejectedState={setIsRejected} acc={accData} pax={req} />
                                        </>

                                    </div>
                                )
                            }
                            )
                            }

                        </>



                    }
                </>
            }
            {accData.isHosting &&
                <>
                    <p>This accomodation is already hosting!</p>
                </>
            }
            {isNgo && <RequestHosting accommodation={accData} />}
        </div>
    )
}