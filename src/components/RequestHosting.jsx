import { useState, useContext, useEffect } from "react"
import PaxCard from "./PaxCard"
import { AuthContext } from "../context/auth.context";
import axios from "axios";


export default function RequestHosting(props) {
    const { user } = useContext(AuthContext)

    const [isRequesting, setIsRequesting] = useState(false)
    const [paxData, setPaxData] = useState(null)
    const [successRequest, setSuccessRequest] = useState(false)


    useEffect(() => {
        getPax()
    }, [])

    function getPax() {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/ngo/${user._id}`)
            .then((res) => setPaxData(res.data.paxToHost))
            .catch((error) => console.log(error))
    }

    function toggleRequesting(e) {
        e.preventDefault()
        if (isRequesting) setIsRequesting(false)
        else {
            setIsRequesting(true)
            setSuccessRequest(false)
        }
    }

    function handleRequest(adults, children, paxId) {
        const totalPax = adults + children
        const accCapacity = props.accommodation.capacity

        if (accCapacity < totalPax) {
            alert(`This accommodation has capacity for only ${props.accommodation.capacity} pax`)
            return
        }
        else {

            axios
                .put(`${process.env.REACT_APP_SERVER_URL}/accommodations/${props.accommodation._id}/push-request/${paxId}`)
                .then(() => {
                    setSuccessRequest(true)
                    setIsRequesting(false)
                    getPax();
                })
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

                        paxData.filter(pax => !pax.isRequested).map((pax) => {
                            return (
                                <button onClick={() => handleRequest( pax.adults, pax.children, pax._id)}>
                                    <PaxCard key={pax._id} title={pax.title} adults={pax.adults} children={pax.children} />
                                </button>
                            )
                        })
                    }
                </>
            )}
            {successRequest && (
                <>
                    <p>Your request has been sent!</p>
                </>
            )}
        </div>





    )
}