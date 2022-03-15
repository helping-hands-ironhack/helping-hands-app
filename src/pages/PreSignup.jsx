import { Link } from "react-router-dom";
import './auth.css';

export default function PreSignup(){
    return(
        <div className="formBackground">
            <h1>What are you?</h1>
            <h3>Choose the type of user you want to register: </h3>
            <Link to='/auth/host/signup'>
                <button>Host</button>
            </Link>
            
            <Link to='/auth/ngo/signup'>
                <button>NGO</button>
            </Link>
        </div>
    );
};