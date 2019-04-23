const express = require('express');
const mongoose = require('mongoose')
const profileRouter = express.Router();
const Identicon = require("identicon")
const jsSHA = require("jssha");
const MovieCollection = require('../models/MovieCollection');


// Identicon Setup, unfinished
var shaObj = new jsSHA("SHA-512", "TEXT");
shaObj.update(`${user.username}`);
var hash = shaObj.getHash("HEX");
var data = new Identicon(hash, { format: 'svg' }).toString();

// cart routing
profileRouter.post('/search', (req, res, next) => {
  res.redirect('/search');
  MovieCollection.create({
    name: 'Rak 1',
    _owner: user._id
  });
})
