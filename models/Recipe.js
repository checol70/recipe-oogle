const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    ingredients:[{
        type:String,
        required:true
    }],
    steps:[{
            type:String,
        required:true
    }],
    originalUser:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    users:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]
})
RecipeSchema.index({name:'text', ingredients:'text'});
const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports= Recipe;