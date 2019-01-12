const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.post('/', async (req, res) => {
  const { firebaseid, allergy } = req.body;
  try {
    if (firebaseid && allergy) {
      const allergyId = await db('allergies') // inserting allergy into allergies db
        .insert({ name: allergy })
        .returning('id');
      const user = await db('users') // getting user from users db
        .where({ firebaseid })
        .first();
      await db('users-allergies').insert({
        user_id: user.id,
        allergy_id: allergyId
      });
      res.status(201).json(allergyId);
    } else {
      res.status(422).json({
        message: 'Please provide a firebaseid and an allergy name object. '
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Unable to add allery to database.' });
  }
});

module.exports = router;
