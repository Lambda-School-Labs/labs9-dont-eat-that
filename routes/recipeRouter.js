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

router.post('/', (req, res) => {
  const {} = req.body;
});

module.exports = router;
