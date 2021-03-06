import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";



// Depending on the current path, this component sets the "active" class on the appropriate navigation link item 
const Navbar = props => (
  <div className="container">

    <nav className="navbar navbar-expand-md navbar-light bg-light">

      <div className="container">
        <p className="Name"> Welcome {window.localStorage.getItem("displayName")}
          <span>  </span>
          <span className="login">
            <a href="https://recipeoogle.herokuapp.com/auth/google">Log in!</a>
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
              to="/myfavorites"
              className={
                /* props.location.pathname === "/all" ? "nav-link active" : "nav-link" */
                "nav-link"
              }
            >
              My Favorites
      </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  </div>
);

export default Navbar;
