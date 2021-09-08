const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    bYear: {
        type: Number,
        required: true,
        validate: {
            validator: function (newYear) {
                if (Number.isInteger(newYear))
                    return true;

                else return false
            }
        }
    },
    movies: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]
});

module.exports = mongoose.model('Actor', actorSchema);