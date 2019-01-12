const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// get all users
router.get('/all', (req, res) => {
  db('users')
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(500).json({
        message: 'Unable to retrieve all user data.',
        err
      })
    );
});

// get user by id
router.get('/one/:id', (req, res) => {
  const userid = req.params.id;
  db('users')
    .where({ id: userid })
    .first()
    .then(user => res.status(200).json(user))
    .catch(err =>
      res.status(500).json({
        message: 'User information failed to load. Please try again later.',
        err
      })
    );
});

// router.post("/create-new-user")
router.post('/create', async (req, res) => {
  const { firebaseid } = req.body;
  try {
    if (firebaseid) {
      const userSearch = await db('users') // checking if user already in database
        .where({ firebaseid })
        .first();
      if (userSearch === undefined) {
        // if user doesn't already exist, create user
        const user = await db('users')
          .insert({ firebaseid })
          .returning('id');
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: 'User already exists in database.' });
      }
    } else {
      res.status(400).json({ message: 'Please provide all fields.' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Problem with creating user.',
      err
    });
  }
});

module.exports = router;
