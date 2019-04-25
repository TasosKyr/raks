const express = require('express');
const router = express.Router();
const MovieCollection = require('../models/MovieCollection');
const ensureLogin = require('connect-ensure-login');
const User = require('../models/User');

// Create new rak
router.post('/rak/create', ensureLogin.ensureLoggedIn(), (req, res) => {
    const { name, description } = req.body;
    console.log(req.user);
    // const _id = req.params.movieCollectionId;
    MovieCollection.create({
        name,
        description,
        _owner: req.user._id
    })
        .then(movieColl => {
            console.log('Well done! Rak successfully created!', movieColl);
            res.redirect(`/search/${movieColl._id}`);
        })
        .catch(err => {
            console.error('Oops! Error while creating the rak', err);
        });
});




module.exports = router;
