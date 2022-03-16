import { useState } from "react";
import './DonatePage.css';

export default function DonatePage(){

    const [donated, setDonated] = useState(false);

    const handleDonate = (e) => {
        e.preventDefault();
        setDonated(true);
    }

    return(
        <div className='donateBackground'>
            <div className="donateHeader">
                <p>Helping Hands focuses on locating conflict victims who are looking for shelter. However, if you cannot host anybody but still want to help, you can freely donate here.</p>
            </div>
            <div className="donationFormContainer">
                <h1>Donate</h1>
                <div className="formWrapper">
                    {donated ? 
                    <div className="donatedDiv">
                        <div>
                            <p>Thank you for your donation! You just helped somebody in need.</p>
                        </div>
                        <button onClick={()=> setDonated(false)} className='donateBtn'>Donate again</button>
                    </div>
                    :
                    <form onSubmit={handleDonate}>
                        <div className="creditCardInput">
                            <label>First name:</label>
                            <input required/>
                        </div>

                        <div className="creditCardInput">
                            <label>Last name:</label>
                            <input required/>
                        </div>

                        <div className="creditCardInput">
                            <label>Email address:</label>
                            <input required/>
                        </div>
                        
                        <div className="creditCardInput">
                            <label>Credit Card Number:</label>
                            <input required/>
                        </div>
                        
                        <div className="creditCardInput">
                            <label>Security Code:</label>
                            <input type='number' placeholder="CVC" required/>
                        </div>
                        
                        <div className="creditCardInput">
                            <label>Security Code:</label>
                            <input placeholder="YY/MM" required/>
                        </div>
                        
                        <div className="creditCardInput">
                            <label>Quantity(€):</label>
                            <input required/>
                        </div>

                        <button type='submit' className="donateBtn">Donate</button>
                    </form>}
                </div>
            </div>
        </div>
    );
};