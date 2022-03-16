import { useContext } from "react";
import { Link } from "react-router-dom";
import '../pages/HostPage.css';
import { AuthContext } from "../context/auth.context";

export default function AccommodationsFeed(props) {
    const accommodations = props.user.accommodations

    const {user} = useContext(AuthContext);
    const isOwner = user._id === props.user._id;

    return (
        <div className="accommodationsContainer">
            <h2>Your accommodations</h2>
            {isOwner && <Link to={`/users/${props.user._id}/accommodations/create`}>Add a new Accommodation</Link>}
            <div className="acccommodations-list">
                {accommodations && (
                    accommodations.map((acc) => {

                        return(
                            <Link key={acc._id} to={`/accommodation/${acc._id}`}>
                                <div className="listTitle">
                                    <h3>{acc.description}</h3>
                                </div>
                                <div className="listCard">
                                    <img src={acc.imageUrl} alt="" />
                                    <div>
                                        <p><strong>Rooms:</strong> {acc.rooms}</p>
                                        <p><strong>Capacity: </strong>{acc.capacity} pax</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                )
                }


            </div>
        </div>

    )
}