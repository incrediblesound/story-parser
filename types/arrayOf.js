const arrayOf = (parser) => (text) => {
  let result = []
  let next
  let error
  do {
    let [nextResult, nextText, nextError] = parser(text)
    error = nextError

    if(nextResult){
      result.push(nextResult)
    } else {
      break
    }
    text = nextText
    next = nextResult
  } while(next)
  return [result, text, error]
}

module.exports = arrayOf
