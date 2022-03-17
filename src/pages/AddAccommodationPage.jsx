import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../pages/auth.css';



export default function AddAccommodation(props) {
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState("");
    const [rooms, setRooms] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const userId = props.user._id

    const navigate = useNavigate();

    const handleDescription = (e) => setDescription(e.target.value);
    const handleCapacity = (e) => setCapacity(e.target.value);
    const handleRooms = (e) => setRooms(e.target.value);

    function handleSubmit(event) {
        event.preventDefault()
        const requestBody = { description, capacity, rooms, imageUrl }
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/accommodations/new/${userId}`, requestBody)
            .then(() => navigate(`/users/${userId}`))
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }

    
    //Cloudinary setup
    function handleFileUpload(event) {
        event.preventDefault();
        const uploadData = new FormData();
        
        uploadData.append("file", event.target.files[0])
        uploadData.append("upload_preset","fzk9q9ld")

        axios
        .post(`https://api.cloudinary.com/v1_1/marcelusironhack/image/upload`, uploadData)
        .then(res => setImageUrl(res.data.secure_url))
        .catch(err => console.log("Error while uploading the file on service", err))
    }



    return (
        <div className="formBackground">
            <div className="formContainer">
                <h1>Register an Accommodation</h1>
                <form onSubmit={handleSubmit} className="signup__form">
                    <div className="labelInput">
                        <label htmlFor="input-firstName">Rooms:</label>
                        <input
                            id="input-rooms"
                            type="number"
                            name="rooms"
                            placeholder="Number of rooms"
                            value={rooms}
                            onChange={handleRooms}
                            required
                        />
                    </div>

                    <div className="labelInput">
                        <label htmlFor="input-firstName">Capacity:</label>
                        <input
                            id="input-capacity"
                            type="number"
                            name="capacity"
                            placeholder="The total of people you can host"
                            value={capacity}
                            onChange={handleCapacity}
                            required
                        />
                    </div>

                    <div className="labelInput">
                    <label htmlFor="input-description">Description:</label>
                    <input
                        id="input-description"
                        type="textarea"
                        name="description"
                        placeholder="Example: an apartment next to the city center"
                        value={description}
                        onChange={handleDescription}
                        required
                    />
                    </div>

                    <div className="labelInput">
                        <input type="file" onChange={(e) => handleFileUpload(e, setImageUrl)} multiple/>
                        {imageUrl &&(
                        <>
                            <img src={imageUrl} alt="profile" style={{'max-width': '40vw'}}/>
                        </>
                        )}
                    </div>
                    
                    <div className="buttonSubmit">
                        <button className="button__submit" type="submit">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}