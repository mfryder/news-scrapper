const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function() {
    const Profiles = new Schema({
        name                : String,
        url                 : String,
        biasMap             : [{
            name            : String,
            bias            : Number,
        }],
        nounCount           : [{
            name            : String,
            count           : Number
        }],
        verbCount           : [{
            name            : String,
            count           : Number
        }],
        adjCount            : [{
            name            : String,
            count           : Number
        }],
        positivity          : Number,
        date                : Date
    });
    mongoose.model("Profiles", Profiles);
};