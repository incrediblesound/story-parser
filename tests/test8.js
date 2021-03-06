const parser = require('../main')
const assert = require('assert')

const testStory =`
GOAL 1 "Find room 2" PAGE 2
GOAL 2 "Find room 3" ITEM "sword"
GOAL 3 "Find room 4" DEFEAT "skeleton"

PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."
OPTION 1
"Take the door on the left"
OPTION 2
"Take the door on the right"

PAGE 1
"You are in an empty room."
OPTION 0
"Go back"

PAGE 2
"You are in a bright green field, you made it!"
END`

describe('simple story', () => {
  it('three page story parsed has three pages', () => {
    const story = parser(testStory)
    assert(story.pages)
    assert.equal(story.pages.length, 3)
  })
  it('has three goals', () => {
    const story = parser(testStory)
    assert(story.pages)
    assert.equal(story.goals.length, 3)
  })
})