const { trim } = require('../utils')

const textBlock = () => text => {
  text = trim(text)
  if(text[0] !== '"') return [ false, text, 'Expected quoted text block']
  text = text.substring(1)

  let result = ''
  while(text[0] !== '"'){
    result += text[0]
    text = text.substring(1)
    if(!text.length) return [ false, text, 'Quoted text block is missing an end quote']
  }
  text = text.substring(1) // remove final quote
  return [result, text]
}

module.exports = textBlock
