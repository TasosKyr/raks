const express = require('express');
const router = express.Router();
const axios = require('axios');
const MovieCollection = require('../models/MovieCollection');
const ensureLogin = require('connect-ensure-login');
let collectionIdArr = [];

/* Get landing-page */
router.get('/', (req, res, next) => {
    res.render('index');
});

// Get rak creation page
router.get('/create-rak', (req, res, next) => {
    res.render('create-rak');
});

//Get search page
router.get('/search', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    MovieCollection.find({ _owner: req.user._id }).then(collections => {
        res.render('search');
    });
});

// Get API search results
router.post('/search', (req, res, next) => {
    console.log(req.user);
    axios
        .get(
            `https://api.themoviedb.org/3/search/movie?api_key=3fce71989b0f48b13d9b620ecc6d2d2a&language=en-US&query=${
                req.body.search
            }&page=1&include_adult=false`
        )
        .then(response => {
            const { data } = response;
            console.log(data.results);
            let results = data.results;
            data.results.forEach(el => {
                const genre_ids = el.genre_ids;
                const genre_names = getIdName(genre_ids);
                el.genre_names = genre_names;
            });
            res.render('search', { results });
        })
        .catch(err => {
            console.error(err);
        });
});

// Get genres names from the API
const genreIds = [
    {
        id: 28,
        name: 'Action'
    },
    {
        id: 12,
        name: 'Adventure'
    },
    {
        id: 16,
        name: 'Animation'
    },
    {
        id: 35,
        name: 'Comedy'
    },
    {
        id: 80,
        name: 'Crime'
    },
    {
        id: 99,
        name: 'Documentary'
    },
    {
        id: 18,
        name: 'Drama'
    },
    {
        id: 10751,
        name: 'Family'
    },
    {
        id: 14,
        name: 'Fantasy'
    },
    {
        id: 36,
        name: 'History'
    },
    {
        id: 27,
        name: 'Horror'
    },
    {
        id: 10402,
        name: 'Music'
    },
    {
        id: 9648,
        name: 'Mystery'
    },
    {
        id: 10749,
        name: 'Romance'
    },
    {
        id: 878,
        name: 'Science Fiction'
    },
    {
        id: 10770,
        name: 'TV Movie'
    },
    {
        id: 53,
        name: 'Thriller'
    },
    {
        id: 10752,
        name: 'War'
    },
    {
        id: 37,
        name: 'Western'
    }
];

const getIdName = arrIds => {
    let genreArray = arrIds.map(id => {
        let foundObj = genreIds.find(el => el.id === id);
        return foundObj.name;
    });
    return genreArray;
};

// Add movies to the cart
router.post('/movies/add', (req, res) => {
    const { title, genre_names, vote_average, overview, poster_path } = req.body;
    Movie.create({ title, genre_names, vote_average, overview, poster_path })
        .then(() => {
            console.log('Movie successfully created');
            res.redirect('/search/:movieCollectionId');
        })
        .catch(err => {
            console.error('Error while creating movie', err);
        });
});

module.exports = router;
