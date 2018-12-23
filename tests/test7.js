const parser = require('../main')
const assert = require('assert')

const testStory =
`
ITEM_DROP "weapons"
ITEM TYPE "weapon" NAME "ice sword"
DAMAGE 3 SPEED 6
ITEM TYPE "weapon" NAME "fire sword"
DAMAGE 5 SPEED 3

PLAYER "hero"
HEALTH 20 ATTACK 3 DEFENSE 4
ITEM TYPE "weapon" NAME "sword" DAMAGE 3 SPEED 4
ITEM TYPE "weapon" NAME "axe" DAMAGE 5 SPEED 2
ITEM TYPE "armor" NAME "leather" DEFENSE 1
----------------------------

PAGE 0
"There is an enemy in this room!"

CHALLENGE "enemy"
TEXT "here is an enemy"
HEALTH 5 SPEED 3 ATTACK 3 DEFENSE 4
WEAPON "dagger" DAMAGE 2

ITEM TYPE "drop" NAME "weapons"

ITEM TYPE "health" NAME "bottle" RECOVERY 5

END
--------------------------------------`

describe('main parser', () => {
  it('parses a rich story', () => {
    const parserResult = parser(testStory)
    const story = parserResult.result

    assert.equal(story.type, 'RICH')
    assert.equal(story.pages.length, 1)
    assert(story.drops.weapons)
  })
})
