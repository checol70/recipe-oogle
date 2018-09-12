import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import API from "../..//components/utils/API";
import "./Add.css";

class Add extends Component {

  state = {
    name: "",
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
  handleFormSubmit = event => {
    event.preventDefault();

    // convert list of ingredients from a comma delimited string into an array
    const obj = this.state;
    //console.log(this.state);

    const ingArray = obj.ingredients.split(",");

    // convert steps from a comma delimited string into an array
    const stepsArray = obj.steps.split(",");

    console.log("about to call API postRecipes");
    console.log("obj.ingredients " + obj.ingredients);
    API.postRecipes({
      name: this.state.name,
      ingredients: ingArray,
      steps: stepsArray
    })
      .then(res => {
        this.setState({name: "", ingredients: "", steps: ""});

      })
      .catch(err => {
        console.log(`error: ${err}`);
        this.setState({ error: err });
      })
  };

  render() {
    return (
      <div className="container">
        <Navbar />
        <h1>Add Recipe</h1>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Recipe Name</label>
            <input type="text" className="form-control" name="name" placeholder="Fish Tacos" 
            onChange = {this.handleInputChange} value={this.state.name} />


          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <input type="text" className="form-control" name="ingredients" placeholder="Fish, Tortilla, etc.." 
            onChange = {this.handleInputChange} value={this.state.ingredients}/>
          </div>
          <div className="form-group">
            <label className="form-check-label" htmlFor="exampleCheck1">Steps</label>
            <input type="text" className="form-control" name="steps" placeholder="Cook fish, place fish in tortilla, eat" 
            onChange = {this.handleInputChange} value={this.state.steps}/>

          </div>
          <button type="submit" className="btn btn-primary"
            onClick={this.handleFormSubmit}
          >Submit</button>
        </form>
      </div>
    )
  }

}

export default Add;
