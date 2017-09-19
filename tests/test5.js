const parser = require('../main')
const assert = require('assert')

const testStory = `
PLAYER "hero"
HEALTH 10 ATTACK 3 DEFENSE 2
ITEM TYPE "weapon" NAME "sword" DAMAGE 4 SPEED 3
ITEM TYPE "armor" NAME "leather" DEFENSE 1
--------------------------------------
PAGE 0
"Take the gold to buy the armor"

ITEM TYPE "key" NAME "10 gold"

OPTION 1 "buy armor" LOCK "10 gold"
OPTION 2 "fight dragon"
----------------------------------
PAGE 1
"Here it is! A suit of excellent armor."

ITEM TYPE "armor" NAME "plate mail" DEFENSE 8

OPTION 0 "go back"
-------------------------------
PAGE 2
"You have defeated the dragon!"

CHALLENGE "dragon"
HEALTH 5 SPEED 1 ATTACK 5 DEFENSE 4
WEAPON "fire" DAMAGE 5

ITEM TYPE "weapon" NAME "magic sword"
DAMAGE 5 SPEED 5

(end)
`

describe('rich story with combat and rewards text', () => {
  const parserResult = parser(testStory)
  console.log(parserResult)
  const story = parserResult.result
  it('has three pages', () => {
    assert(story.pages.length === 3)
  })
})
