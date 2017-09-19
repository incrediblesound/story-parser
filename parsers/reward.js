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
          damage: parts[6],
          speed: parts[8],
        }
        case "armor":
          return {
            type,
            name: parts[4],
            defense: parts[6],
          }
        case "key":
        case "hidden":
          return {
            type,
            name: parts[4],
          }
      }
  })
}

/*
ITEM TYPE "weapon" NAME "sword" DAMAGE 4 SPEED 3

ITEM TYPE "armor" NAME "leather" DEFENSE 1
*/

const reward = () => atLeast(1, 'reward', arrayOf(
  or(
    sequence(
      word('ITEM'), word('TYPE'), word('"weapon"'),
      word('NAME'), textBlock(),
      word('DAMAGE'), integer(),
      word('SPEED'), integer(),
    ),
    sequence(
      word('ITEM'), word('TYPE'), word('"armor"'),
      word('NAME'), textBlock(),
      word('DEFENSE'), integer(),
    ),
    sequence(
      word('ITEM'), word('TYPE'), textBlock(),
      word('NAME'), textBlock(),
    )
  ))
)



module.exports = () => apply(makeReward, reward())
