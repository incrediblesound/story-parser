const arrayOf = require('../types/arrayOf')
const word = require('../types/word')
const assert = require('assert')

const test1 = 'Hey!Hey!Hey!womf'
const test2 = 'oobly'

describe('arrayOf', () => {

  const parser = arrayOf(word('Hey!'))

  it('works', () => {
    const result1 = parser(test1)
    assert(Array.isArray(result1.result))
    assert(result1.result.length === 3)

    const result2 = parser(test2)
    assert(Array.isArray(result2.result))
    assert(!result2.result.length)
  })
})
