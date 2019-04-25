const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    vote_average: {
        type: Number
    },
    overview: {
        type: String
    },
    poster_path: {
        type: String
    }
    /*   _movieCollection: {
        type: Schema.Types.ObjectId,
        ref: 'MovieCollection',
        required: true
    } */
});

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;
