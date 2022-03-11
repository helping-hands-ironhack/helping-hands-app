import React, { useState } from "react";
import { signup } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from 'axios';
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
const API_URL = 'http://localhost:5005';


export default function Signup(props){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlefirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = {firstName, lastName, email, password}
    console.log(requestBody);

    axios
    .post(`${API_URL}/api/auth/signup`, requestBody)
    .then((__) => navigate('/login'))
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
  };

  return(
    <div>
      <h1>Sign Up as an NGO</h1>
      <form onSubmit={handleSignupSubmit} className="auth__form">
        <label htmlFor="input-firstName">First name:</label>
        <input
          id="input-firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={handlefirstName}
          required  
        />
        
        <label htmlFor="input-lastName">Last name:</label>
        <input
          id="input-lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastName}
          required
        />
        
        <label htmlFor="input-email">Your email:</label>
        <input
          id="input-email"
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
          required
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          required
          minLength="8"
        />

        {errorMessage && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{errorMessage}</p>
          </div>
        )}

        <button className="button__submit" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

/*
export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    cif: "",
    password: ""
  });
  const { username, password, email, cif } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      email,
      cif,
      password
    };
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      // successful signup
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

  return (
    <div>
      <h1>Sign Up as NGO</h1>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-ngoname">NGO Name</label>
        <input
          id="input-ngoname"
          type="text"
          name="ngoname"
          value={username}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-email">E-mail</label>
        <input
          id="input-email"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-cif">CIF</label>
        <input
          id="input-cif"
          type="text"
          name="text"
          value={cif}
          onChange={handleInputChange}
          required
        />
        
        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="4"
        />

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}*/
