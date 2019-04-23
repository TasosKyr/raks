const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    id: {
        type: number,
        required: true
    },
    title: {
        type: string,
        required: true
    },
    rating: {
        type: number
    },
    description: {
        type: string
    },
    image: {
        type: string
    }
});

const Movie = mongoose.model('movie', moviesSchema);

module.exports = Movie;
