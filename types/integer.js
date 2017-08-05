const { trim } = require('../utils')

const integer = () => text => {
  text = trim(text)
  let x = 0
  while(/[0-9]/.test(text[x])){
    x++
  }
  if (!x) {
    return [false, text, 'Expected a number']
  }
  let num = parseInt(text.substring(0, x))
  text = text.substring(x)
  return [num, text]
}

module.exports = integer
