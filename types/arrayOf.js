const { ERROR_DIDNT_BEGIN, ERROR_PARSER_FAILED } = require('../constants')

const arrayOf = (parser) => (text) => {
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
    } else {
      break
    }
    text = parserResult.text
    next = parserResult.result
    counter++
  } while(next)
    return { result, text }
}

module.exports = arrayOf
