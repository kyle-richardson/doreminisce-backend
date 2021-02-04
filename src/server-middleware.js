const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const logger = require('./logger')

// const config = {
//   origin: /.+/s,
//   credentials: false,
// }

module.exports = server => {
    server.use(helmet())
    server.use(express.json())
    //   server.use(cors(config))
    server.use(cors())
    server.use(logger)
}
