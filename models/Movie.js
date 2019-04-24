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
    rating: {
        type: Number
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    _movieCollection: {
        type: Schema.Types.ObjectId,
        ref: 'MovieCollection',
        required: true
    }
});

const Movie = mongoose.model('movie', moviesSchema);

module.exports = Movie;
