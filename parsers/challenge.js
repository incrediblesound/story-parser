const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const sequence = require('../types/sequence')
const { apply } = require('../utils')

const makeChallenge = (parts) => {
  return {
    type: 'CHALLENGE',
    name: parts[1],
    text: parts[3],
    health: parts[5],
    speed: parts[7],
    attack: parts[9],
    defense: parts[11],
    weapon: parts[13],
    damage: parts[15]
  }
}

const challenge = () => sequence(
  word('CHALLENGE'), textBlock(),
  word('TEXT'), textBlock(),
  word('HEALTH'), integer(),
  word('SPEED'), integer(),
  word('ATTACK'), integer(),
  word('DEFENSE'), integer(),
  word('WEAPON'), textBlock(),
  word('DAMAGE'), integer(),
)

module.exports = () => apply(makeChallenge, challenge())
