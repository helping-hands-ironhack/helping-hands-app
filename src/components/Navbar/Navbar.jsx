import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import LoadingComponent from "../Loading";
import logo from '../../heartHands.png';
import logoNeg from '../../heartHandsNeg.png';

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

  function uncheck() {
    document.getElementById('checkedMenu').checked = false;
  }
  
  if (user) {
    isNgo = (user.isNgo);
  }
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    {/*<nav>
      <Link to={PATHS.HOMEPAGE} className="nav__projectName">
        <img src={logo} alt='' className="nav-logo"/>
      </Link>

      <div className="nav__authLinks">
        {(isLoggedIn && user && user._id) && (
          isNgo?
          <>
            <Link to={`/ngo/${user._id}`} className="authLink">
              My NGO profile
            </Link>
            <Link to={`/ngoFeed`} className="authLink">
              List of hosts
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
            <Link to={`/hostFeed`} className="authLink">
              List of NGOs
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

    </nav>*/},

    <nav>
      {(isLoggedIn && user && user._id) && (
        isNgo?
        <div className="navbar">
          <div className="container nav-container">
            <input className="checkbox" type='checkbox' id='checkedMenu'/>
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="logo">
              <Link to='/' >
                <img src={logoNeg} alt='' className="nav-logo" />
              </Link>
            </div>
            <div className="menu-items">
              <li><Link to='/ngoFeed' onClick={uncheck}>Available hosting</Link></li>
              <hr/>
              <li><Link to={`/ngo/${user._id}`} onClick={uncheck}>Profile</Link></li>
              <hr/>
              <li><button className="nav-logoutbtn" onClick={logOutUser}>
                Logout
              </button></li>
            </div>
          </div>
        </div>
        :
        <div className="navbar">
          <div className="container nav-container">
            <input className="checkbox" type='checkbox' id='checkedMenu'/>
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="logo">
              <Link to='/' >
                <img src={logoNeg} alt='' className="nav-logo" />
              </Link>
            </div>
            <div className="menu-items">
              <li><Link to='/hostFeed' onClick={uncheck}>NGOs</Link></li>
              <hr/>
              <li><Link to={`/users/${user._id}`} onClick={uncheck}>Profile</Link></li>
              <hr/>
              <li><button className="nav-logoutbtn" onClick={logOutUser}>
                Logout
              </button></li>
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="navbar">
          <div className="container nav-container">
            <input className="checkbox" type='checkbox' id="checkedMenu"/>
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="logo">
              <Link to='/' >
                <img src={logoNeg} alt='' className="nav-logo" />
              </Link>
            </div>
            <div className="menu-items">
              <li><Link to='/auth/signup' onClick={uncheck}>Sign up</Link></li>
              <hr/>
              <li><Link to='/auth/login' onClick={uncheck}>Log in</Link></li>
              <hr/>
              <li><Link to='/donate' onClick={uncheck}>Donate</Link></li>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
