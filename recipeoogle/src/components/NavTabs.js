import React from "react";

const NavTabs = props => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("Home")}
        className={
          props.currentPage === "Home" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("Add")}
        className={
          props.currentPage === "Add" ? "nav-link active" : "nav-link"
        }
      >
        Add Recipes
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("All")}
        className={
          props.currentPage === "All" ? "nav-link active" : "nav-link"
        }
      >
        All Recipes
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("Contact")}
        className={
          props.currentPage === "Contact" ? "nav-link active" : "nav-link"
        }
      >
        Contact
      </a>
    </li>
  </ul>
);

export default NavTabs;
