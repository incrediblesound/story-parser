const { apply, atLeast, maybe } = require('./utils')
const { IGNORE, SPACER } = require('./constants')
const arrayOf = require('./types/arrayOf')
const or = require('./types/or')
const sequence = require('./types/sequence')
const playerStats = require('./parsers/playerStats')
const sections = require('./parsers/section')
const { itemDrop } = require('./parsers/reward')

const SIMPLE = 'SIMPLE'
const RICH = 'RICH'

const makeStory = (parts) => {
  const story = {}
  if(parts[0] !== IGNORE){
    const drops = parts[0].reduce((acc, curr) => {
      acc[curr.key] = curr.items
      return acc
    }, {})
    story.drops = drops
  }
  if(parts[1] !== IGNORE){
    story.type = RICH
    story.player = parts[1]
  } else {
    story.type = SIMPLE
  }
  story.pages = parts[2]
  return story
}

const parser = apply(makeStory,
  sequence(
    maybe(atLeast(1, 'item drop', arrayOf(itemDrop()))),
    maybe(playerStats()),
    sections()
  )
)

module.exports = parser
