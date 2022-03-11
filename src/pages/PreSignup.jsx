import { Link } from "react-router-dom";

export default function PreSignup(){
    return(
        <div>
            <h1>What are you?</h1>
            <p>Choose the type of user you want to create: </p>
            <Link exact to='/auth/host/signup'>
                <button>Host</button>
            </Link>
            
            <Link exact to='/auth/ngo/signup'>
                <button>NGO</button>
            </Link>
        </div>
    );
};