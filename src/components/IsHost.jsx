import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsHost( { children } ) {
  
  const { isLoggedIn, isNgo, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn || isNgo ) {
    return <Navigate to="/" />;
  } else {
    return children;
  };
};

export default IsHost;
