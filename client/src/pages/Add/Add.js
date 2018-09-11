import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import "./Add.css";

class Add extends Component {

  state = {
    recipeName: "",
    ingredients: "",
    steps: ""
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <br></br>
          <div className="add">Add a<span> </span>
            <span className="google-logo"><span className="google-R">R</span>
              <span className="google-e">e</span><span className="google-o2">c</span>
              <span className="google-R">i</span><span className="google-l">p</span>
              <span className="google-o1">e</span></span></div>
          <br></br>
          <form>
            <div className="form-group">
              <label className="label" for="exampleInputEmail1">Recipe Name</label>
              <input type="text" className="form-control" name="recipeName" placeholder="Fish Tacos" />

            </div>
            <div className="form-group">
              <label className="label" for="ingredients">Ingredients</label>
              <input type="text" className="form-control" name="ingredients" placeholder="Fish, Tortilla, etc.." />
            </div>
            <div className="form-group">
              <label className="form-check-label" for="exampleCheck1">Steps</label>
              <input type="text" className="form-control" name="steps" placeholder="Cook fish, place fish in tortilla, eat" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }

}

export default Add;
