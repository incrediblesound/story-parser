const { IGNORE, SPACER } = require('./constants')
const { ERROR_DIDNT_BEGIN, ERROR_PARSER_FAILED, WORD, INTEGER } = require('./constants')

const notSpacer = (n) => n !== SPACER
const notIgnore = (n) => n !== IGNORE

const apply = (mapFunc, parser) => text => {
  const parserResult = parser(text)
  if (parserResult.result === false && parserResult.error) {
    return {
      result: false,
      text: parserResult.text,
      error: parserResult.error,
      errorType: parserResult.errorType
    }
  } else {
    parserResult.result = mapFunc(parserResult.result)
    return parserResult
  }
}

const maybe = (parser) => text => {
  const parserResult = parser(text)
  if (parserResult.result === false && (parserResult.parser === WORD || parserResult.parser === INTEGER)) {
    return { result: IGNORE, text: parserResult.text }
  } else if (parserResult.result === false && parserResult.errorType === ERROR_PARSER_FAILED) {
    return { result: false, text: parserResult.text, error: parserResult.error, errorType: parserResult.errorType }
  } else if (parserResult.result === false && parserResult.errorType === ERROR_DIDNT_BEGIN) {
    return { result: IGNORE, text }
  } else {
    return parserResult
  }
}

const atLeast = (num, type, parser) => text => {
  let parserResult = parser(text)
  const length = parserResult.result.length
  if(length < num){
    if(parserResult.error){
      return {
        result: false,
        text: parserResult.text,
        error: parserResult.error,
        errorType: parserResult.errorType
      }
    } else {
      return {
        result: false,
        text,
        error: `Expected at least ${num} ${type} but found ${length}`,
        errorType: length ? ERROR_PARSER_FAILED : ERROR_DIDNT_BEGIN }
    }
  } else {
    return parserResult
  }
}

const trim = (text) => {
  let x = 0
  while(
    text[x] === ' '
    || text[x] === '\n'
    || text[x] === '\r\n'
  ){
    x++
  }
  return text.substring(x)
}

module.exports = {
  notSpacer,
  notIgnore,
  maybe,
  atLeast,
  apply,
  trim,
}
