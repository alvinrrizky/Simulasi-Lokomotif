const { mongoose } = require('mongoose');

const schema = mongoose.Schema({
    LocoCode: String,
    LocoName: String,
    LocoLength: Number,
    LocoWidth: Number,
    LocoHeigth: Number,
    Status: String,
    DateAndTime: String
})

module.exports= schema