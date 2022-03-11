import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PaxCreate from "../components/PaxCreate";
import PaxCard from "../components/PaxCard";

const API_URL = "http://localhost:5005";

export default function NgoProfile(props) {

    const [ngo, setNgo] = useState(null);
    const { ngoId } = useParams();

    function getNgo() {
        const storedToken = localStorage.getItem("authToken");
        axios
          .get(`${API_URL}/api/ngo/${ngoId}`, {headers: { Authorization: `Bearer ${storedToken}`}})
          .then((response) => {
            const oneNgo = response.data;
            setNgo(oneNgo);
          })
          .catch((error) => console.log(error));
    };

    useEffect(() => {
        getNgo();
    }, [] );

    return (
        <div className="NgoProfile">
            {ngo && (
                <>
                  <h1>{ngo.name}</h1>
                  <p>{ngo.cif}</p>
                  <p>{ngo.email}</p>  
                </>
            )}
            
            <PaxCreate refreshNgo={getNgo} ngoId={ngoId} />

            { ngo && ngo.pax.map((pax) =>
            <PaxCard key={pax._id} {...pax} />
            )}    

        </div>
    )
}