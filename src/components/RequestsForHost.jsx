import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingComponent from "./Loading";

export default function RequestsForHost(props) {
    const { user, authenticateUser } = useContext(AuthContext)
    const [userData, setUserData] = useState(null)
    const [accData, setAccData] = useState()
    const [requests, setRequests] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authenticateUser()
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/users/`)
            .then((__) => {
                axios
                    .get(`${process.env.REACT_APP_SERVER_URL}/accommodations/findByUser/${user._id}`)
                    .then((res) => {
                        setAccData(res.data)
                    })
                    .catch((err) => console.log(err))
            }).catch((err) => console.log(err))

    }, [])


    return (
        <div>
            {
                (user) && (accData) && (accData.length > 0) &&
                <div>
                    <h1>You have {accData.length} requests!</h1>
                    {
                        accData.map((acc) => {
                            return (
                                <Link key={acc._id} to={`/accommodation/${acc._id}`}>
                                    <p>{acc.description}</p>
                                </Link>
                            )
                        })
                    }
                </div>
            }
        </div>
    )


}