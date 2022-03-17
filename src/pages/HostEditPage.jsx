import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./auth.css";
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;



export default function HostEditPage(props) {
    const {logOutUser} = useContext(AuthContext)

    const [email, setEmail] = useState(props.user.email);
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlefirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const requestBody = { firstName, lastName, email, imageUrl: imageUrl }

        axios
            .put(`${API_URL}/users/${props.user._id}`, requestBody)
            .then((__) => navigate(`/auth/login`))
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    //Cloudinary setup
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
        <div className="formBackground">
            <div className="formContainer">
                <h1>Edit your profile</h1>
                <form onSubmit={handleSignupSubmit} className="auth__form">
                    <div className="labelInput">
                        <label htmlFor="input-firstName">First name:</label>
                        <input
                            id="input-firstName"
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handlefirstName}
                            required
                        />
                    </div>

                        <div className="labelInput">
                            <label htmlFor="input-lastName">Last name:</label>
                            <input
                                id="input-lastName"
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={handleLastName}
                                required
                            />
                        </div>

                        <div className="labelInput">
                            <label htmlFor="input-email">Your email:</label>
                            <input
                                id="input-email"
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleEmail}
                                required
                            />
                        </div>

                        <div className="labelInput">
                            <input type="file" onChange={(e) => handleFileUpload(e, setImageUrl)} />
                            {imageUrl && (
                                <>
                                    <img src={imageUrl} alt="image" style={{'max-width': '40vw'}}/>
                                </>
                            )}
                        </div>

                        {errorMessage && (
                            <div className="error-block">
                                <p>There was an error submiting the form:</p>
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <div className="buttonSubmit">
                            <button className="button__submit" type="submit">
                                Modify
                            </button>
                        </div>
                    </form>

            </div>
        </div>
    );
};
