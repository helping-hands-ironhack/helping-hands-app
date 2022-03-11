import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function HostPage(props){
    const [userData, setUserData] = useState("")

    const {id} = useParams()

    useEffect(() => {                                // <== ADD THE EFFECT
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/users/${id}`)
          .then((response) => {
            setUserData(response.data)
          });
        
      }, [] );


    return (
        <div>
            <h1>{userData.firstName}</h1>
          
        </div>
    )
}