import { Link } from "react-router-dom";

export default function AccommodationCard({ngo}){
    return(
        <Link to={`/ngo/${ngo._id}`}>
            <div>
                <h2>{ngo.name}</h2>
                <img src={ngo.imageUrl} alt=''/>
            </div>
        </Link>
    );
};