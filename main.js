const { apply, atLeast, maybe } = require('./utils')
const { IGNORE, SPACER } = require('./constants')
const arrayOf = require('./types/arrayOf')
const or = require('./types/or')
const sequence = require('./types/sequence')
const playerStats = require('./parsers/playerStats')
const sections = require('./parsers/section')

const SIMPLE = 'SIMPLE'
const RICH = 'RICH'

const makeStory = (parts) => {
  const story = {}
  if(parts[0] !== IGNORE){
    story.type = RICH
    story.player = parts[0]
  } else {
    story.type = SIMPLE
  }
  story.pages = parts[1]
  return story
}

const compiler = apply(makeStory,
  sequence(
    maybe(playerStats()),
    sections()
  )
)

module.exports = compiler
