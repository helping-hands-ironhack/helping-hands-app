import axios from "axios";
import { useEffect, useState } from "react";
import AccommodationCard from "../components/AccommodationCard";

export default function NgoFeed(){

    const [accommodations, setAccommodations] = useState([]);

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_SERVER_URL}/accommodations`)
        .then(response => setAccommodations(response.data))
        .catch(err => console.log(err));
    }, []);

    return(
        <div>
            <h1>Browse available accommodations:</h1>
            <div>
                {accommodations.map((accommodation) => (
                    <AccommodationCard key={accommodation._id} accommodation={accommodation} />
                ))}
            </div>
        </div>
    );
};