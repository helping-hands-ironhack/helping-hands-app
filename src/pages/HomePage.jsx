import logo from "../logo.svg";
import "../App.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>This is gonna be a beautiful logo</h1>
        <p>Welcome to Helping Hands</p>
        <a
          className="App-link"
          href="/"
        >
        </a>
        <Link to='/auth/signup' className="App-link">Sign up</Link>
        <Link to='/auth/login' className="App-link">Log in</Link>
        <Link to='/donate' className="App-link">Donate</Link>
      </header>
    </div>
  );
}

export default HomePage;
