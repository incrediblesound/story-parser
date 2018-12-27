const parser = require('../main')
const assert = require('assert')

const testStorySimple =
`
PLAYER "hero"
HEALTH 10 ATTACK 3 DEFENSE 2
ITEM "weapon" NAME "sword" DAMAGE 4 SPEED 3
ITEM "armor" NAME "leather" DEFENSE 1

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
`
PLAYER "hero"
HEALTH 10 ATTACK 3 DEFENSE 2
ITEM "weapon" NAME "sword" DAMAGE 4 SPEED 3
ITEM "armor" NAME "leather" DEFENSE 1

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
"The skeleton's bones lie on the floor."

CHALLENGE "skeleton"
TEXT "A skeleton attacks you!"
HEALTH 5 SPEED 3 ATTACK 1 DEFENSE 4
WEAPON "dagger" DAMAGE 3

ITEM "weapon" NAME "magic sword" DAMAGE 4 SPEED 6

ITEM "armor" NAME "plate mail" DEFENSE 5

OPTION 0
"Go back"

PAGE 1
"You are in an empty room."
OPTION 0
"Go back"

PAGE 2
"You are in a bright green field, you made it!"
END`

describe('main parser', () => {
  // it('parses a story with player', () => {
  //   const story = parser(testStorySimple)
  //   assert.equal(story.pages.length, 4)
  // })
  it('parses a story with player and challenge', () => {
    const story = parser(testStory)
    assert.equal(story.pages.length, 4)
  })
})
