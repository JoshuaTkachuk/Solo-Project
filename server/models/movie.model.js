const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    rating:{
        type: Number
    },
    comments:{
        type: String,
        required: [true, 'comment is required'],
        minlength: [10, 'comment must be longer than 10 characters']
    },
    poster:{
        type: String
    },
    trailer:{
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model('Movie', MovieSchema) 