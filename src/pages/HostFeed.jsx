import axios from "axios";
import { useEffect, useState } from "react";
import NgoCard from "../components/NgoCard";

export default function HostFeed(){

    const [ngos, setNgos] = useState([]);
    const [rooms, setRooms] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [ngosFromDB, setNgosFromDB] = useState([]);

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_SERVER_URL}/ngo`)
        .then(response => {
            setNgosFromDB(response.data)
            setNgos(response.data)
        })
        .catch(err => console.log(err));
    }, []);

    return(
        <div>
            <h1>Browse all registered NGOs:</h1>
            {ngos.map((ngo) => (
                <NgoCard key={ngo._id} ngo={ngo} />
            ))}
        </div>
    );
};