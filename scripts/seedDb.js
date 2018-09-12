const mongoose = require("mongoose");
const db = require("../models");

// this file is for seeding our local machines.

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/recipeoogle"
)

const userSeed = {
    googleId: '107597886067898717683',
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
    }, {
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
            "Combine balsamic vinegar, honey, mustard, garlic, oregano, salt and pepper in food processor",

            "Turn the food processor on and pour olive oil in a steady stream into mixture until salad dressing is this and creamy.",

            "Store up to 2 weeks in refrigerator in a shakable sealed container"
        ]
    }, {
        name: "Mom's Meatballs",
        ingredients: [
            "1 lb hamburger",
            "1 Cup bread crumbs (torn bread soaked in a little water)",
            "1 egg",
            "1  t parsely",
            "1 t garlic salt",
            "2 T parmesian cheese",
            "1/4 t pepper"
        ],
        steps: [
            "Combine all ingredients",

            "Line baking sheet with foil.",

            "Roll mixture into balls about 1.25 inches in diameter and place evenly spaced on baking sheet.",

            "Broil turning once until browned/cooked"

        ]
    }, {
        name: "Red Rice",
        ingredients: [
            "2/3 C regular rice",
            "2 T butter or margarine",
            "1 can 14 1/2 oz Swansons chicken broth or 2 chicken bouillon cubes",
            "1/2 cup mild salsa"
        ],
        steps: [
            "Brown rice and melted butter in sauce pan",

            "Stir in chicken broth and salsa",

            "Heat to boiling and then reduce to low and cover",

            "Stir often",

            "Simmer for 20 minutes or until rice is tender and liquick is absorbed"

        ]
    }, {
        name: "Sour Cream Chicken Enchiladas",
        ingredients: [
            "1 C cooked shredded chicken",
            "1 C sour cream",
            "1 small can green chilis",
            "flour tortillas",
            "enchilada sauce",
            "shredded cheddar cheese",
            "salt and pepper",
            "salsa",
            "2 T vegetable oil"
        ],
        steps: [
            "Preheat oven to 350",

            "Combine chicken, sour cream, green chilis, and salt and pepper to taste",

            "Brown tortillas in skillet will a small amount of oil",

            "Lightly grease baking dish",

            "Spoon mixture into each tortilla, roll and place in backing dish",

            "cover with enchilada sauce and top with shredded cheese.",

            "Bake at 350 for approximately 15 minutes"

        ]
    }

]
//107597886067898717683
//107597886067898710000
db.Recipe.remove({}).exec();
db.User.remove({}).exec();

function seedUser() {
    db.User.findOne({ googleId: '107597886067898717683' }).exec((err, user) => {
        if (user !== null) {
            //just seed recipes
            seedRecipes(user._id)
        } else {
            //seed userdb then recursivly call this to make sure we have this working

            db.User.create(userSeed).then(e => {
                seedUser();
            })
        }
    })
}
function seedRecipes(id) {
    recipeSeed.forEach((e) => {
        e.originalUser = id;
        e.users = [id];
        db.Recipe.create(e, (err, data) => {
            if (err) console.log(err);
            db.User.findById(id, (err, res) => {
                res.favoriteRecipes.push(data._id);
                res.save((err, updUser) => {

                })
            })
        })
    })
    setTimeout(() => {
        mongoose.disconnect();
    }, 1000);
}
seedUser();