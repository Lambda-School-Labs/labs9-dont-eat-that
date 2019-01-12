const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const allergies = await db('allergies')
    res.status(200).json(allergies);
  } catch (err) {
    res.status(500).json({ message: "Unable to get allergies at this time."})
  }
})

router.post('/create', async (req, res) => {
  const { firebaseid, allergy } = req.body;
  try {
    if (firebaseid && allergy) {
      const allergyCheck = await db('allergies') // checking if allergy already in db
        .where({ name: allergy })
        .first();
      if (allergyCheck) { // if allergy already in db, get user from users db and insert into db
        const user = await db('users')
          .where({ firebaseid })
          .first();
        await db('users-allergies').insert({
          user_id: user.id,
          allergy_id: allergyCheck.id
        });
        res.status(201).json(allergyCheck.id);
      } else { // if allergy not in db, insert, get user from users db and insert into db
        const allergyId = await db('allergies')
          .insert({ name: allergy })
          .returning('id');
        const user = await db('users')
          .where({ firebaseid })
          .first();
        await db('users-allergies').insert({
          user_id: user.id,
          allergy_id: allergyId
    });
    res.status(201).json(allergyId);
      }
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
