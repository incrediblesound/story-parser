const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const sequence = require('../types/sequence')
const or = require('../types/or')
const arrayOf = require('../types/arrayOf')
const { apply, atLeast } = require('../utils')

const makeReward = (rewards) => {
  return rewards.map(parts => {
    const type = parts[2]
    switch (parts[2]) {
      case "weapon":
        return {
          type,
          name: parts[4],
          attack: parts[6],
          speed: parts[8],
        }
        case "armor":
          return {
            type,
            name: parts[4],
            defense: parts[6],
          }
        case "item":
          return {
            type,
            name: parts[4],
          }
      }
  })
}

/*
REWARD TYPE "weapon" NAME "magic sword"
ATTACK 4 SPEED 6

REWARD TYPE "armor" NAME "plate mail"
DEFENSE 8
*/

const reward = () => atLeast(1, 'reward', arrayOf(
  or(
    sequence(
      word('REWARD'), word('TYPE'), textBlock(),
      word('NAME'), textBlock(),
      word('ATTACK'), integer(),
      word('SPEED'), integer(),
    ),
    sequence(
      word('REWARD'), word('TYPE'), textBlock(),
      word('NAME'), textBlock(),
      word('DEFENSE'), integer(),
    ),
    sequence(
      word('REWARD'), word('TYPE'), textBlock(),
      word('NAME'), textBlock(),
    )
  ))
)



module.exports = () => apply(makeReward, reward())
