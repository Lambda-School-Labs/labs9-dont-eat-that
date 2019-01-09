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
// router.get('/one/:id', (req, res) => {
//   const id = req.params.id;
//   db('recipes')
//     .where({ 'recipes.id': id })
//     .first()
//     .join('recipes-ingredients', 'recipes.id', 'recipes-ingredients.recipe_id')
//     .join('ingredients', 'ingredients.id', 'recipes-ingredients.ingredient_id')
//     .select(
//       db.ref('recipes.name').as('recipename'),
//       'recipes.description',
//       'recipes.user_id',
//       db.ref('ingredients.name').as('ingredientname'),
//       'recipes-ingredients.quantity',
//       'ingredients.unit'
//     )
//     .then(recipe => res.status(200).json(recipe))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         message: 'The recipes information could not be retrieved',
//         err
//       });
//     });
// });

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
    res.status(200).json({ ...recipe, ingredients: ingredients });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'The recipes information could not be retrieved',
      err
    });
  }
});

module.exports = router;
