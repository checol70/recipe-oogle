import React from "react";

const Add = () => (
  <div className="container">
    <h1>Add Recipe</h1>
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Recipe Name</label>
    <input type="text" class="form-control" id="recipeName" placeholder="Fish Tacos"/>
  
  </div>
  <div class="form-group">
    <label for="ingredients">Ingredients</label>
    <input type="text" class="form-control" id="ingredients" placeholder="Fish, Tortilla, etc.."/>
  </div>
  <div class="form-group">
    <label class="form-check-label" for="exampleCheck1">Steps</label>
    <input type="text" class="form-control" id="steps" placeholder="Cook fish, place fish in tortilla, eat"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>

);

export default Add;
