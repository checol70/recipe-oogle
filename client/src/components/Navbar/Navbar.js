import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";



// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
//{console.log(props)} 
const Navbar = props => (
  <div className="container">

    <nav className="navbar navbar-expand-md navbar-light bg-light">

      <div className="container">
        <p className="Name"> Welcome {window.localStorage.getItem("displayName")}
          <span>  </span>
          <span className="login">
            <a href="http://localhost:3001/auth/google">Log in!</a>
          </span>
        </p>

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              to="/"
              className={
                /*  props.location.pathname === "/" ? "nav-link active" : "nav-link" */
                "nav-link"
              }
            >
              Home
      </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/add"
              className={
                /*  props.location.pathname === "/add" ? "nav-link active" : "nav-link" */
                "nav-link"
              }
            >
              Add Recipes
      </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/all"
              className={
                /* props.location.pathname === "/all" ? "nav-link active" : "nav-link" */
                "nav-link"
              }
            >
              All Recipes
      </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  </div>
);

export default Navbar;
