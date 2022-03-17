import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from 'axios';
import './auth.css';
const API_URL = process.env.REACT_APP_SERVER_URL;


export default function NgoSignup(props){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cif, setCif] = useState('');
  const [description, setDescription] = useState('');
  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  let navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleCif = (e) => setCif(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = {name, cif, email, password, description}

    axios
    .post(`${API_URL}/auth/ngo/signup`, requestBody)
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })

   setSubmit(true);
  };

useEffect(() => {
  if(submit) {
    navigate('/auth/login')
  }
},);

  return(
    <div className="formBackground">
      <div className="formContainer">
        <h1>Sign up as an NGO</h1>
        <form onSubmit={handleSignupSubmit} className="signup__form">
          <div className="labelInput">
            <label htmlFor="input-name">Organization name:</label>
            <input
              id="input-name"
              type="text"
              name="name"
              value={name}
              onChange={handleName}
              required  
            />
          </div>
          
          <div className="labelInput">
            <label htmlFor="input-cif">CIF:</label>
            <input
              id="input-cif"
              type="text"
              name="cif"
              value={cif}
              onChange={handleCif}
              required
            />
          </div>

          <div className="labelInput">
            <label htmlFor="input-cif">Ngo Description:</label>
            <input
              id="input-description"
              type="text"
              name="cif"
              value={description}
              onChange={handleDescription}
              required
            />
          </div>

          <div className="labelInput">
            <label htmlFor="input-email">Email:</label>
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
          </div>


          {errorMessage && (
            <div className="error-block">
              <p>There was an error submiting the form:</p>
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="buttonSubmit">
            <button className="button__submit" type="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div className="changePage">
        <p>Already a member?</p>
        <Link to='/auth/login'>Log in</Link>
      </div>
    </div>
  );
};

/*
export default function Signup({ authenticate }) {
<<<<<<< HEAD
<<<<<<< HEAD
export default function ngoSignup({ authenticate }) {
=======
>>>>>>> 275761bd26aec576e270fdeeda77d3603b9150bd
=======
>>>>>>> 01023a95132b7c78ed99d52e7f2e43f34882f501
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
