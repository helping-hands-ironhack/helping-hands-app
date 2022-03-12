import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState("")

  console.log(props);
  useEffect(() => {
    setUserInfo(user)
  }, [user]);

  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className="nav__projectName">
        {CONSTS.CAPITALIZED_APP} - created with IronLauncher
      </Link>

      <div className="nav__authLinks">
        {isLoggedIn && (
          <>
            <Link to={`/users/`} className="authLink">
              My profile
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>

            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>

        )}

        {!isLoggedIn && (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
