const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    artist:{
        type: String,
        required: true

    },
    album:{
        type: String,
        required: true

    }
})

module.exports = mongoose.model("Songs", songSchema)