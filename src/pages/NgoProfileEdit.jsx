import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export default function NgoProfileEdit(props) {
    const {logOutNgo} = useContext(AuthContext);

    const {id} = useParams();

    const [email, setEmail] = useState(props.email);
    const [name, setName] = useState(props.name);
    const [cif, setCif] = useState(props.cif);
    const [imageUrl, setImageUrl] = useState("")
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handleName = (e) => setName(e.target.value);
    const handleCif = (e) => setCif(e.target.value);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const requestBody = {email, name, cif, imageUrl: imageUrl}

        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/ngo/${id}`, requestBody)
            .then((_) => navigate(`/ngo/${id}`))
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }

    function handleFileUpload(event) {
        event.preventDefault();
        const uploadData = new FormData();

        uploadData.append("file", event.target.files[0])
        uploadData.append("upload_preset", "fzk9q9ld")

        axios
            .post(`https://api.cloudinary.com/v1_1/marcelusironhack/image/upload`, uploadData)
            .then(res => setImageUrl(res.data.secure_url))
            .catch(err => console.log("Error while uploading the file on service", err))
    }

    return (
        <div>
            <h1>Edit Your Ngo</h1>
            <form onSubmit={handleEditSubmit} className="auth__form">
                <label htmlFor="input-name">Name:</label>
                <input
                    id="input-name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                    required
                />

                <label htmlFor="input-email">Email:</label>
                <input
                    id="input-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    required
                />

                <label htmlFor="input-cif">CIF:</label>
                <input
                    id="input-cif"
                    type="text"
                    name="cif"
                    value={cif}
                    onChange={handleCif}
                    required
                />

                <input type="file" onChange={(e) => handleFileUpload(e, setImageUrl)} />
                {imageUrl && (
                    <>
                        <img src={imageUrl} alt="image" />
                    </>
                )}

                {errorMessage && (
                    <div className="error-block">
                        <p>There was an error submiting the form:</p>
                        <p>{errorMessage}</p>
                    </div>
                )}

                <button className="button__submit" type="submit">Modify</button>    
            </form>
        </div>
    )
}