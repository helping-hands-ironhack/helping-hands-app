import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import { AuthContext } from "./context/auth.context";
import ngoSignup from "./pages/NgoSignup";

import HomePage from "./pages/HomePage";
import PreSignup from './pages/PreSignup';
import HostSignup from './pages/HostSignup';
import NgoSignup from './pages/NgoSignup';
import LogIn from "./pages/LogIn";

export default function App() {

  const { isLoading, user, authenticateUser, logOutUser } = useContext(AuthContext);

  // if (isLoading) {
  //   return <LoadingComponent />;
  // }
  return (
    <div className="App">
      <Navbar handleLogout={logOutUser} user={user} />
      <Routes>
        {/*{routes({ user, authenticateUser, logOutUser }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}*/}

        <Route path='/' element={<HomePage />} />
        <Route path='/auth/signup' element={<PreSignup />} />
        <Route path='/auth/host/signup' element={<HostSignup />} />
        <Route path='/auth/ngo/signup' element={<NgoSignup />} />
        <Route path='/auth/login' element={<LogIn />} />

      </Routes>
    </div>
  );
}