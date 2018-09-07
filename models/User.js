const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId:{
        type: String,
        required: true
    },
    displayName:{
        type:String,
        required:true
    },
    token:{
        type: String,
        required: false
    },
    favoriteRecipes:[{
        type: Schema.Types.ObjectId,
        ref: "Recipe"
    }]
})

const User = mongoose.model("User", UserSchema);

module.exports= User;