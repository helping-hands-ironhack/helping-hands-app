import { useState } from "react";

export default function DonatePage(){

    const [donated, setDonated] = useState(false);

    const handleDonate = (e) => {
        e.preventDefault();
        setDonated(true);
    }

    return(
        <div>
            <p>Helping Hands focuses on locating conflict victims who are escaping. However, if you cannot host anybody but still want to help, you can freely donate here.</p>

            <h1>DONATE</h1>
            {donated ? 
            <div>
                <p>Thank you for your donation! You just helped somebody in need.</p>
                <button onClick={()=> setDonated(false)}>Donate again</button>
            </div>
            :
            <form onSubmit={handleDonate}>
                <label>First name:</label>
                <input required/>

                <label>Last name:</label>
                <input required/>

                <label>Email address:</label>
                <input required/>
                
                <label>Credit Card Number:</label>
                <input required/>
                
                <label>Security Code:</label>
                <input type='number' placeholder="CVC" required/>
                
                <label>Security Code:</label>
                <input placeholder="YY/MM" required/>
                
                <label>Quantity(€):</label>
                <input required/>

                <button type='submit'>Donate</button>
            </form>}
        </div>
    );
};