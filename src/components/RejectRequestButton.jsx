import axios from "axios"

export default function RejectRequestButton(props) {
    function handleReject() {
        if(window.confirm("Do you want to reject this hosting?")){
            props.toggleRequests()
    
            const requestBody = { isRequested: false }
            axios
                .put(`${process.env.REACT_APP_SERVER_URL}/pax/${props.pax._id}`, requestBody)
                .then(() => {
                    const requestBody = { $pull: { requests: props.pax._id } }
                    axios
                        .put(`${process.env.REACT_APP_SERVER_URL}/accommodations/${props.acc._id}`, requestBody)
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        }

    }

    return (
        <>
            <button onClick={handleReject}>
                Reject request
            </button>
        </>
    )
}