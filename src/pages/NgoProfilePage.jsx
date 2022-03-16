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
  const [pax, setPax] = useState([]);
  const { id } = useParams();

  const isOwner = user._id === id;

  function getNgo() {
    axios
        .get(`${process.env.REACT_APP_SERVER_URL}/ngo/${id}`)
        .then((response) => {
            setNgo(response.data)
            setPax(response.data.paxToHost)
        });
  }

  useEffect(() => {
    getNgo();
  }, []);

  return (
    <div className="ngoProfileBackground">
            {ngo && (
              <div>
                <div className="ngoProfileDiv">
                  <p>NGO</p>
                  <h1>{ngo.name}</h1>
                  <img src={ngo.imageUrl} alt=""/>
                  <p>{ngo.email}</p>

                {isOwner && (
                  <div className="editProfile">
                  <Link to={`/ngo/${id}/edit`}>
                    <p>Edit your profile</p>
                  </Link>
                  <Link to={`/ngo/${id}/edit`}>
                  <button>✏</button>
                  </Link>
                  </div>
                )}
                </div>
                <div className="ngoDescription">
                  <p>{ngo.description}</p>
                </div>
              </div>
            )}

            <div className="paxContainer">
              <h2>{ngo.name} is looking for shelter for:</h2>
              <div className="paxList">
                {ngo && ngo.paxToHost?.map((pax) => <PaxCard key={pax._id} {...pax} /> )} 
              </div>
              {isOwner && <PaxCreate updateNgo={getNgo} />}
            </div>


        </div>
  );
}
