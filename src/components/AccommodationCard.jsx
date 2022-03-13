import { Link } from "react-router-dom";

export default function AccommodationCard({accommodation}){
    return(
        <Link to={`/accommodation/${accommodation._id}`}>
            <div>
                <h2>{accommodation.description}</h2>
                <img src={accommodation.picture} alt=''/>
            </div>
        </Link>
    );
};