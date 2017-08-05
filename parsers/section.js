const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const arrayOf = require('../types/arrayOf')
const or = require('../types/or')
const sequence = require('../types/sequence')
const { apply, atLeast, maybe } = require('../utils')

const playersStats = require('./playerStats')
const challenge = require('./challenge')
const { SPACER } = require('../constants')

const makeTargets = (parts) => {
  if(Array.isArray(parts) && parts.length){
    return parts.map(part => {
      return {
        target: parseInt(part[1]),
        text: part[2]
      }
    })
  }
}

const option = () => sequence(
  word('OPTION'),
  integer(),
  textBlock()
)

const page = () => sequence(
  word('PAGE'),
  integer(),
  textBlock(),
  maybe(challenge()),
  or(
    word('(end)'),
    apply(makeTargets, atLeast(1, 'option', arrayOf(option())))
  ),
)

const section = () => or(
  playersStats(),
  page(),
  apply(() => SPACER, atLeast(1, 'spacer', arrayOf(word('-'))))
)

module.exports = section
