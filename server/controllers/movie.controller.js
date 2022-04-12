const Review = require('../models/review.model')
module.exports = {
    index:(req,res) =>{
        res.json('welcome');
    },
    addReview:(req,res) =>{
        Review.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err))
    },
    getReviews:(req,res) =>{
        Review.find()
        .then(result => res.json(result))
        .catch(err => console.log(err))
    },
    deleteReview:(req,res) =>{
        Review.deleteOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(err => console.log(err))
    },
    getReview:(req,res) =>{
        Review.findById(req.params.id)
        .then(result=> res.json(result))
        .catch(err => console.log(err))
    },
    updateReview:(req,res)=>{
        Review.findByIdAndUpdate(req.params.id,req.body, {new:true, runValidators:true})
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err))
    }
}