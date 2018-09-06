const mongoose = require("mongoose");
const db = require("../models");

// this file is for seeding our local machines.

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/recipeoogle"
)

const userSeed = {
       googleId: 107597886067898717683,
       displayName: "Recipe Oogle"
    }

const recipeSeed = [
    {
        name: "Aunt Virginia's Tortellini Soup",
        ingredients: [
            "7 oz cheese tortellini",
        "1 chopped onion",
        "2 chopped garlic cloves",
        "1 T olive oil",
        "1 t basil",
        "1/2 - 3/4 C salsa",
        "8 cups beef bouillon",
        "6 C water",
        "Parmesan cheese"],
        steps: [

            `Chop onion and garlic`,
            `Simmer onion and garlic with olive oil`,
            `Add water and bring to a boil`,
            `Add beef bouillon and stir until disolved`,
            `Add tortellini and cook for approx 5 minutes until done`,
            `Serve in bowls, and sprinkle with Parmesan cheese`
        ]
    },{
        name: "Balsamic Salad Dressing",
        ingredients: [
            "3 T balsamic vinegar",
            "1 T honey more or less to taste",
            "1 T Dijon mustard",
            "1 clove garlic crushed",
            "1/2 T dried oregano",
            "salt and pepper to taste",
            "1/3 C olive oil or more if needed"
        ],
        steps: [
            "Combine balsamic vinegar, honey, mustard, garlic, oregano, salt and pepper in foot processor",

            "Turn the foot processor on and pour olive oil in a steady stream into mixture until salad dressing is this and creamy.",
            
            "Store up to 2 weeks in refrigerator in a shakable sealed container"   
        ]
    }
]

db.Recipe.remove({}).exec();
db.User.remove({}).exec();

function seedUser(){
    db.User.findOne({googleId: 107597886067898717683}).exec((err,user)=>{
        console.log(user);
        if(user!== null){
            //just seed recipes
            console.log("seeding Recipes", user._id);
            seedRecipes(user._id)
        } else {
            //seed userdb then recursivly call this to make sure we have this working

            db.User.create(userSeed).then(e=>{
                console.log(e);
                seedUser();
            })
        }
    })
}
function seedRecipes(id){
    recipeSeed.forEach((e)=>{
        e.originalUser = id;
        e.users = [id];
        console.log(e);
        db.Recipe.create(e);
    })
    setTimeout(() => {
        mongoose.disconnect();
    }, 1000);
}
seedUser();