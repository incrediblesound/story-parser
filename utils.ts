enum TokenType {
  WORD = 0,
  NUMBER = 1,
  TEXT = 2,
}

interface Token {
  type: number;
  value: string;
  complete?: boolean;
}

const parseLine = (line: string): Token[] => {
  const tokens: Token[] = []
  let index = 0
  while (index < line.length) {

    if (isCapitalLetter(line[index])) {
      // WORDS: "PAGE"
      let result = ''
      while(isCapitalLetter(line[index])) {
        result += line[index]
        index += 1
      }
      tokens.push({ type: TokenType.WORD, value: result })

    } else if (isNumber(line[index])) {
      // NUMBERS: "4769"
      let result = ''
      while(isNumber(line[index])) {
        result += line[index]
        index += 1
      }
      tokens.push({ type: TokenType.NUMBER, value: result })
    
    } else if (line[index] === '"') {
      let result = ''
      index += 1
      while(line[index] !== '"' && index < line.length) {
        result = result + line[index]
        index += 1
      }
      tokens.push({
        type: TokenType.TEXT,
        value: result,
        complete: line[index] === '"'
      })
      if (line[index] === '"') {
        index += 1
      }
    } else if (line[index] === ' ') {
      // SPACE
      index += 1
    }
  }
  return tokens
}

const isNumber = (string: string) => /[0-9]/.test(string)
const isCapitalLetter = (string: string) => /[A-Z]/.test(string)

module.exports = {
  TokenType,
  parseLine,
}