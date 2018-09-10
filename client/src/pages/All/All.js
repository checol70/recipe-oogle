import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

class Add extends Component {

  state = {
    recipes:[]
  }

  componentDidMount=()=>{
    axios.get("/api/recipes/all")
  }

  render() {
    return (
      <div className="container">
      <Navbar />
        <p>Getting all recipes</p>
      </div>
    )
  }

}

export default Add;
