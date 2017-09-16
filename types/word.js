const { trim } = require('../utils')
const { ERROR_PARSER_FAILED, WORD } = require('../constants')

const word = (wordText) => text => {
  text = trim(text)
  for(let i = 0; i < wordText.length; i++){
    if (wordText[i] !== text[i]) {
      return {
        result: false,
        text,
        error: `Expected the word "${wordText}"`,
        errorType: ERROR_PARSER_FAILED,
        parser: WORD
      }
    }
  }
  text = text.substring(wordText.length)
  return { result: wordText, text }
}

module.exports = word
