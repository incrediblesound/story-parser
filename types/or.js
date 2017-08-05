const or = (...parsers) => text => {
  let nextResult;

  for(let i = 0; i < parsers.length; i++){
    nextResult = parsers[i](text)
    if(nextResult[0]) return nextResult
  }

  return nextResult
}

module.exports = or
