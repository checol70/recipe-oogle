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
    if (search === ""){
      search = "all"
    }
    return axios.get("/api/recipes/" + search);
  },
  postRecipes: function(recipe) {
    //puts up a new recipe
    return axios.post("/api/recipes", recipe);
  },
  addToFavorites: function(recipeID) {
    //favorites a recipe
    return axios.put("/api/recipes/" +recipeID);
  },
  getFavorites: function() {
    //search user table to get user favorite recipe ids, for displaying which ones are favorited
    return axios.get("api/user");
  },
  removeFavorites: (recipeId)=>{
    //removes from favorites, and deletes when the last user unfavorites.
    return axios.delete(`/api/user/${recipeId}`);
  },
  getPopulatedFavorites: ()=>{
    //gets populated favorites for when we want a user to see our favorites.
    return axios.get(`/api/user/recipes`)
  }
};
