const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// get user by id

router.get('/', (req, res) => {
    res.status(200).json("testing")
})


router.get('/all', (req, res) => {
    
    db('users')
        .then(users => res.status(200).json(users))
        .catch(err => 
            res.status(500).json({
                message:'Unable to retrieve all user data.',err
            }));
});


router.get('/:id', (req, res) => {
    const userid = req.params.id;
    // console.log(id);
    
    db('users')
        .where({id: userid})
        .then(users => res.status(200).json(users))
        .catch(err => 
            res.status(500).json({
                message:"User information failed to load. Please try again later.", err
            }));

});

router.post('/newuser', async (req, res) => {
    const {username, password, email, firebaseid} = req.body;
    if(username && password && email && firebaseid) {
        try {
            const user = await db('users')
            .insert({
                username: username,
                password: password,
                email: email
            })
            .returning('id');
        }
    }
})





module.exports = router;
