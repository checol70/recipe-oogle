import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import SearchResults from "../../components/SearchResults"
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
        
      </div>
    )
  }

}

export default Add;
