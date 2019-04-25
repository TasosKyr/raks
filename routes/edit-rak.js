const express = require('express');
const router = express.Router();
const MovieCollection = require('../models/MovieCollection');
const User = require('../models/User');

// edit rak
router.get('/:id', (req, res) => {
  let { id } = req.params
  console.log(id)
  MovieCollection.findById({ _id: id })
    .then(rak => {
      console.log(rak._movie, "rakobjectids")
      res.render("edit-rak", { rak })

    })

});

module.exports = router;
