const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// get all recipes including others
router.get('/all', (req, res) => {
  db('recipes')
    .then(recipes => res.status(200).json(recipes))
    .catch(err =>
      res.status(500).json({
        message: 'The recipes information could not be retrieved',
        err
      })
    );
});

// get recipes for just the user
router.get('/:userid', (req, res) => {
  const id = req.params.userid; // need to somehow get user_id
  db('recipes')
    .where({ user_id: id })
    .then(recipes => res.status(200).json(recipes))
    .catch(err =>
      res.status(500).json({
        message: 'The recipes information could not be retrieved',
        err
      })
    );
});

// geting single recipe details
router.get('/one/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await db('recipes')
      .where({ id: id })
      .first();
    const ingredients = await db('ingredients')
      .join(
        'recipes-ingredients',
        'ingredients.id',
        'recipes-ingredients.ingredient_id'
      )
      .join('recipes', 'recipes.id', 'recipes-ingredients.recipe_id')
      .where({ 'recipes.id': id })
      .select(
        'ingredients.name',
        'recipes-ingredients.quantity',
        'ingredients.unit'
      );
    if (!recipe || !ingredients) {
      res
        .status(404)
        .json({ message: "The recipe with the specified id doesn't exist." });
    } else {
      res.status(200).json({ ...recipe, ingredients: ingredients });
    }
  } catch (err) {
    res.status(500).json({
      message: 'The recipes information could not be retrieved',
      err
    });
  }
});

router.post('/', async (req, res) => {
  const { name, description, userid, ingredients } = req.body; // ingredients should be an array with each ingredient an object with a name, quantity, and unit
  if (name && description && userid && ingredients) {
    try {
      const recipe = await db('recipes').insert({
        // inserting into recipes database
        name: name,
        description: description,
        user_id: userid
      });
      await ingredients.map(async ingredient => {
        const ingredientSearch = await db('ingredients') // checking if ingredient already in database
          .where({ name: ingredient.name })
          .first();
        let ingredientDone = undefined;
        if (!ingredientSearch) {
          ingredientDone = await db('ingredients').insert({
            // inserting into ingredients database if ingredient doesn't exist
            name: ingredient.name,
            unit: ingredient.unit
          });
        }
        await db('recipes-ingredients').insert({
          // inserting into recipes-ingredients database
          recipe_id: recipe[0],
          ingredient_id: ingredientSearch.id || ingredientDone[0],
          quantity: ingredient.quantity
        });
      });
      res.status(200).json(recipe[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'The recipes information could not be retrieved',
        err
      });
    }
  } else {
    res.status(400).json({ message: 'Please provide all fields.' });
  }
});

module.exports = router;
