const express = require('express');
const router = express.Router();

/* Get landing-page */
router.get('/', (req, res, next) => {
  res.render('index');
});
//Get Page 2//
router.get('/search', (req, res, next) => {
  res.render('search')
})

module.exports = router;
