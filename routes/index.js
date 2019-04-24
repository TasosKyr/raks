const express = require('express');
const router = express.Router();
const axios = require('axios');
const MovieCollection = require('../models/MovieCollection');
const Movie = require('../models/Movie');
const ensureLogin = require('connect-ensure-login');

/* Get landing-page */
router.get('/', (req, res, next) => {
    res.render('index');
});

// Get rak creation page
router.get('/create-rak', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    res.render('create-rak');
});

//Get search page
router.get('/search/:collectionId/:collectionName', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { collectionId, collectionName } = req.params;
    MovieCollection.findOne({ _id: collectionId }).then(MovieColl => {
        res.render('search', { MovieColl });
    });
});

//Get profile page
router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res) => {
    MovieCollection.find({ _owner: req.user._id })
        .then(collections => {
            console.log({ collections })
            res.render('profile', { collections, user: req.user })
        })
        .catch(err => {
            console.error("failed to render user collection", err)
        })


});

// Get API search results
router.post('/search/:collectionId/:collectionName', (req, res, next) => {
    const { collectionId, collectionName } = req.params;
    axios
        .get(
            `https://api.themoviedb.org/3/search/movie?api_key=3fce71989b0f48b13d9b620ecc6d2d2a&language=en-US&query=${
            req.body.search
            }&page=1&include_adult=false`
        )
        .then(response => {
            const { data } = response;
            let results = data.results;
            console.log(results);
            data.results.forEach(el => {
                const genre_ids = el.genre_ids;
                const genre_names = getIdName(genre_ids);
                el.genre_names = genre_names;
            });
            res.render('search', { results, collectionId, collectionName });
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

// Create movie in the database and add it to the rak
router.post('/add/:collId/:collName', (req, res) => {
    const { collId, collName } = req.params;
    const { id, title, genre_names, vote_average, overview, poster_path } = req.body;
    console.log(req.body);
    Movie.findOneAndUpdate(
        { id: id },
        {
            id,
            title,
            genre_names,
            vote_average,
            overview,
            poster_path,
            _movieCollection: collId
        },
        { upsert: true, new: true }
    ).then(() => {
        console.log('Movie successfully created');
        MovieCollection.findOne({ _id: collId })
            .then(MovieColl => {
                res.render('search', { MovieColl });
                //res.redirect(`/search/${collId}/${collName}`, { MovieColl });
            })
            .catch(err => {
                console.error('Error while creating movie', err);
            });
    });
});

module.exports = router;
