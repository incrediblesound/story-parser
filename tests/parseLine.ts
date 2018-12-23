const {
  parseLine,
  TokenType,
} = require('../utils.ts')
const assert = require('assert')

const line1 = 'PAGE 1'
const line2 = 'PAGE 2698 OPTION 3'
const line3 = 'ITEM TYPE "hidden" NAME "sight"'
const line4 = '"You are in a room, there is a door to the left and a door to the right.'

const resultString1 = JSON.stringify([ { type: TokenType.WORD, value: 'PAGE' }, { type: TokenType.NUMBER, value: '1' } ])
const resultString2 = JSON.stringify([ 
  { type: TokenType.WORD, value: 'PAGE' },
  { type: TokenType.NUMBER, value: '2698' },
  { type: TokenType.WORD, value: 'OPTION' },
  { type: TokenType.NUMBER, value: '3' },
])
const resultString3 = JSON.stringify([ { type: 0, value: 'ITEM' },
{ type: 0, value: 'TYPE' },
{ type: 2, value: 'hidden', complete: true },
{ type: 0, value: 'NAME' },
{ type: 2, value: 'sight', complete: true } ])
const resultString4 = JSON.stringify(
  [ { type: 2,
    value: 'You are in a room, there is a door to the left and a door to the right.',
    complete: false } ]
)

describe('parseLine', () => {
  it('parses words and numbers', () => {
    const result1 = parseLine(line1)
    const result2 = parseLine(line2)
    assert.equal(JSON.stringify(result1), resultString1)
    assert.equal(JSON.stringify(result2), resultString2)
  })
  it('parses text and keywords together', () => {
    const result3 = parseLine(line3)
    assert.equal(JSON.stringify(result3), resultString3)
  })
  it('parses text blocks indicating if text is incomplete on this line', () => {
    const result4 = parseLine(line4)
    assert.equal(JSON.stringify(result4), resultString4)
  })
})