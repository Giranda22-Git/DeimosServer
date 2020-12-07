const mongoose = require('mongoose')

const user = new mongoose.Schema({
    Login: {
        type: String,
        required: true,
        min: 3,
        max: 128
    },
    Password: {
        type: String,
        required: true,
        min: 6,
        max: 512
    }
})

const mongoUser = mongoose.model('users', user)
module.exports = mongoUser