const parser = require('../main')
const assert = require('assert')

const testStory =
`PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."
OPTION 1 "Take the door on the left"
OPTION 2 "There is a door on the right" IF "sight"
OPTION 3 "Take the door at the end of the hall"
--------------------------------------
PAGE 3
"You can suddenly see!"
ITEM TYPE "hidden" NAME "sight"
OPTION 0 "Go back"
--------------------------------------
PAGE 1
"You are in an empty room."
RECOVER_HEALTH
OPTION 0
"Go back"
--------------------------------------
PAGE 2
"You are in a bright green field, you made it!"
(end)`

describe('simple story with locked room', () => {
  const parserResult = parser(testStory)
  const story = parserResult.result
  console.log(JSON.stringify(story))

  it('has four pages', () => {
    assert(story.pages)
    assert.equal(story.pages.length, 4)
  })
  it('has a type of SIMPLE', () => {
    assert.equal(story.type, 'SIMPLE')
  })
})
