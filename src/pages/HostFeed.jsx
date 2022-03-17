import axios from "axios";
import { useEffect, useState, useContext } from "react";
import NgoCard from "../components/NgoCard";
import RequestsForHost from "../components/RequestsForHost";
import './HostFeed.css';

export default function HostFeed() {

    const [ngos, setNgos] = useState([]);
    

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/ngo`)
            .then(response => {
                setNgos(response.data)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="hostFeedBackground">
            <RequestsForHost />
            <h1>Browse all registered NGOs:</h1>
            <div className="hostFNgoContainer">
                {ngos.map((ngo) => (
                    <NgoCard key={ngo._id} ngo={ngo} />
                ))}
            </div>
        </div>
    );
};