const express = require('express');
const router = express.Router();
const axios = require('axios');

/* Get landing-page */
router.get('/', (req, res, next) => {
    res.render('index');
});
//Get Page 2//
router.get('/search', (req, res, next) => {
    res.render('search');
});

router.post('/search', (req, res, next) => {
    console.log(req.body);
    axios
        .get(
            `https://api.themoviedb.org/3/search/movie?api_key=3fce71989b0f48b13d9b620ecc6d2d2a&language=en-US&query=${
                req.body.search
            }&page=1&include_adult=false`
        )
        .then(response => {
            const { data } = response;
            const { title } = data;
            console.log('Search results:', data);
            res.render('search', {});
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;
