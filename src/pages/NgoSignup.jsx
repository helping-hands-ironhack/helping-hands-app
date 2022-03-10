import React, { useState } from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";

export default function ngoSignup({ authenticate }) {
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
}
