const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function() {
    const Records = new Schema({
        title               : String,
        description         : String,
        source              : String,
        author              : String,
        score               : Number,
        magnitude           : Number,
        nouns               : [String],
        verbs               : [String],
        adj                 : [String],
        entities            : [{
            name            : String,
            entityType      : String,
            salience        : Number
        }],
        date                : Date
    });
    mongoose.model("Records", Records);
};