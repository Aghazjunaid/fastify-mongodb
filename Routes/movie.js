const movieController = require("../Controllers/movie");

module.exports = (app) => {
    app.post('/movies', movieController.insert);
    app.get('/movies', movieController.search);
    app.get('/movie/:id', movieController.getById)
}