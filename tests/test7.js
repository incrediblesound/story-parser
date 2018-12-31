const parser = require('../main')
const assert = require('assert')

const testStory =
`
// this is the first page
PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."

// here are the options

OPTION 1
"Take the door on the left"
OPTION 2
"Take the door on the right"

// end first page

// start next page
PAGE 1
"You are in an empty room."
OPTION 0
"Go back"

PAGE 2
"You are in a bright green field, you made it!"
END`

const testStory2 =
`
PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."
ITEM "health" NAME "potion" RECOVERY 5

OPTION 1
"Take the door on the left"
OPTION 2
"Take the door on the right"

PAGE 1
"You are in an empty room."
ITEM "health" NAME "first aid" RECOVERY 10
COST "silver" 10

OPTION 0
"Go back"

PAGE 2
"You are in a bright green field, you made it!"
END`

describe('parser features', () => {
  it('skips comments', () => {
    const story = parser(testStory)
    assert.equal(story.pages.length, 3)
    assert.equal(story.pages[1].options.length, 1)
  })
  it('handles health items w & w/o cost', () => {
    const story = parser(testStory2)
    assert.equal(story.pages[0].rewards[0].type, 'health')
    assert.equal(story.pages[1].rewards[0].type, 'health')
    assert.equal(story.pages[1].rewards[0].cost.amount, 10)
  })
})
