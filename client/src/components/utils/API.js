import axios from "axios";

// Export an object containing methods we'll use for accessing the Recipes Mongo DB
// We will search for all receipes for a user, or for all recipes in general or
// for recipes that meet a search name critera

export default {
  getUserRecipes: function(userName) {
    return axios.get("/api/users/" + userName);
  },
  getAllRecipes: function() {
    return axios.get("/api/recipes/all");
  },
  getSearchedRecipes: function(search) {
    return axios.get("/api/recipes/" + search);
  }
};
