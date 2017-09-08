const { trim } = require('../utils')

const word = (wordText) => text => {
  text = trim(text)
  for(let i = 0; i < wordText.length; i++){
    if(wordText[i] !== text[i]) return { result: false, text, error: `Expected the word "${wordText}"` }
  }
  text = text.substring(wordText.length)
  return { result: true, text }
}

module.exports = word
