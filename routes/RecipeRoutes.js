import express from "express";
import {
  create,
  deleteRecipe,
  getRecipe,
  updateRecipe,
  allRecipe,
} from "../controllers/RecipeControllers.js";

const routes = express.Router();

//create Recipes
//http://localhost:5000/api/v1/recipe/create
routes.post("/create", create);

//get all recipes
routes.get("/allRecipe", allRecipe);
//get recipes
//http://localhost:5000/api/v1/recipe/:id
routes.get("/:id", getRecipe);

//update recipes
//http://localhost:5000/api/v1/recipe/:id
routes.put("/:id", updateRecipe);

//delete recipes
//http://localhost:5000/api/v1/recipe/:id
routes.delete("/:id", deleteRecipe);
export default routes;
