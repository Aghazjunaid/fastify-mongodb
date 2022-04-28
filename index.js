// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose');

// Declare a route
fastify.get('/', async (req, res) => {
  return res.send({
      "message": "Hello"
  })
})

const mongoUrl = 'mongodb://127.0.0.1/movie'
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(5200)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()