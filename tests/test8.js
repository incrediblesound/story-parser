const parser = require('../main')
const assert = require('assert')

const testStory =
`
PAGE 0
"There is an enemy in this room!"

OPTION 1 "Go to room 1"
--------------------------------------
PAGE 1
"Room one fool."
KJHGKJHGKHJg
END
---------------------------------------`

describe('main parser', () => {
  it('parses a rich story', () => {
    const parserResult = parser(testStory)
    assert.equal(parserResult.result, false)
    assert.equal(parserResult.text,
`KJHGKJHGKHJg
END
---------------------------------------`)
  })
})
