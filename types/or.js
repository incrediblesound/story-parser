const or = (...parsers) => text => {
  let nextResult;

  for(let i = 0; i < parsers.length; i++){
    nextResult = parsers[i](text)
    if(nextResult.result) return nextResult
  }

  return nextResult
}

module.exports = or
