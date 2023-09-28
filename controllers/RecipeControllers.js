import Recipes from "../models/Recipes.js";

export const create = (req, res) => {
  console.log(req.body);
  new Recipes(req.body)
    .save()
    .then((recipe) =>
      res
        .status(200)
        .json({ success: true, message: "successfully added", data: recipe })
    )
    .catch((err) =>
      res.status(400).json({ success: false, message: "failure to add data" })
    );
};

export const allRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.find({});
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    res.status(400).json({ success: false, data: [] });
  }
};

export const getRecipe = (req, res) => {
  let { id } = req.params;
  Recipes.findById(id)
    .then((recipe) => res.status(200).json({ success: true, data: recipe }))
    .catch((error) => res.status(400).json({ success: false, data: [] }));
};

export const updateRecipe = (req, res) => {
  let { id } = req.params;
  let { mealName, instruction, ingredients, youtubeSource, recipeImage } =
    req.body;
  Recipes.findByIdAndUpdate(id, {
    mealName,
    instruction,
    ingredients,
    youtubeSource,
    recipeImage,
  })
    .then((recipe) => res.status(200).json({ success: true, data: recipe }))
    .catch((error) => res.status(400).json({ success: false, data: [] }));
};

export const deleteRecipe = (req, res) => {
  let { id } = req.params;
  Recipes.findByIdAndDelete(id)
    .then((recipe) => res.status(200).json({ success: true, data: recipe }))
    .catch((error) => res.status(400).json({ success: false, data: [] }));
};
