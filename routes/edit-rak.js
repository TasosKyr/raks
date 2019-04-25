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
          res.render("edit-rak", { movie })
        })
      //console.log(rak._movie, "rakobjectids")
    })

});

router.post('/profile/{{_id}}/delete', (req, res, next) => {
  res.redirect('/search');
  MovieCollection.create({
    name: 'Rak 1',
    _owner: user._id
  });
})

module.exports = router;
