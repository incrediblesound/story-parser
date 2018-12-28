const parser = require('../main')
const assert = require('assert')

const testStory = `

PAGE 0
"this place has two exits."
OPTION 1 "This option goes to page 1" 
OPTION 2 "This option goes to page 2" IF NOT "sight"

PAGE 1
"this place has two exits."
OPTION 0 "This option goes to page 0"
OPTION 2 "This option goes to page 2"

PAGE 2
"this place has two exits."
ITEM "hidden" NAME "sight"

OPTION 0 "This option goes to page 0"
OPTION 1 "This option goes to page 1"`

describe('rich story with combat and rewards text', () => {
  const story = parser(testStory)
  it('has three pages', () => {
    assert(story.pages.length === 3)
  })
})
