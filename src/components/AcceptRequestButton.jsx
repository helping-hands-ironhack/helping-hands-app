import axios from "axios"

export default function AcceptRequestButton(props) {

    function handleAccept() {
        const requestBody = { isHosted: true, hostedAt: props.acc._id }
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/pax/${props.pax._id}`, requestBody)
            .then(() => {
                const requestBody = { isHosting: true, $push: { currentGuests: props.pax._id } }
                axios
                    .put(`${process.env.REACT_APP_SERVER_URL}/accommodations/${props.acc._id}`, requestBody)
                    .then((res)=>{
                        res.data.requests.fotEach((id)=>{
                            const requestBody = {isRequested: false}
                            axios
                            .put(`${process.env.REACT_APP_SERVER_URL}/pax/${id}`, requestBody)
                        })
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))

    }

    return (
        <button onClick={handleAccept}>
            Accept request
        </button>
    )
}