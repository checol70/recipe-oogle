var db = require("../models");
var passport = require("passport");
module.exports = function (app) {
    //this route will return all recipes in the database.
    app.get("/api/recipes/all", (req, res) => {
        db.Recipe.find({}).then(result => {
            console.log(`req.user ${req.user}`)
            res.send(result);
        })
            .catch(err => {
                console.log(err);
                res.end();
            })
    })

    //this is for retrieving another users recipes, so it doesn't need to be authed.
    app.get("/api/users/:displayName", (req, res) => {
        const regex = new RegExp(req.params.displayName, "i");
        db.User.find({ $text: { $search: regex } }, (err, data) => {
            if (err) console.log(err);
            console.log(data);

            const arr = data.map(e => {
                const { displayName, favoriteRecipes } = e
                console.log(displayName, favoriteRecipes)
                return obj = {
                    displayName,
                    favoriteRecipes
                }
            })
            res.send(arr);
        })
    })

    //this route is for getting the current user's recipes.  please note the singular version of user.
    app.get("/api/user/:token", (req,res)=>{
        console.log(req.cookies)
        db.User.findOne({ googleId: req.params.token }, (err, user) => {
            if(err) return console.log(err);
            res.send(user.favoriteRecipes);
        })
    })

    //this route is for posting recipes.  the token argument is in the local storage if they have signed in.
    app.post("/api/recipes/:token", (req, res) => {
        db.User.findOne({ googleId: req.params.token }, (err, user) => {
            if (err) console.log(err);
           
                console.log("now im here")
                req.body.originalUser = user._id;
                req.body.users = [user.id];
                db.Recipe.create(req.body, (err, recipe) => {
                    user.favoriteRecipes.push(recipe._id);
                    user.save((err, updUser) => {
                        res.end();
                    })
                })
           
        })
    })

    //this route is for removing a recipe from favorites
    app.delete("/api/user/:token/:recipeId", (req, res) => {
        //since we are using these alot I assigned them to something shorter.
        const token = req.params.token;
        const id = req.params.recipeId;
        //Here we are finding the user, so that we can remove the recipe from their favorites.  I am making sure that they are authed to keep others from hacking your account and then deleting everything.
        db.User.findOne({googleId: token }, (err, user) => {
            if (user !== null) {
                //this removes the reference from the user.

                console.log(user.favoriteRecipes)

                const i = user.favoriteRecipes.indexOf(id);
                if (i > -1) {
                    user.favoriteRecipes.splice(i, 1);
                    user.save((err, updUser) => {

                        //now we will remove the user from the recipe.
                        db.Recipe.findById(id, (err, recipe) => {
                            if (err) { console.log(err); }
                            if (recipe.users.length <= 1) {
                                //this is the only user with this recipe so we remove it completely
                                db.Recipe.findByIdAndRemove(id, () => {
                                    res.end();
                                })
                            } else {
                                //there are others who have this recipe so we will just remove it from this user.
                                const userIndex = recipe.indexOf(user._id)
                                if (userIndex > -1) {

                                    recipe.users.splice(userIndex, 1);
                                    recipe.save((err, updRecipe) => {
                                        res.end();
                                    })
                                }
                            }
                        })
                    });
                }
                else{
                    res.end();
                }
            }
        })
    })

    //this is for adding recipes to the current users favorites.
    app.put("/api/recipes/:id/:token", (req, res) => {
        db.User.findOne({ googleId: req.params.token }, (err, user) => {
            if (err) return console.log(err);
            user.favoriteRecipes.push(req.params.id);
            user.save((err, updUser) => {
                db.Recipe.findById(req.params.id).exec((err, recipe) => {
                    recipe.users.push(updUser._id)
                    recipe.save((err, updRecipe) => {
                        const { favoriteRecipes } = updUser
                        //I am sending the favorites back so that the front end can update the favoriteRecipes state.
                        res.send(favoriteRecipes);
                    })
                })
            })
        })
    })

    //this is for searching recipes
    app.get("/api/recipes/:query", (req, res) => {
        const regex = new RegExp(req.params.query, "i");
        db.Recipe.find({ $text: { $search: regex } }, (err, data) => {
            if (err) console.log(err);
            res.send(data);
        })
    })
}