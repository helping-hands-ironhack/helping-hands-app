import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HostPage.css"
import AccommodationsFeed from "../components/AccommodationsFeed";


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
        <div>
            <h1>Welcome to your profile {userData.firstName}!</h1>
            <img src={userData.picture} alt="user-face" />
              <AccommodationsFeed user={userData} />
        </div>
    )
}