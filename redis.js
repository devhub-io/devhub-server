import redis from 'redis'

require('dotenv').config()

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
})
client.on('error', (err) => {
  console.log(`Redis Error ${err}`)
})

export default client
