const { apply, atLeast, maybe } = require('../utils')
const arrayOf = require('../types/arrayOf')
const word = require('../types/word')
const assert = require('assert')

const test1 = 'Hey!'
const test2 = '...'
const test3 = '..'

describe('apply', () => {

  const parser = apply(() => 'TEST', word('Hey!'))

  it('works', () => {
    const result1 = parser(test1)
    assert.equal(result1.result, 'TEST')
  })
})

describe('atLeast', () => {

  const parser = atLeast(3, 'dot', arrayOf(word('.')))
  const result1 = parser(test2)
  const result2 = parser(test3)

  it('returns arrayOf result on success', () => {

    assert(Array.isArray(result1.result))
    assert(result1.result.length === 3)
  })
  it('returns failure and error message on failure', () => {
    assert(!result2.result)
    assert(result2.error === `Expected at least 3 dot but found 2`)
  })
})
