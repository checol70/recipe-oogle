import React, { Component } from "react";
import Navbar from "../../components/Navbar";

class Add extends Component {

  state = {
    recipeName: "",
    ingredients: "",
    steps: "",
    userID: ""
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
    API.postRecipes(this.state)
      .then(res => {
        
      })
      .catch(err => {
        console.log(`error: ${err}`)
        this.setState({ error: err })
      });
  };
  render() {
    return (
      <div className="container">
        <Navbar />
        <h1>Add Recipe</h1>
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Recipe Name</label>
            <input type="text" className="form-control" name="recipeName" placeholder="Fish Tacos" />

          </div>
          <div className="form-group">
            <label for="ingredients">Ingredients</label>
            <input type="text" className="form-control" name="ingredients" placeholder="Fish, Tortilla, etc.." />
          </div>
          <div className="form-group">
            <label className="form-check-label" for="exampleCheck1">Steps</label>
            <input type="text" className="form-control" name="steps" placeholder="Cook fish, place fish in tortilla, eat" />
          </div>
          <button type="submit" className="btn btn-primary"
            onClick={this.handleFormSubmit}
            type="success"
          >Submit</button>
        </form>
      </div>
    )
  }

}

export default Add;
