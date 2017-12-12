const { ERROR_PARSER_FAILED } = require('../constants')

const or = (...parsers) => text => {
  let nextResult;

  for(let i = 0; i < parsers.length; i++){
    nextResult = parsers[i](text)
    if (nextResult.error === ERROR_PARSER_FAILED || nextResult.result !== false) {
      return nextResult
    }
  }

  return nextResult
}

module.exports = or
