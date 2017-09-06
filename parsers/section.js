const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const arrayOf = require('../types/arrayOf')
const or = require('../types/or')
const sequence = require('../types/sequence')
const { apply, atLeast, maybe, notSpacer, notIgnore } = require('../utils')
const { SPACER, IGNORE } = require('../constants')

const challenge = require('./challenge')
const reward = require('./reward')

const makeTargets = (parts) => {
  if(Array.isArray(parts) && parts.length){
    return parts.map(part => {
      return {
        target: part[1],
        text: part[2],
        lock: part[3] === IGNORE ? false : part[3][1]
      }
    })
  }
}

const option = () => sequence(
  word('OPTION'),
  integer(),
  textBlock(),
  maybe(sequence(
    word("LOCK"),
    textBlock()
  ))
)

const page = () => sequence(
  word('PAGE'), integer(), textBlock(),
  maybe(challenge()),
  maybe(reward()),
  or(
    word('(end)'),
    apply(makeTargets, atLeast(1, 'option', arrayOf(option())))
  ),
)

const section = () => or(
  page(),
  apply(() => SPACER, atLeast(1, 'spacer', arrayOf(word('-')))),
)

const makeSections = (sections) => {
    return sections
    .filter(notSpacer)
    .map(section => {
      if(section.type === 'CHALLENGE'){
        return section
      } else {
        return {
          id: section[1],
          text: section[2],
          challenge: section[3] !== IGNORE ? section[3] : undefined,
          rewards: section[4] !== IGNORE ? section[4] : [],
          options: Array.isArray(section[5]) ? section[5] : 'END'
        }
      }
    })
}

const sections = () =>
  apply(
    makeSections,
    atLeast(1, 'page',
    arrayOf(section()))
  )

module.exports = sections
