const parser = require('../main')
const assert = require('assert')

const testStory = `
PLAYER "hero"
HEALTH 20 ATTACK 3 DEFENSE 4
ITEM "weapon" NAME "sword" DAMAGE 3 SPEED 4
ITEM "armor" NAME "leather" DEFENSE 1
MONEY "gold" 20

PAGE 0
"this place has two exits."
OPTION 1 "This option goes to page 1"
OPTION 2 "This option goes to page 2" LOCK "key"

PAGE 2
"this place has two exits."
OPTION 0 "This option goes to page 0"

PAGE 1
"this place has a key."
ITEM "key" NAME "key"

OPTION 0 "This option goes to page 0"`

describe('rich story with combat and rewards text', () => {
  const story = parser(testStory)
  it('has three pages', () => {
    assert(story.pages.length === 3)
  })
})
