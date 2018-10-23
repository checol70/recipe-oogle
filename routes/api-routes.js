var db = require("../models");
var passport = require("passport");
module.exports = function (app) {
    //this route will return all recipes in the database.
    app.get("/api/recipes/all", (req, res) => {
        db.Recipe.find({}).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.log(err);
                res.end();
            })
    })

    //this is used to log the user out
    
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    //this is for retrieving another users recipes, so it doesn't need to be authed.
    app.get("/api/users/:displayName", (req, res) => {
        const regex = new RegExp(req.params.displayName, "i");
        db.User.find({ $text: { $search: regex } }, (err, data) => {
            if (err) console.log(err);

            const arr = data.map(e => {
                const { displayName, favoriteRecipes } = e
                return obj = {
                    displayName,
                    favoriteRecipes
                }
            })
            res.send(arr);
        })
    })

    //this route is for getting the current user's recipes, so that we can show which ones are favorited, and which ones aren't.
    app.get("/api/user", (req,res)=>{
        db.User.findById(req.user._id, (err, user) => {
            if(err) return console.log(err);
            if(user){
                res.send(user.favoriteRecipes);
            }else{
                res.send([]);
            }
        })
    })

    //this gets the users recipes so that we can display them.
    app.get("/api/user/recipes", (req,res)=>{
        db.User.findById(req.user._id)
        .populate("favoriteRecipes")
        .exec((err, user) => {
            if(err) return console.log(err);
            if(user){
                res.send(user.favoriteRecipes);

            }else{
                res.redirect("/auth/google");
            }
        })
    })

    //this route is for posting recipes.  the token argument is in the local storage if they have signed in.
    app.post("/api/recipes", (req, res) => {
        db.User.findById(req.user._id, (err, user) => {
            if (err) console.log(err);
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
    app.delete("/api/user/:recipeId", (req, res) => {
        //since we are using these alot I assigned them to something shorter.
        const id = req.params.recipeId;
        //Here we are finding the user, so that we can remove the recipe from their favorites.  I am making sure that they are authed to keep others from hacking your account and then deleting everything.
        const i = req.user.favoriteRecipes.indexOf(id);
        req.user.favoriteRecipes.splice(i,1)

        //this is for updating the user in the db.
        db.User.findByIdAndUpdate(req.user._id, req.user,(err,user)=>{
            if(err) return console.log(err);
            res.end();
        })
    })

    //this is for adding recipes to the current users favorites.
    //:id is the recipe id and :token is the user id
    app.put("/api/recipes/:id", (req, res) => {
        db.User.findOne({ googleId: req.user.googleId }, (err, user) => {
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