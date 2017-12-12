const { ERROR_DIDNT_BEGIN, ERROR_PARSER_FAILED, WORD } = require('../constants')

const arrayOf = (parser, label) => (text) => {
  let result = []
  let next
  let error
  let errorType
  let counter = 0
  do {
    let parserResult = parser(text)
    error = parserResult.error
    errorType = parserResult.errorType
    if(parserResult.result !== false){
      result.push(parserResult.result)
    } else if (parserResult.parser !== WORD && parserResult.errorType === ERROR_PARSER_FAILED) {
      return {
        result: false,
        text: parserResult.text,
        error: parserResult.error,
        errorType: ERROR_PARSER_FAILED,
      }
    } else {
      text = parserResult.text
      error = parserResult.error
      errorType = parserResult.errorType
      break
    }
    text = parserResult.text
    next = parserResult.result
    counter++
  } while(next)
    return { result, text, error }
}

module.exports = arrayOf
