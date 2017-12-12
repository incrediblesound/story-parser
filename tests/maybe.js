const { apply, atLeast, maybe } = require('../utils')
const arrayOf = require('../types/arrayOf')
const word = require('../types/word')
const assert = require('assert')

const test_a = 'AAABAA'
const test_b = 'ABA'

describe('maybe', () => {

  it('works', () => {
    let parser = maybe(atLeast(2, 'words', arrayOf(word('A'))))
    const result1 = parser(test_a)
    const result2 = parser(test_b)
  })
})
