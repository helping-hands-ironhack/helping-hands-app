import React, { useState } from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";

export default function HostSignup({ authenticate }) {
  const { firstName, lastName, email,  password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      firstName,
      lastName,
      email,
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
      <h1>Sign Up as a host</h1>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-firstname">First Name</label>
        <input
          id="input-firstname"
          type="text"
          name="firstname"
          value={firstName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-lastname">Last Name</label>
        <input
          id="input-lastname"
          type="text"
          name="lastname"
          value={lastName}
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
}