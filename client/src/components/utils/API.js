import axios from "axios";

// Export an object containing methods we'll use for accessing the Recipes Mongo DB
// We will search for all recipes for a user, or for all recipes in general or
// for recipes that meet a search name criteria

export default {
  getUserRecipes: function(userName) {
    return axios.get("/api/users/" + userName);
  },
  getAllRecipes: function() {
    return axios.get("/api/recipes/all");
  },
  getSearchedRecipes: function(search) {
    return axios.get("/api/recipes/" + search);
  },
  postRecipes: function(recipe) {
    return axios.post("/api/recipes/" + window.localStorage.getItem("tkn"), recipe);
  },
  addToFavorites: function(recipeID) {
    return axios.put("/api/recipes/" + recipeID + "/" + window.localStorage.getItem("tkn"));
  },
  getFavorites: function() {
    return axios.get("api/user/" + window.localStorage.getItem("tkn"));
  }
};
