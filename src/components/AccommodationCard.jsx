import { Link } from "react-router-dom";
import { useContext  } from "react";
import { AuthContext } from "../context/auth.context";

export default function AccommodationCard({accommodation}){
    const {user} = useContext(AuthContext);
    const isOwner = accommodation.owner === user._id;

    return(
        <Link to={`/accommodation/${accommodation._id}`}>
            <div className="listTitle">
                <h3>{accommodation.description}</h3>
            </div>
            <div className="listCard">
                <img src={accommodation.imageUrl} alt=''/>
                <div>
                <p><strong>Rooms:</strong> {accommodation.rooms}</p>
                <p><strong>Capacity: </strong>{accommodation.capacity} pax</p>
                </div>
            </div>
        </Link>
    );
};