const word = require('../types/word')
const integer = require('../types/integer')
const textBlock = require('../types/textBlock')
const assert = require('assert')

const test1 = `

  hello
`

const test2 = `hey`

const test3 = '23'

const test4 = `
  999999
`

const test5 = `
  "And then, there was the war..."
`

describe('word', () => {
  it('parses words', () => {
    const result1 = word('hello')(test1)
    const result2 = word('hey')(test2)
    assert.equal(result1.result, true)
    assert.equal(result2.result, true)
  })
  it('throws a descriptive error', () => {
    const error1 = word('hello')(test3)
    assert.equal(error1.error, 'Expected the word "hello"')
  })
})

describe('integer', () => {
  it('parses numbers', () => {
    const result3 = integer()(test3)
    const result4 = integer()(test4)
    assert.equal(result3.result, '23')
    assert.equal(result4.result, '999999')
  })
  it('throws a descriptive error', () => {
    const error2 = integer()(test5)
    assert.equal(error2.error, 'Expected a number')
  })
})

describe('textBlock', () => {
  it('parses text blocks', () => {
    const result5 = textBlock()(test5)
    assert.equal(result5.result, 'And then, there was the war...')
  })
  it('throws a descriptive error', () => {
    const error3 = textBlock()(test4)
    assert.equal(error3.error, 'Expected quoted text block')
  })
})
