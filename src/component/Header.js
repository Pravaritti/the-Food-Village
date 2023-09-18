import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/foodvilla.jpg";

const loggedInUser = () => {
  //API call to check authentication
};

const Title = () => (
  <a href="/">
    <img className="logo" alt="logo" src={Logo} />
  </a>
);
const Header = () => {
  const [title, setTitle] = useState("FOOD VILLA");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="header">
      <Title />
      {/*<button onClick={() => setTitle(" NEW FOOD VILLA ")}>
        click here to change title
      </button>
  <h1>{title}</h1>*/}

      <div className="nav-items">
        <ul>
          <Link to="/">
            <li> Home </li>
          </Link>

          <Link to="/about">
            <li> About </li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          <Link to="/cart">
            <li>Cart</li>
          </Link>
        </ul>
      </div>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
};

export default Header;
