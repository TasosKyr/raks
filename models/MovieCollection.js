const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    _movie: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const MovieCollection = mongoose.model('MovieCollection', collectionsSchema);

module.exports = MovieCollection;
