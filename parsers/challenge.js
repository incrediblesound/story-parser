const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const sequence = require('../types/sequence')

const challenge = () => sequence(
  word('CHALLENGE'), textBlock(),
  word('HEALTH'), integer(),
  word('SPEED'), integer(),
  word('ATTACK'), integer(),
  word('DEFENSE'), integer(),
  word('WEAPON'), textBlock(),
)

module.exports = challenge
