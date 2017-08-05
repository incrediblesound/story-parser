const { trim } = require('../utils')

const word = (wordText) => text => {
  text = trim(text)
  for(let i = 0; i < wordText.length; i++){
    if(wordText[i] !== text[i]) return [false, text, `Expected the word "${wordText}"`]
  }
  text = text.substring(wordText.length)
  return [true, text]
}

module.exports = word
