import { Link } from "react-router-dom";
import './auth.css';

export default function PreSignup(){
    return(
        <div className="formBackground">
            <div className="formContainer">
                <h1>Who are you?</h1>
                <h3>Choose the type of user you want to register</h3>
                <div className="choiceBtns">
                    <Link to='/auth/host/signup' className="choiceSingleBtn">
                        Host
                    </Link>
                
                    <Link to='/auth/ngo/signup' className="choiceSingleBtn">
                        NGO
                    </Link>
                </div>
            </div>
        </div>
    );
};