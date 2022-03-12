import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import LoadingComponent from "../Loading";

const Navbar = (props) => {

  const {isLoggedIn, user, logOutUser, authenticateUser,} = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  let isNgo;
  let isHost;

  useEffect(() => {                          
    authenticateUser()
    setIsLoading(false)
  },[]);
  
  if (user) {
    isNgo = (user.isNgo);
  }
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className="nav__projectName">
        {CONSTS.CAPITALIZED_APP} - created with IronLauncher
      </Link>

      <div className="nav__authLinks">
        {isLoggedIn && (
          isNgo?
          <>
            <Link to={`/users/`} className="authLink">
              My NGO profile
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
          :
          <>
            <Link to={`/users/${user._id}`} className="authLink">
              My profile
            </Link>
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
