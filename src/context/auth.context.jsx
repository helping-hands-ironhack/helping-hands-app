import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
const API_URL = 'http://localhost:5005'

const AuthContext = createContext();

function AuthProviderWrapper(props){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isNgo, setIsNgo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');

        if(storedToken){
            axios.get(
                `${API_URL}/api/auth/verify`,
                { headers: { Authorization: `Bearer ${storedToken}`} }
            )
            .then((response) => {
                const user = response.data;
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(user);

                if(response.data.isNgo) setIsNgo(true);
            })
            .catch((error) => {      
                setIsLoggedIn(false);
                setIsLoading(false);
                setUser(null);
            });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
            setIsNgo(false);
        };
    };

    const removeToken = () => {
        localStorage.removeItem("authToken");
    };

    const loginUser = (email, password) => {
        const requestBody = { email, password };
    
        axios
        .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, requestBody)
        .then((response) => {
            storeToken(response.data.authToken);
            setErrorMessage(undefined);
            return authenticateUser();
        })
        .catch((error) => {
          setErrorMessage('There was an error, please review your credentials.');
        })
    };

    // Un poco chusquero pero funciona, mirar si se puede hacer de otra manera
    useEffect(()=>{
        if(isNgo) navigate('/ngoFeed');
        else navigate('/hostFeed');
    }, [user, isNgo]);

    const logOutUser = () => {
        removeToken();  
        authenticateUser();
        navigate("/")
    };  

    useEffect(() => {
        authenticateUser();
    }, []);

    return(
        <AuthContext.Provider value={{
            isLoggedIn,
            isNgo,
            isLoading,
            user,
            errorMessage,
            storeToken,
            authenticateUser,
            loginUser,
            logOutUser
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export{ AuthContext, AuthProviderWrapper };