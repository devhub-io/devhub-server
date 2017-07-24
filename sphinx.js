let SphinxClient = require('sphinxapi')
let util = require('util')
let assert = require('assert')

require('dotenv').config()

const cl = new SphinxClient()
cl.SetServer(process.env.SPHINX_HOST, parseInt(process.env.SPHINX_PORT))
cl.Status(function (err, result) {
  assert.ifError(err)
  console.log(util.inspect(result, false, null, true))
})

export function search (query, index, page, perPage) {
  return new Promise(function (resolve, reject) {
    cl.SetLimits((page - 1) * perPage, perPage)
    // sphinx.SetFilter('status', 1)
    cl.Query(query, index, '', (err, result) => {
      if (err !== null) return reject(err)
      resolve(result)
    })
  })
}
