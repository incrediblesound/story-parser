export {};

const {
  parseLine,
  TokenType,
} = require('./utils')

interface ParserState {
  currentLine: number;
  currentPage: any;
  parserError: null | string;
  finished: boolean;
  lines: string[]
  story: any;
  getCurrentLine(): string;
  nextLine(): void;
  addPage(page: Page): void;
  isFinished(): boolean;
}
const parserState: ParserState = {
  currentLine: -1,
  currentPage: null,
  parserError: null,
  finished: false,
  lines: [],
  story: null,
  getCurrentLine: function() {
    return this.lines[this.currentLine] 
  },
  nextLine: function() { this.currentLine += 1 },
  addPage: function (page) { this.story.pages.push(page) },
  isFinished: function() { return this.currentLine >= this.lines.length - 1 }
}

interface Page {
  id: number;
  text: string;
  options: any[];
  challenges: any[];
  items: any[];
  isEnd: boolean;
}

interface Player {}

const initalPlayer = () => ({})

const initialOption = () => ({
  target: null,
  text: '',
})

const initialPage = (): Page => ({
  id: null,
  text: '',
  options: [],
  challenges: [],
  items: [],
  isEnd: false,
})

const initialStory = () => ({
  pages: [],
  player: initalPlayer()
})

const parser = (rawText) => {
  parserState.lines = rawText.split('\n')
  parserState.story = initialStory()

  let line;
  parserState.nextLine()

  while (!parserState.isFinished()) {
    line = parserState.getCurrentLine()
    if (line.length) {
      const tokens = parseLine(line)
      if (tokens[0].value === 'PAGE') {
        processPage(parserState)
      }
    } else {
      parserState.nextLine()
    }
  }
  return parserState.story
}

const processPage = (parserState: ParserState) => {
  const page = initialPage()
  let finished = false
  let line = null
  while(!finished) {
    line = parserState.getCurrentLine()

    if (!line.length) {
      parserState.nextLine()
      continue
    }

    let tokens = parseLine(line)
    if (tokens[0].value === 'PAGE'){
      // Simple page declaration eg PAGE 1
      if (page.id === null) {
        page.id = parseInt(tokens[1].value)
      } else {
        finished = true
      }
    } else if (tokens[0].type === TokenType.TEXT && tokens.length === 1) {
      // Line starts a text block
      if (tokens[0].complete) {
        page.text = tokens[0].value
      } else {
        let stringComplete = false
        let bodyText = tokens[0].value

        while(!stringComplete) {
          parserState.nextLine()
          line = parserState.getCurrentLine()
          if (line[line.length-1] === '"') {
            bodyText = bodyText + line.substring(0, line.length-1)
            stringComplete = true
          } else {
            bodyText = bodyText + line
          }
        }
        page.text = bodyText
      }
    } else if (tokens[0].value === 'OPTION') {
      // Option pointing to another page
      const option = initialOption()
      option.target = parseInt(tokens[1].value)
      if (tokens[2] && tokens[2].type === TokenType.TEXT) {
        option.text = tokens[2].value
      } else {
        parserState.nextLine()
        line = parserState.getCurrentLine()
        tokens = parseLine(line)
        if (tokens.length > 1 || tokens[0].type !== TokenType.TEXT) {
          // Throw syntax error
        } else {
          option.text = tokens[0].value
        }
      }
      page.options.push(option)
    } else if (tokens[0].value === 'END') {
      page.isEnd = true
      finished = true
    }

    if (!finished) {
      parserState.nextLine()
    }
  }
  parserState.addPage(page)
}

module.exports = parser
