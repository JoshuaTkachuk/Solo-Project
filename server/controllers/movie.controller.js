const Movie = require('../models/movie.model')
module.exports = {
    index:(req,res) =>{
        res.json('welcome');
    },
    addMovie:(req,res) =>{
        Movie.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err))
    }
}