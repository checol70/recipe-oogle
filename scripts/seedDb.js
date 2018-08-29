const mongoose = require("mongoose");
const db = require("../models");

// this file is for seeding our local machines.

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/recipes"
)

const userSeed = [
    {
        username: "Colton",
        password: "HiColton"        
    },{
        username: "Carol",
        password: "HiCarol"
    },{
        username: "Micheal",
        password: "HiMicheal"
    }
]

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
        ],
        users: []
    },{
        name: "Balsamic Salad Dressing",
        ingredients: [
            "3 T balsamic vinegar",
            "1 T honey more or less to taste",
            "1 T Dijon mustard",
            "1 clove garlic crushed",
            "1/2 T dried oregano",
            "salt and pepper to taste",
            "1/3 C olilve oil or more if needed"
        ],
        steps: [
            "Combine balsamic vinegar, honey, mustard, garlic, oregano, salt and pepper in foot processor",

            Turn the foot processor on and pour olive oil in a steady stream into mixture until salad dressing is this and creamy.
            
            Store up to 2 weeks in refrigerator in a shakable sealed containe"   
        ],
        users:[]
    }
]