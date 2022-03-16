import React, { useContext, useState } from "react";
import axios from 'axios';
import { login } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
//import "./Signup";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { AuthContext } from "../context/auth.context";
import './auth.css';

export default function LogIn(props){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { loginUser, errorMessage } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return(
    <div className="formBackground">
      <div className="formContainer">
        <h1>Log in</h1>
        <form onSubmit={handleLoginSubmit} className="signup__form">
          <div className="labelInput">
            <label htmlFor="input-email">Email:</label>
            <input
              id="input-email"
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>

          <div className="labelInput">
            <label htmlFor="input-password">Password:</label>
            <input
              id="input-password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              required
              minLength="8"
            />
          </div>

          {errorMessage && (
            <div className="error-block">
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="buttonSubmit">
            <button className="button__submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="changePage">
        <p>Not registered yet?</p>
        <Link to='/auth/signup'>Sign up</Link>
      </div>
    </div>
  );
};

/*
export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = form;
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
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleFormSubmission} className="signup__form">
        <label htmlFor="input-username">Username</label>
        <input
          id="input-username"
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
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
}
*/
