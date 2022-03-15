import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import LoadingComponent from "./Loading";

export default function RequestsForHost(props) {
    const { user } = useContext(AuthContext)
    const [userData, setUserData] = useState(null)
    const [accData, setAccData] = useState([])
    const [requests, setRequests] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/users/`)
            .then((__) => {
                axios
                    .get(`${process.env.REACT_APP_SERVER_URL}/users/${user._id}`)
                    .then((res) => setUserData(res.data))
                    .then((__) => {
                        axios.get(`${process.env.REACT_APP_SERVER_URL}/accommodations/`)
                            .then((res) => setAccData(res.data))
                    })
                    .catch((err) => console.log(err))
            })

    }, [])


    return (
        <div>
            {
                (user) && (accData) &&
                <h1>You have {accData.length} requests!</h1>
            }
        </div>
    )


}