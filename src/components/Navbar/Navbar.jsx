import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {

  const {isLoggedIn, user} = useContext(AuthContext);

  let isNgo;
  let isHost;
  if (user) {
    isNgo = user.isNgo;
    isHost = !user.isNgo;
  }

  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className="nav__projectName">
        {CONSTS.CAPITALIZED_APP} - created with IronLauncher
      </Link>

      <div className="nav__authLinks">
        {isLoggedIn && (
          isNgo ? <>
            <h1>THIS IS THE NGO NAVBAR</h1>
            <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </> : <>
            <h1>THIS IS THE HOST NAVBAR</h1>
            <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
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
