const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const arrayOf = require('../types/arrayOf')
const or = require('../types/or')
const sequence = require('../types/sequence')
const { apply, atLeast, maybe, notSpacer, notIgnore } = require('../utils')

const challenge = require('./challenge')
const { SPACER, IGNORE } = require('../constants')

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
          id: parseInt(section[1]),
          text: section[2],
          challenge: section[3] !== IGNORE && section[3],
          options: Array.isArray(section[4]) ? section[3] : 'END'
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
