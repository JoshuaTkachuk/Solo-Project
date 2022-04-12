const MovieController = require('../controllers/movie.controller')
module.exports = (app) =>{
    app.get('/api', MovieController.index)
    app.post('/api/review', MovieController.addReview)
    app.get('/api/review', MovieController.getReviews)
    app.get('/api/review/:id',MovieController.getReview)
    app.put('/api/edit/:id', MovieController.updateReview)
    app.delete('/api/delete/:id', MovieController.deleteReview)
}