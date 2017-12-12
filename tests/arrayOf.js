const arrayOf = require('../types/arrayOf')
const word = require('../types/word')
const assert = require('assert')

const test1 = 'Hey!Hey!Hey!womf'
const test2 = 'oobly'

describe('arrayOf', () => {

  const parser = arrayOf(word('Hey!'))

  it('returns array of items on match', () => {
    const result1 = parser(test1)
    assert(Array.isArray(result1.result))
    assert.equal(result1.result.length, 3)
  })
  it('returns empty array on no match', () => {
    const result2 = parser(test2)
    assert(Array.isArray(result2.result))
    assert.equal(result2.result.length, 0)
  })
})
