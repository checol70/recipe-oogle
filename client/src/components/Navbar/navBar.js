import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  {console.log(props)}
    
    <div>
    <p> Welcome {window.localStorage.getItem("displayName")}</p>
    </div>
    <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link
        to="/"
        className={
          props.location.pathname === "/" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/add"
        className={
          props.location.pathname === "/add" ? "nav-link active" : "nav-link"
        }
      >
        Add Recipes
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/all"
        className={
          props.location.pathname === "/all" ? "nav-link active" : "nav-link"
        }
      >
        All Recipes
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/contact"
        className={
          props.location.pathname === "/contact" ? "nav-link active" : "nav-link"
        }
      >
        Contact
      </Link>
    </li>
  </ul>
  </nav>
);

export default Navbar;