const Movie = require('../Models/movie');

module.exports = {
    insert: async (req,res) => {
        const return_response = { "status": null, "message": null, "data": {} } 
        try {
            let movieData = req.body;
            const movie = new Movie({
                name: movieData.name,
                description: movieData.description,
                duration: movieData.duration,
                type: movieData.type,
                releasedDate: movieData.releasedDate,
                budget: movieData.budget
            });

            let data = await movie.save()
            return_response.status = 200;
            return_response.message = "Movie Added Successfully";
            return_response.data = data;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.send(return_response);
    }
}