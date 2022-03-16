import { Link } from "react-router-dom";
import '../pages/HostPage.css';

export default function AccommodationsFeed(props) {
    const accommodations = props.user.accommodations

    return (
        <div className="accommodationsContainer">
            <h1>Your accommodations</h1>
            <Link to={`/users/${props.user._id}/accommodations/create`}>Add a new Accommodation</Link>
            <div className="acccommodations-list">
                {accommodations && (
                    accommodations.map((acc) => {
                        return(
                            <Link key={acc._id} to={`/accommodation/${acc._id}`}>
                                <h2>{acc.description}</h2>
                                <div className="listCard">
                                    <img src={acc.imageUrl} alt="" />
                                    <div>
                                        <p>Rooms: {acc.rooms}</p>
                                        <p>Capacity for {acc.capacity} pax</p>
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