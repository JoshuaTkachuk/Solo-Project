const MovieController = require('../controllers/movie.controller')
module.exports = (app) =>{
    app.get('/api', MovieController.index)
}