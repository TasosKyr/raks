const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionsSchema = new Schema({
    title: {
        type: string,
        required: true
    },
    description: {
        type: string
    },
    image: {
        type: string
    },
    movie: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
});

const MovieCollection = mongoose.model('MovieCollection', collectionsSchema);

module.exports = MovieCollection;
