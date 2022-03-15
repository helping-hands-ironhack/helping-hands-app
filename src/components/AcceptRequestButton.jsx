import axios from "axios"

export default function AcceptRequestButton(props){
    
    function handleAccept(){
        console.log("THIS IS ACC",props.acc._id)
        console.log("THIS IS PAX",props.pax._id)
        const requestBody = {isHosted: true, hostedAt: props.acc._id}
        axios
        .put(`${process.env.REACT_APP_SERVER_URL}/pax/${props.pax._id}`, requestBody)
        .then(()=>{
            const requestBody = {isHosting: true, $push: {currentGuests: props.pax._id}}
            axios
            .put(`${process.env.REACT_APP_SERVER_URL}/accommodations/${props.acc._id}`, requestBody)
        })
    }
    
    return (
        <button onClick={handleAccept}>
            Accept request
        </button>
    )
}