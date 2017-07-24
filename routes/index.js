import express from 'express'
import mysql from 'mysql2'
import models from '../models'
import redis from '../redis'
import sphinx from '../sphinx'
let util = require('util')
let assert = require('assert')

const router = express.Router()

/* GET index page. */
router.get('/', (req, res, next) => {
  res.json({ title: process.env.APP_URL })
})

router.get('/mysql', (req, res, next) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  })

  connection.connect()

  connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    console.log('The solution is: ', rows[0].solution)
  })

  connection.end()

  res.json({ mysql: 's' })
})

router.get('/orm', (req, res, next) => {
  models.User.findOne().then((user) => {
    console.log(user.get())
  })
  res.json({ a: 1 })
})

router.get('/cache', (req, res, next) => {
  redis.set('key', '1')
  redis.get('key', (err, reply) => {
    res.json({ key: reply })
  })
})

router.get('/search', (req, res, next) => {
  let perPage = 10
  let page = 1
  sphinx.SetLimits((page - 1) * perPage, perPage)
  sphinx.SetFilter('status', 1)
  sphinx.Query('js', 'repos', '', (err, result) => {
    assert.ifError(err)
    console.log(util.inspect(result, false, null, true))
  })
  res.json({ key: 'search' })
})

export default router
