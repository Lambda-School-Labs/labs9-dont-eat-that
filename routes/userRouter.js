const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// get user by id
router.get("/:userid", (req, res) => {
    const id = req.params.userid;
    db("users")
        .where({user_id: id})
        .then(users => res.status(200).json(users))
        .catch(err => 
            res.status(500).json({
                message:"User information failed to load. Please try again later.", err
            }));

});

router.post("/create-new-user")





module.exports = router;
