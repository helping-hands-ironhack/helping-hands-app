import { useState, useContext, useEffect } from "react"
import PaxCard from "./PaxCard"
import { AuthContext } from "../context/auth.context";
import axios from "axios";


export default function RequestHosting(props) {
    const { user } = useContext(AuthContext)

    const [isRequesting, setIsRequesting] = useState(false)
    const [paxData, setPaxData] = useState(null)


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/ngo/${user._id}`)
            .then((res) => setPaxData(res.data.paxToHost))
            .catch((error) => console.log(error))
    }, [user])

    function toggleRequesting(e) {
        e.preventDefault()
        if (isRequesting) setIsRequesting(false)
        else setIsRequesting(true)
    }

    function handleRequest(adults, children, paxId) {
        const totalPax = adults + children
        if (props.accommodation.capacity < totalPax) alert(`This accommodation has capacity for only ${props.accommodation.capacity} pax`)
        else {
            axios
                .put(`${process.env.REACT_APP_SERVER_URL}/accommodations/${props.accommodation._id}/push-request/${paxId}`)
                .catch((error) => console.log(error))
        }
    }

    return (
        <div>
            <button className="" onClick={toggleRequesting}>
                Request hosting
            </button>
            {isRequesting && (
                <>
                    <p>Select the group of pax</p>
                    {(paxData) &&
                        paxData.map((pax) => {
                            return (
                                <button onClick={() => handleRequest(pax.adults, pax.children, pax._id)}>
                                    <PaxCard key={pax._id} adults={pax.adults} children={pax.children} />
                                </button>
                            )
                        })
                    }
                </>
            )}
        </div>





    )
}