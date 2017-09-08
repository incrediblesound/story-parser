const { ERROR_DIDNT_BEGIN, ERROR_PARSER_FAILED } = require('../constants')

const sequence = (...parsers) => text => {
  let result = []
  for (let i = 0; i < parsers.length; i++) {
    let parserResult = parsers[i](text)
    if (parserResult.result === false && !i) {
      return {
        result: false,
        text,
        error: `Sequence didnt begin, failed with: ${parserResult.error}`,
        errorType: ERROR_DIDNT_BEGIN }
    } else if (parserResult.result === false && i) {
      return {
        result: false,
        text,
        error: parserResult.error,
        errorType: ERROR_PARSER_FAILED }
    } else {
      result.push(parserResult.result)
      text = parserResult.text
    }
  }
  return { result, text }
}

module.exports = sequence
