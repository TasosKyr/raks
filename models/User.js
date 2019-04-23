const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        googleId: String,
        password: String,
        movieCollection: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MovieCollection'
            }
        ]
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
