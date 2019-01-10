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
router.get('/:id', (req, res) => {
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
  const { username, password, email, firebaseid } = req.body;
  if (username && password && email && firebaseid) {
    const userSearch = await db('users') // checking if user already in database
      .where({ username })
      .first();
    if (userSearch === undefined) {
      // if user doesn't already exist, create user
      const user = await db('users')
        .insert({ username, password, email, firebaseid })
        .returning('id');
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'User already exists in database.' });
    }
  } else {
    res.status(400).json({ message: 'Please provide all fields.' });
  }
});


module.exports = router;
