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
      const option = {
        target: part[1],
        text: part[2],
      }
      if(part[3] !== IGNORE && part[3][0] === 'LOCK'){
        option.lock = part[3][1]
      } else if(part[4] !== IGNORE && part[4][0] === 'IF'){
        option.condition = part[4][1]
      }
      return option
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
  )),
  maybe(sequence(
    word("IF"),
    textBlock()
  ))
)

const page = () => sequence(
  word('PAGE'), integer(),
  arrayOf(textBlock()),
  maybe(word('RECOVER_HEALTH')),
  maybe(challenge()),
  reward(),
  or(
    word('(end)'),
    apply(makeTargets, atLeast(1, 'option', arrayOf(option())))
  ),
)

const section = () => or(
  apply(() => SPACER, atLeast(1, 'spacer', arrayOf(word('-')))),
  page(),
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
          recoverHealth: section[3] === true,
          challenge: section[4] !== IGNORE ? section[4] : false,
          rewards: section[5],
          options: Array.isArray(section[6]) ? section[6] : 'END'
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
