const parser = require('../main')
const assert = require('assert')

const testStory =
`
PLAYER "hero"
HEALTH 10 SPEED 3 ATTACK 3 DEFENSE 4
WEAPON "sword"
ARMOR "leather"
--------------------------------------
PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."
OPTION 1
"Take the door on the left"
OPTION 2
"Take the door on the right"
OPTION 3
"Take the door at the end of the hall"
--------------------------------------
PAGE 3
"There is a skeleton in this room!"

CHALLENGE "skeleton"
HEALTH 5 SPEED 3 ATTACK 1 DEFENSE 4
WEAPON "dagger"

REWARD TYPE "weapon" NAME "magic sword"
ATTACK 4 SPEED 6

REWARD TYPE "armor" NAME "plate mail"
DEFENSE 8

OPTION 0
"Go back"
--------------------------------------
PAGE 1
"You are in an empty room."
OPTION 0
"Go back"
--------------------------------------
PAGE 2
"You are in a bright green field, you made it!"
(end)`

describe('main parser', () => {
  it('parses a rich story', () => {
    const [ story, text, error ] = parser(testStory)
    assert.equal(story.type, 'RICH')
    assert.equal(story.pages.length, 4)
  })
})
