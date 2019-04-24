const express = require('express');
const profileRouter = express.Router();
const Identicon = require("identicon")
const jsSHA = require("jssha");
const MovieCollection = require('../models/MovieCollection');
const User = require('../models/User');

// Identicon Setup, unfinished
// var template = document.getElementById('idcon').innerHTML;
// var renderId = Handlebars.compile(template);
// var shaObj = new jsSHA("SHA-512", "TEXT");
// shaObj.update(`${_id}`);
// var hash = shaObj.getHash("HEX");
// renderId = new Identicon(hash, { format: 'svg' }).toString();


//User rak rendering
MovieCollection.find({ _owner: _id }
  .then(collections => {
    res.render('profile', { collections })
  }))
  .catch(err => {
    console.error("failed to render user collection", err)
  })

// cart creation
profileRouter.post('/search', (req, res, next) => {
  res.redirect('/search');
  MovieCollection.create({
    name: 'Rak 1',
    _owner: user._id
  });
})

module.exports = profileRouter;