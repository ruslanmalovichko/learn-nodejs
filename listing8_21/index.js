const levelup = require('levelup')
const memdown = require('memdown')

const db = levelup(memdown())
