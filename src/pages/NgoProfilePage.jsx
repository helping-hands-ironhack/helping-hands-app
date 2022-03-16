import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PaxCreate from "../components/PaxCreate";
import PaxCard from "../components/PaxCard";
import NgoProfileEdit from "./NgoProfileEdit";
import './NgoProfilePage.css';
import { AuthContext } from "../context/auth.context";

export default function NgoProfile(props) {
  const {user} = useContext(AuthContext);
  const [ngo, setNgo] = useState("");
  const [pax, setPax] = useState("");
  const { id } = useParams();

  const isOwner = user._id === id;

  function getNgo() {
    axios
        .get(`${process.env.REACT_APP_SERVER_URL}/ngo/${id}`)
        .then((response) => {
            setNgo(response.data)
        });
  }

  useEffect(() => {
    getNgo();
  }, []);

  return (
    <div className="ngoProfileBackground">
            {ngo && (
              <div className="profileDiv">
                <h1>{ngo.name}</h1>
                <img src={ngo.imageUrl} alt=""/>
                <p>{ngo.email}</p>
              </div>

              {isOwner && (
                
                <Link to={`/ngo/${id}/edit`}>✏</Link>
              )}
            )}

            
            <PaxCreate updateNgo={getNgo} />

            {ngo && ngo.paxToHost?.map((pax) => <PaxCard key={pax._id} {...pax} /> )} 

        </div>
  );
}
