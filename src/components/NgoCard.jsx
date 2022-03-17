import { Link } from "react-router-dom";
import './NgoCard.css';


export default function AccommodationCard({ngo}){
    return(
        <div className="ngo-container">
        <Link to={`/ngo/${ngo._id}`}>
            <div className="card">
                <h2>{ngo.name}</h2>
                <div>
                    <img className="img" src={ngo.imageUrl} alt=''/>
                </div>
            </div>
        </Link>
        </div>
    );
};