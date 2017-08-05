const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const or = require('../types/or')
const assert = require('assert')

const test1 = `
12
`
const test2 = 'hey'
const test3 = '"Hello"'

describe('or', () => {

  const parser = or(
    word('hey'),
    integer()
  )

  it('works', () => {
    const result1 = parser(test1)
    assert.equal(result1[0], '12')

    const result2 = parser(test2)
    assert.equal(result2[0], true)

    const result3 = parser(test3)
    assert.equal(result3[0], false)
    assert.equal(result3[2], 'Expected a number')
  })
})
