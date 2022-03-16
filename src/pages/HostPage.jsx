import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HostPage.css"
import { Link } from "react-router-dom";
import AccommodationsFeed from "../components/AccommodationsFeed";
import { AuthContext } from "../context/auth.context";


export default function HostPage(props){
    const [userData, setUserData] = useState("")

    const {id} = useParams()

    useEffect(() => {                          
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/users/${id}`)
          .then((response) => {
            setUserData(response.data)
          });
        
      }, [] );


    return (
        <div className="userProfileBackground">
          <div className="profileDiv">
            <h1>Welcome to your profile, {userData.firstName}.</h1>
            <img src={userData.imageUrl} alt="user" />
            <div className="editProfile">
              <Link to={`/users/${id}/edit`}>
                <p>Edit your profile</p>
              </Link>
              <Link to={`/users/${id}/edit`}>
                <button>✏</button>
              </Link>
            </div>
          </div>
          <AccommodationsFeed user={userData} />
        </div>
    )
}