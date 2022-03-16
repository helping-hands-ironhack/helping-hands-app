import axios from "axios"

export default function AcceptRequestButton(props) {

    
    function handleAccept() {
        if(window.confirm("Do you want to accept this hosting?")){
            const requestBody = { isHosted: true, hostedAt: props.acc._id }
            props.toggleRequests()
            axios
                .put(`${process.env.REACT_APP_SERVER_URL}/pax/${props.pax._id}`, requestBody)
                .then(() => {
                    const requestBody = { isHosting: true, $push: { currentGuests: props.pax._id } }
                    axios
                        .put(`${process.env.REACT_APP_SERVER_URL}/accommodations/${props.acc._id}`, requestBody)
                        .then((res) => {
                            res.data.requests.forEach((id) => {
                                const requestBody = { isRequested: false }
                                axios
                                    .put(`${process.env.REACT_APP_SERVER_URL}/pax/${id}`, requestBody)
                            })
                        })
                        .then((__) => {
                            const requestBody = { $set: { requests: [] }}
                            axios
                                .put(`${process.env.REACT_APP_SERVER_URL}/accommodations/${props.acc._id}`, requestBody)
                        }
                        )
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
                alert("Thanks for accepting, the ngo is going to contact you shortly")
        }

    }

    return (
        <button onClick={handleAccept}>
            Accept request
        </button>
    )
}