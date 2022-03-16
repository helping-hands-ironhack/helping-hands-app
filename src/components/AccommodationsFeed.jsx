import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function AccommodationsFeed(props) {
    const accommodations = props.user.accommodations

    const {user} = useContext(AuthContext);
    const isOwner = user._id === props.user._id;

    return (
        <div>
            <h1>These are your Accommodations</h1>
            {isOwner && <Link to={`/users/${props.user._id}/accommodations/create`}>Add a new Accommodation</Link>}
            <div className="acccommodations-container">
                {accommodations && (
                    accommodations.map((acc) => {

                        return(
                            <Link key={acc._id} to={`/accommodation/${acc._id}`}>
                                <img src={acc.imageUrl} alt="" />
                                <h2>{acc.description}</h2>
                                
                                    <p>Rooms: {acc.rooms}</p>
                                <p>Capacity for {acc.capacity} pax</p>
                            </Link>
                        )
                    })
                )
                }


            </div>
        </div>

    )
}