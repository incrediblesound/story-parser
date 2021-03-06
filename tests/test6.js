const parser = require('../main')
const assert = require('assert')

const testStory =
`PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."
OPTION 1 "Take the door on the left" 
OPTION 2 "There is a door on the right" IF "sight"
OPTION 3 "Take the door at the end of the hall" IF NOT "sight"

PAGE 3
"You can suddenly see!"
ITEM "hidden" NAME "sight"

OPTION 0 "Go back"

PAGE 1
"You are in an empty room."
OPTION 0
"Go back"
`

describe('story with hidden item', () => {
  const story = parser(testStory)
  it('has a hidden reward called sight', () => {
    assert(story.pages[1].rewards[0].name === 'sight')
    assert(story.pages[0].options[1].condition.name === 'sight')
    assert(story.pages[0].options[2].exclude.name === 'sight')
    assert.equal(story.pages.length, 3)
  })
})
