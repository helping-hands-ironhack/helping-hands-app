import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {

  const {isLoggedIn, user, logOutUser} = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState("")
  let isNgo;
  let isHost;

  useEffect(() => {                          
    setUserInfo(user)
  }, [user] );
  
  console.log(user);
  if (user) {
    isNgo = (user.isNgo);
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
            <Link to={`/users/`} className="authLink">
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
