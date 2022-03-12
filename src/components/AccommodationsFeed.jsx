import { Link } from "react-router-dom";

export default function AccommodationsFeed(props) {
    const accommodations = props.user.accommodations
    console.log(props.user.accommodations);

    return (
        <div>
            <h1>This are your accomodations</h1>
            <Link to={`/users/${props.user._id}/accommodations/create`}>Add a new Accommodation</Link>
            <div className="acccommodations-container">
                {accommodations && (
                    accommodations.map((acc) => {
                        return(
                            <div>
                                <img src={acc.picture} alt="" />
                                <h2>{acc.description}</h2>
                                {acc.rooms == 1 && (
                                    <p>{acc.rooms} room</p>
                                    )
                                }
                                {acc.rooms < 1 && (
                                    <p>{acc.rooms} rooms</p>
                                    )
                                }
                                <p>Capacity for {acc.capacity} pax</p>
                            </div>
                        )
                    })
                )
                }


            </div>
        </div>

    )
}