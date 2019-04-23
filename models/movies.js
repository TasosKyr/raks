const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    id: {
        type: number
    },
    title: {
        type: string
    },
    rating: {
        type: number
    },
    description: {
        type: String
    },
    image: {
        type: string
    }
});

const movie = mongoose.model('movie', moviesSchema);

module.exports = movies;
