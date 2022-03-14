import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PaxCreate from "../components/PaxCreate";
import PaxCard from "../components/PaxCard";
import NgoProfileEdit from "./NgoProfileEdit";

export default function NgoProfile(props) {
  const [ngo, setNgo] = useState("");
  const [pax, setPax] = useState("");
  const { id } = useParams();

  function getNgo() {
    axios
        .get(`${process.env.REACT_APP_SERVER_URL}/ngo/${id}`)
        .then((response) => {
            setNgo(response.data)
            console.log(ngo)
        });
  }

  useEffect(() => {
    getNgo();
  }, []);

  return (
    <div className="NgoProfile">
            {ngo && (
                <>
                  <h1>{ngo.name}</h1>
                  <p>{ngo.cif}</p>
                  <p>{ngo.email}</p>  
                </>
            )}

            <Link to={`/ngo/${id}/edit`}>✏</Link>
            
            <PaxCreate updateNgo={getNgo} />


            { ngo.paxToHost?.map((pax) => <PaxCard key={pax._id} {...pax} /> )} 

        </div>
  );
}
