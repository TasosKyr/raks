const express = require('express');
const router = express.Router();
const MovieCollection = require('../models/MovieCollection');
const Movie = require('../models/Movie');
const User = require('../models/User');

// edit rak
router.get('/:id', (req, res) => {
  let { id } = req.params
  MovieCollection.findById({ _id: id })
    .then(rak => {
      let movieArray = rak._movie
      Movie.find({ "_id": { "$in": movieArray } })
        .then(movie => {
          console.log(movie, "movie")
          res.render("edit-rak", { movie, id })
        })
      //console.log(rak._movie, "rakobjectids")
    })
});

router.post('/edit-rak/:collId/:movieId/delete', (req, res, next) => {
  const movieId = req.params.movieId
  const collId = req.params.collId
  MovieCollection.findOneAndUpdate({ _id: collId }, { $pull: { _movie: movieId } }).then(
    MovieColl => {
      res.redirect(`/edit-rak/${collId}`);
    });
})

module.exports = router;
