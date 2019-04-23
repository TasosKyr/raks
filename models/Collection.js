const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionsSchema = new Schema({
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

const collection = mongoose.model('collections', collectionsSchema);

module.exports = collections;
