import logo from "../heartHands.png";
import "../App.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-intro">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Helping Hands</h1>
          <div className="App-div">
            <Link to='/auth/signup' className="App-link">Sign up</Link>
            <Link to='/auth/login' className="App-link">Log in</Link>
            <Link to='/donate' className="App-link Donate">Donate</Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HomePage;
