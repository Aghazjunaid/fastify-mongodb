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
        const {search, page, perPage} = req.query;
        try {

            const startIndex = ((page - 1) * perPage);
            const skipCondition = {
                skip: startIndex,
                limit: parseInt(perPage),
                sort: {'createdAt':-1}
            };

            let con = {
            }
            if (search) {
                con['$or'] = [
                    {
                        'title': new RegExp(search, 'i')
                    },
                    {
                        'description': new RegExp(search, 'i')
                    },
                    {
                        'duration': new RegExp(search, 'i')
                    },
                    {
                        'category': new RegExp(search, 'i')
                    },
                    {
                        'year': new RegExp(search, 'i')
                    },
                    {
                        'rating': new RegExp(search, 'i')
                    },
                ]
            }
    
            // const doc = await Movie.find(
            //     con,{},skipCondition
            // )
            // const totalCount =  await Movie.countDocuments(con);

            let doc = await Movie.aggregate([
                { '$match'    : con},
                { '$sort'     : { 'createdAt': -1 } },
                { '$facet'    : {
                    metadata: [ { $count: "total" } ],
                    data: [ { $skip: startIndex }, { $limit: parseInt(perPage) } ] // add projection here wish you re-shape the docs
                } }
            ])

            return res.status(200).send({
                message: "Success",
                data: doc
            });
        } catch (error) {
            console.error(error);
            return res.status(400).send({
                message: String(error),
            });
        }
    },
    getById : async (req,res) => {
        try {
            let data = await Movie.findOne({_id:req.params.id})

            if(data){
                return res.status(200).send({  //201 for data insertion
                    message: "Sucess",
                    data
                });
            }
            return res.status(400).send({
                message: "Invalid Id",
                data : {}
            })
        } catch (error) {
            console.error(error);
            return res.status(400).send({
                message: String(error),
            });
        }
    },
    deleteById: async (req,res) => {
        try {
            let data = await Movie.findByIdAndRemove({_id:req.params.id})

            return res.status(200).send({  //201 for data insertion
                message: "Sucess",
                data
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