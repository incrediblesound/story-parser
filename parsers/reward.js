const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const sequence = require('../types/sequence')
const or = require('../types/or')
const arrayOf = require('../types/arrayOf')
const { apply, atLeast } = require('../utils')

module.exports = {}

const makeReward = (rewards) => {
  return rewards.map(parts => {
    const type = parts[2]
    switch (parts[2]) {
      case '"weapon"':
        return {
          type: 'weapon',
          name: parts[4],
          damage: parts[6],
          speed: parts[8],
        }
        case '"armor"':
          return {
            type: 'armor',
            name: parts[4],
            defense: parts[6],
          }
        case '"health"':
          return {
            type: 'health',
            name: parts[4],
            recovery: parts[6],
          }
        case "key":
        case "hidden":
        case "drop":
          return {
            type,
            name: parts[4],
          }
      }
  })
}

const makeItemDrop = (parts) => {
  return {
    key: parts[1],
    items: makeReward(parts[2]),
  }
}

/*
ITEM TYPE "weapon" NAME "sword" DAMAGE 4 SPEED 3

ITEM TYPE "armor" NAME "leather" DEFENSE 1
*/

const reward = () => arrayOf(
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
      word('ITEM'), word('TYPE'), word('"health"'),
      word('NAME'), textBlock(),
      word('RECOVERY'), integer(),
    ),
    sequence(
      word('ITEM'), word('TYPE'), textBlock(),
      word('NAME'), textBlock(),
    )
  )
)

const itemDrop = () => sequence(
  word('ITEM_DROP'), textBlock(),
  atLeast(2, 'items', reward())
)

module.exports.itemDrop = () => apply(makeItemDrop, itemDrop());
module.exports.reward = () => apply(makeReward, reward())
