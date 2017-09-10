const { trim } = require('../utils')
const { ERROR_PARSER_FAILED, INTEGER } = require('../constants')

const integer = () => text => {
  text = trim(text)
  let x = 0
  while(/[0-9]/.test(text[x])){
    x++
  }
  if (!x) {
    return { result: false, text, error: 'Expected a number', errorType: ERROR_PARSER_FAILED, parser: INTEGER }
  }
  let num = parseInt(text.substring(0, x))
  text = text.substring(x)
  return { result: num, text }
}

module.exports = integer
