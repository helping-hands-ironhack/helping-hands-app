import axios from "axios";
import { useEffect, useState } from "react";
import NgoCard from "../components/NgoCard";

export default function HostFeed(){

    const [ngos, setNgos] = useState([]);

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_SERVER_URL}/ngo`)
        .then(response => {
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