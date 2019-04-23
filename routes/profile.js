const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Identicon = require("identicon")
const jsSHA = require("jssha");

// Identicon Setup, unfinished
var shaObj = new jsSHA("SHA-512", "TEXT");
shaObj.update(`${user.username}`);
var hash = shaObj.getHash("HEX");
var data = new Identicon(hash, { format: 'svg' }).toString();
