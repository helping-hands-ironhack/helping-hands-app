import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingComponent from "./components/Loading";
//import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import { AuthContext } from "./context/auth.context";
import ngoSignup from "./pages/NgoSignup";

import IsNgo from "./components/IsNgo";
import IsHost from "./components/IsHost";
import IsAnon from "./components/IsAnon";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import DonatePage from "./pages/DonatePage";
import PreSignup from './pages/PreSignup';
import Signup from './pages/Signup';
import NgoSignup from './pages/NgoSignup';
import LogIn from "./pages/LogIn";
import HostPage from "./pages/HostPage";
import AddAccommodation from "./pages/AddAccommodationPage";
import AccommodationPage from "./pages/AccommodationPage";
import NgoFeed from "./pages/NgoFeed";
import HostEditPage from "./pages/HostEditPage";
import HostFeed from "./pages/HostFeed";
import NgoProfilePage from "./pages/NgoProfilePage";
import NgoProfileEdit from "./pages/NgoProfileEdit";
import AccommodationCard from "./components/AccommodationCard";

export default function App() {
  const getUserToken = localStorage.getItem('authToken');

  const { isLoading, user, authenticateUser, logOutUser } = useContext(AuthContext);

  useEffect(() => {
    if (getUserToken) {
      return
    }
  })

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/*{routes({ user, authenticateUser, logOutUser }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}*/}

        <Route path='/' element={<HomePage />} />
        <Route path='/auth/signup' element={<PreSignup />} />
        <Route path='/auth/host/signup' element={ <IsAnon> <Signup /> </IsAnon>} />
        <Route path='/auth/ngo/signup' element={ <IsAnon>  <NgoSignup /> </IsAnon> } />
        <Route path='/auth/login' element={ <IsAnon> <LogIn /> </IsAnon> } />

        <Route path='/hostFeed' element={<IsHost> <HostFeed /> </IsHost>} />

        <Route path='/ngoFeed' element={<IsNgo> <NgoFeed /> </IsNgo>} />
        <Route path='/ngooFeed/accomodationOwner' element={<IsNgo> <AccommodationCard /> </IsNgo>} />
        <Route path='/users/:id' element={<HostPage user={user} />} />
        <Route path='/users/:id/edit' element={<HostEditPage user={user} />} />
        <Route path='/ngo/:id' element={<NgoProfilePage />} />
        <Route path='/ngo/:id/edit' element={<NgoProfileEdit user={user} />} />
        <Route path='/accommodation/:id' element={<AccommodationPage user={user} />} />
        <Route path='/users/:id/accommodations/create' element={<AddAccommodation user={user} />} />
        <Route path='/donate' element={<DonatePage />} />

      </Routes>

      <Footer />
    </div>
  );
}