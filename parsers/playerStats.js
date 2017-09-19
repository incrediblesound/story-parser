const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const sequence = require('../types/sequence')
const reward = require('./reward')
const arrayOf = require('../types/arrayOf')
const { apply } = require('../utils')

const makePlayer = (parts) => {
  return {
    type: 'PLAYER',
    name: parts[1],
    health: parts[3],
    attack: parts[5],
    defense: parts[7],
    items: parts[8]
  }
}

const playerStats = () => sequence(
  word('PLAYER'), textBlock(),
  word('HEALTH'), integer(),
  word('ATTACK'), integer(),
  word('DEFENSE'), integer(),
  arrayOf(reward())
)

module.exports = () => apply(makePlayer, playerStats())
