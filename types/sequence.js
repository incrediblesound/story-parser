const sequence = (...parsers) => text => {
  let result = []
  for(let i = 0; i < parsers.length; i++){
    let [nextResult, nextText, nextError] = parsers[i](text)
    if(nextResult === false) return [nextResult, nextText, nextError]

    result.push(nextResult)
    text = nextText
  }
  return [result, text]
}

module.exports = sequence
