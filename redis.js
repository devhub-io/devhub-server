import redis from 'redis';

require('dotenv').config();

const client = redis.createClient();

export default client;
