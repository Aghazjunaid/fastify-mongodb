const movieController = require("../Controllers/movie");

module.exports = (app) => {
    app.post('/movie/insert', movieController.insert);
}