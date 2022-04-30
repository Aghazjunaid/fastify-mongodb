// Require the framework and instantiate it
const fastify = require('fastify')
const app = fastify()
const mongoose = require('mongoose');
const movieRoute = require('./Routes/movie')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/aghaz-movie-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

movieRoute(app);

app.get("/",(req,res) => {
  res.send("Hello AJ")
})
// Run the server!
const start = async () => {
  try {
    await app.listen(process.env.PORT || 5200, '0.0.0.0')
    console.log("Server is running at 5200 port")
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
start()