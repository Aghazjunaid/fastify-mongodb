// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', async (req, res) => {
  return res.send({
      "message": "Hello"
  })
})


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