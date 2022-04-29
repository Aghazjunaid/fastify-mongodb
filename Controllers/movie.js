const Movie = require('../Models/movie');

module.exports = {
    insert: async (req,res) => {
        try {
            const movieData = req.body;
            const movie = new Movie({
                name: movieData.name,
                description: movieData.description,
                duration: movieData.duration,
                type: movieData.type,
                releasedDate: movieData.releasedDate,
                budget: movieData.budget
            });

            const data = await movie.save()
            return res.status(201).send({  //201 for data insertion
                message: "Movie Added Successfully",
                data
            });
        } catch (error) {
            console.error(error);
            return res.status(400).send({
                message: String(error),
            });
        }
    },
    search: async (req,res) => {
        const searchQuery = req.query;
        try {
            let con = {
            }
            if (searchQuery) {
                con['$or'] = [
                    {
                        'name': new RegExp(searchQuery.search, 'i')
                    },
                    {
                        'description': new RegExp(searchQuery.search, 'i')
                    },
                    {
                        'type': new RegExp(searchQuery.search, 'i')
                    },
                ]
            }
    
            const doc = await Movie.find(
                con,{},
            )
            const totalCount =  await Movie.countDocuments(con);

            return res.status(200).send({
                message: "Success",
                totalCount,
                data: doc
            });
        } catch (error) {
            console.error(error);
            return res.status(400).send({
                message: String(error),
            });
        }

    }
}

// // Success
// const searchResponse = {
//     data: {
//       totalRecords: 10,
//       results: [{}],
//     },
//     meta: {
//       message: "Your messsage",
//       code: 200,
//     },
//   };
  
//   // Failed
//   const searchFailedResponse = {
//     data: {},
//     meta: {
//       message: "Please provide page number",
//       code: 400,
//     },
//   };