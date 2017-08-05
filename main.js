const { apply, atLeast } = require('./utils')
const { IGNORE, SPACER } = require('./constants')
const arrayOf = require('./types/arrayOf')
const or = require('./types/or')
const sequence = require('./types/sequence')

const section = require('./parsers/section')

const notSpacer = (n) => n !== SPACER
const notIgnore = (n) => n !== IGNORE


const makeSections = (sections) => {
  return sections
    .filter(notSpacer)
    .filter(notIgnore)
    .map(section => ({
      id: parseInt(section[1]),
      text: section[2],
      options: Array.isArray(section[3]) ? section[3] : 'END'
    }))
}

const compiler = apply(
  makeSections,
  atLeast(1, 'page',
  arrayOf(section())
  )
)

module.exports = compiler
