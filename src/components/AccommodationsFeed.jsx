import { Link } from "react-router-dom";

export default function AccommodationsFeed(props) {
    const accommodations = props.user.accommodations

    return (
        <div>
            <h1>These are your Accommodations</h1>
            <Link to={`/users/${props.user._id}/accommodations/create`}>Add a new Accommodation</Link>
            <div className="acccommodations-container">
                {accommodations && (
                    accommodations.map((acc) => {
                        return(
                            <Link to={`/accommodation/${acc._id}`}>
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