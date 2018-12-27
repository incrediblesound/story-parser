const parser = require('../main')
const assert = require('assert')

const testStory =
`PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."
"You don't know how you got in the room."
"What do you want to do?"
OPTION 1 "Take the door on the left"

PAGE 1
"The hall ends in lava, you die!"

ITEM "weapon" NAME "magic sword" DAMAGE 4 SPEED 6 
COST "gold" 20

END
`

describe('simple story with items for sale', () => {
  it('has an item with a cost', () => {
    const story = parser(testStory)
    const reward = story.pages[1].rewards[0]
    assert.equal(reward.cost.name, 'gold')
    assert.equal(reward.cost.amount, 20)
  })
})
