const movieController = require("../Controllers/movie");

module.exports = (app) => {
    app.post('/movie/insert', movieController.insert);
    app.get('/search/movie', movieController.search)
}