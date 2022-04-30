const Movie = require('../Models/movie');

module.exports = {
    insert: async (req,res) => {
        try {
            const movieData = req.body;
            const movie = new Movie({
                title: movieData.title,
                description: movieData.description,
                duration: movieData.duration,
                category: movieData.category,
                year: movieData.year,
                budget: movieData.budget,
                rating: movieData.rating
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
                        'title': new RegExp(searchQuery.search, 'i')
                    },
                    {
                        'description': new RegExp(searchQuery.search, 'i')
                    },
                    {
                        'duration': new RegExp(searchQuery.search, 'i')
                    },
                    {
                        'category': new RegExp(searchQuery.search, 'i')
                    },
                    {
                        'year': new RegExp(searchQuery.search, 'i')
                    },
                    {
                        'rating': new RegExp(searchQuery.search, 'i')
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