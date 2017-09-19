const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const sequence = require('../types/sequence')
const { apply } = require('../utils')

const makeChallenge = (parts) => {
  return {
    type: 'CHALLENGE',
    name: parts[1],
    health: parts[3],
    speed: parts[5],
    attack: parts[7],
    defense: parts[9],
    weapon: parts[11],
    damage: parts[13]
  }
}

const challenge = () => sequence(
  word('CHALLENGE'), textBlock(),
  word('HEALTH'), integer(),
  word('SPEED'), integer(),
  word('ATTACK'), integer(),
  word('DEFENSE'), integer(),
  word('WEAPON'), textBlock(),
  word('DAMAGE'), integer(),
)

module.exports = () => apply(makeChallenge, challenge())
