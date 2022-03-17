import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RequestHosting from "../components/RequestHosting";
import { AuthContext } from "../context/auth.context";
import AcceptRequestButton from "../components/AcceptRequestButton";
import RejectRequestButton from "../components/RejectRequestButton";
import './AccommodationPage.css'

export default function AccommodationPage(props) {

    const { user, isNgo } = useContext(AuthContext);

    const [accData, setAccData] = useState("");
    const [isOwner, setIsOwner] = useState(false);

    const [isRejected, setIsRejected] = useState(false)
    const [isAccepted, setIsAccepted] = useState(false)
    const [showRequests, setShowRequests] = useState(false)


    const navigate = useNavigate();

    const { id } = useParams();


    function getAccInfo(){
        axios
        .get(`${process.env.REACT_APP_SERVER_URL}/accommodations/${id}`)
        .then((response) => {
            if (response.data.owner._id === user._id) setIsOwner(true);
            return setAccData(response.data);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getAccInfo()
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
        getAccInfo()
    }

    return (
        <div className="accPageBackground">
            <div className="accHeader">
                <img src={accData.imageUrl} alt="" />
            </div>
            <div className="accDescription">
                <h1>{accData.description}</h1>
                <div className="descriptionContainer">
                    <p><strong>Rooms:</strong> {accData.rooms}</p>
                    <p><strong>Capacity:</strong> {accData.capacity} pax</p>
                </div>
                <div className="accRooms">
                    {isOwner && (!accData.requests) && <button onClick={handleDelete} className='requestBtn deleteRoom' style={{'margin-bottom': '20%'}} >Delete accommodation</button>}
                    {isOwner && (accData.requests) && <button onClick={handleDelete} className='requestBtn deleteRoom'>Delete accommodation</button>}
                    {isOwner && (accData.requests) && (accData.requests.length >0) && (!accData.isHosting) &&
                        <>
                            {!showRequests && <button onClick={toggleRequests} className='requestBtn' style={{'margin-bottom':'20%'}}>Show requests</button>}
                            {showRequests &&
                                <>
                                    <h3>Requested by:</h3>
                                    <div className="requestingPax">
                                        {accData.requests.map((req) => {

                                            return (
                                                <div key={req._id}>
                                                    <h4>{req.title}</h4>
                                                    <div className="requestInfobody">
                                                        <p>Adults: {req.adults}</p>
                                                        <p>Children: {req.children}</p>
                                                    </div>
                                                    <div className="acceptReject">
                                                        <AcceptRequestButton toggleRequests={toggleRequests} acc={accData} pax={req} />
                                                        <RejectRequestButton toggleRequests={toggleRequests} acc={accData} pax={req} />
                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            }
                        </>
                    }
                </div>
                {accData.isHosting &&
                    <>
                        <p className="alreadyReqMsg">We are sorry, this accomodation is already hosting.</p>
                    </>
                }
                {isNgo && !accData.isHosting && <RequestHosting accommodation={accData} />}
            </div>
        </div>
    )
}