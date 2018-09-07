import React from "react";
import {Link} from "react-router-dom";
const NavTabs = props => (
  <ul className="nav nav-tabs">
  {console.log(this.props)}
    <li className="nav-item">
      <Link
        to="/"
        className={
          this.props.location.pathname === "/" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/add"
        className={
          this.props.location.pathname === "/add" ? "nav-link active" : "nav-link"
        }
      >
        Add Recipes
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/all"
        className={
          this.props.location.pathname === "/all" ? "nav-link active" : "nav-link"
        }
      >
        All Recipes
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/contact"
        className={
          this.props.location.pathname === "/contact" ? "nav-link active" : "nav-link"
        }
      >
        Contact
      </Link>
    </li>
  </ul>
);

export default NavTabs;
