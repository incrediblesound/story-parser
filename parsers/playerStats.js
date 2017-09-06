const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const sequence = require('../types/sequence')
const { apply } = require('../utils')

const makePlayer = (parts) => {
  return {
    type: 'PLAYER',
    name: parts[1],
    health: parts[3],
    defense: parts[9],
    weapons: [ { name: parts[11], speed: parts[5], attack: parts[7] } ],
    armor: parts[13],
  }
}

const playerStats = () => sequence(
  word('PLAYER'), textBlock(),
  word('HEALTH'), integer(),
  word('SPEED'), integer(),
  word('ATTACK'), integer(),
  word('DEFENSE'), integer(),
  word('WEAPON'), textBlock(),
  word('ARMOR'), textBlock(),
)

module.exports = () => apply(makePlayer, playerStats())
