const assert = require('assert')
const { reward } = require('../parsers/reward')


const test1 = `ITEM TYPE "weapon" NAME "magic sword"
DAMAGE 4 SPEED 6

ITEM TYPE "armor" NAME "plate mail"
DEFENSE 5`

const test2 = `ITEM TYPE "drop" NAME "weapons"`

describe('reward', () => {

  it('works', () => {
    const result1 = reward()(test1)
    assert(result1.result[0].type === 'weapon')
    assert(result1.result[1].type === 'armor')
    const result2 = reward()(test2)
    assert(result2.result[0].type === 'drop')
  })
})
