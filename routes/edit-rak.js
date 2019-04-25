const express = require('express');
const router = express.Router();
const MovieCollection = require('../models/MovieCollection');
const Movie = require('../models/Movie');
const User = require('../models/User');
const ensureLogin = require('connect-ensure-login');

// edit rak
router.get('/:id', ensureLogin.ensureLoggedIn(), (req, res) => {
    let { id } = req.params;
    MovieCollection.findById({ _id: id }).then(rak => {
        let movieArray = rak._movie;
        Movie.find({ _id: { $in: movieArray } }).then(movie => {
            console.log(movie, 'movie');
            res.render('edit-rak', { movie, id });
        });
    });
});

// Update new rak
router.post('/:collId/update', ensureLogin.ensureLoggedIn(), (req, res) => {
    const collId = req.params.collId;
    const { name, description } = req.body;
    MovieCollection.findOneAndUpdate({ _id: collId }, { name: name, description: description })
        .then(movieColl => {
            console.log('Well done! Rak successfully updated!');
            res.redirect(`/edit-rak/${collId}`);
        })
        .catch(err => {
            console.error('Oops! Error while creating the rak', err);
        });
});

router.post('/:collId/:movieId/delete', (req, res, next) => {
    const movieId = req.params.movieId;
    const collId = req.params.collId;
    MovieCollection.findOneAndUpdate({ _id: collId }, { $pull: { _movie: movieId } }).then(MovieColl => {
        res.redirect(`/edit-rak/${collId}`);
        console.log('Well done! Movie successfully deleted!');
    });
});

module.exports = router;
