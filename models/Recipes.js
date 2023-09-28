import mongoose, { Schema } from "mongoose";

const RecipesSchmea = new mongoose.Schema(
  {
    //mealName,instruction,ingredient,youtubeSource
    mealName: {
      type: String,
      required: true,
      trim: true,
    },
    instruction: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeSource: {
      type: String,
      required: true,
      trim: true,
    },
    recipeImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipes = mongoose.model("Recipes", RecipesSchmea);

export default Recipes;
