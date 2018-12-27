const parser = require('../main')
const assert = require('assert')

const testStoryMoney = 
`
PLAYER "hero"
HEALTH 10 ATTACK 3 DEFENSE 2
ITEM "weapon" NAME "sword" DAMAGE 4 SPEED 3
ITEM "armor" NAME "leather" DEFENSE 1
MONEY "gold" 10
MONEY "silver" 5

PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."
OPTION 1
"Take the door on the left"
OPTION 2
"Take the door on the right"
OPTION 3
"Take the door at the end of the hall"

PAGE 3
MONEY "gold" 10
"The skeleton's bones lie on the floor."

OPTION 0
"Go back"

PAGE 1
"You are in an empty room."
OPTION 0
"Go back"

PAGE 2
"You are in a bright green field, you made it!"
END`

const testStory =
`PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."
OPTION 1 "Take the door on the left"
OPTION 2 "Take the door on the right" LOCK "silver key"
OPTION 3 "Take the door at the end of the hall"

PAGE 3
"There is a silver key in this room!"
ITEM "key" NAME "silver key"

OPTION 0 "Go back"

PAGE 1
"You are in an empty room."
OPTION 0
"Go back"

PAGE 2
"You are in a bright green field, you made it!"
END`

describe('simple story with locked room', () => {
  it('has four pages', () => {
    const story = parser(testStory)
    assert(story.pages)
    assert.equal(story.pages.length, 4)
  })
  it('parses money', () => {
    const story = parser(testStoryMoney)
    assert.equal(story.pages[1].currency[0].name, 'gold')
    assert.equal(story.player.currency[1].name, 'silver')
  })
})
