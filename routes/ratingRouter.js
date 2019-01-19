const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { firebaseid, recipeid, newRating } = req.body;
    if (firebaseid && recipeid && newRating) {
      const user = await db('users') // gets user from db for his/her id later
        .where({ firebaseid })
        .first();
      const ratingCheck = await db('ratings') // checking to see if user gave a rating for this recipe already
        .where({ user_id: user.id, recipe_id: recipeid })
        .first();
      if (ratingCheck) {
        const ratingId = await db('ratings') // updating rating is already one
          .where({ user_id: user.id, recipe_id: recipeid })
          .update({ rating: newRating })
          .returning('id');
        res.status(201).json(ratingId);
      } else {
        const ratingId = await db('ratings') // creating a rating is there's none
          .insert({
            rating: newRating,
            user_id: user.id,
            recipe_id: recipeid
          })
          .returning('id');
        res.status(201).json(ratingId);
      }
    }
    res.status(400).json({ message: 'Please provide all fields.' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Unable to post a rating for this recipe.' });
  }
});

module.exports = router;
