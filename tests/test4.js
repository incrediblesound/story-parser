const parser = require('../main')
const assert = require('assert')

const testStory =
`PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."
"You don't know how you got in the room."
"What do you want to do?"
OPTION 1 "Take the door on the left"
OPTION 2 "Take the door on the right"
OPTION 3 "Take the door at the end of the hall"
--------------------------------------
PAGE 3
"The hall ends in lava, you die!"
(end)
--------------------------------------
PAGE 1
"You are in an empty room."
OPTION 0
"Go back"
--------------------------------------
PAGE 2
"You are in a bright green field, you made it!"
(end)`

describe('simple story with continued text', () => {
  const parserResult = parser(testStory)
  const story = parserResult.result
  it('has an array of page text', () => {
    const text = story.pages[0].text
    assert(Array.isArray(text))
    assert(text.length, 3)
  })
})
