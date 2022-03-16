import axios from "axios";
import { Link } from "react-router-dom";
import { useContext  } from "react";
import { AuthContext } from "../context/auth.context";

export default function AccommodationCard({accommodation}){
    const {user} = useContext(AuthContext);

    const isOwner = accommodation.owner === user._id;
    // console.log("THEM PROPS ==========>", props)
  //  axios
        // .get(`${process.env.REACT_APP_SERVER_URL}/users/${id}`)

    return(
        
        <div>
        <Link to={`/users/${accommodation.owner._id}`}>Host owner o alguna mierda</Link>    
        <div>
            <Link to={`/accommodation/${accommodation._id}`}>
                <h2>{accommodation.description}</h2>
                <img src={accommodation.imageUrl} alt=''/>
            </Link>                
        </div>
        </div>
    );
};