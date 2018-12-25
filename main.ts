export {};

const {
  parseLine,
  TokenType,
  isNumber,
} = require('./utils.ts')

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

class ParserState implements ParserState {
  constructor(){
    this.currentLine = -1;
    this.currentPage = null;
    this.parserError = null;
    this.finished = false;
    this.lines = [];
    this.story = null;
  }
  getCurrentLine() {
    return this.lines[this.currentLine] 
  }
  nextLine() { this.currentLine += 1 }
  addPage(page: Page) { this.story.pages.push(page) }
  isFinished() { 
    return this.currentLine >= this.lines.length - 1 
  }
}

interface Challenge {
  name: string;
  health: number;
  speed: number;
  attack: number;
  defense: number;
  weapon: Weapon;
}

const makeChallenge = (
  name: string,
  health: number,
  speed: number,
  attack: number,
  defense: number,
  weapon: Weapon
) => ({
  name,
  health,
  speed,
  attack,
  defense,
  weapon,
})

interface Page {
  id: number;
  text: string[];
  options: any[];
  challenges: Challenge[];
  items: any[];
  isEnd: boolean;
  rewards: any[];
}

interface Weapon {
  name: string;
  damage: number;
  speed: number;
}

interface Player {
  name: string;
  attack: number;
  health: number;
  defense: number;
  weapons: Weapon[];
  armor: any[];
}

interface Option {
  target: number;
  text: string;
}

interface Story {
  pages: Page[];
  player: Player | null;
}

const initalPlayer = (name: string, attack: number, health: number, defense: number): Player => ({
    name,
    attack,
    health,
    defense,
    weapons: [],
    armor: [],
})

const initialOption = (): Option => ({
  target: -1,
  text: '',
})

const initialPage = (): Page => ({
  id: null,
  text: [],
  options: [],
  challenges: [],
  items: [],
  isEnd: false,
  rewards: [],
})

const initialStory = (): Story => ({
  pages: [],
  player: null,
})

const parser = (rawText: string) => {
  const parserState = new ParserState()
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
      } else if (tokens[0].value === 'PLAYER') {
        processPlayer(parserState)
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
  while(!finished && !parserState.isFinished()) {
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
        page.text.push(tokens[0].value)
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
        page.text.push(bodyText)
      }
    } else if (tokens[0].value === 'CHALLENGE') {
      const challenge = processChallenge(parserState)
      page.challenges.push(challenge)
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
    } else if (tokens[0].value === 'ITEM') {
      // Item in room
      let keyValues = getKeyValues(tokens)
      if (keyValues.ITEM === 'armor') {
        page.rewards.push({ name: keyValues.NAME, defense: keyValues.DEFENSE })
      } else if (keyValues.ITEM === 'weapon') {
        page.rewards.push({ name: keyValues.NAME, damage: keyValues.DAMAGE, speed: keyValues.SPEED })
      }
      parserState.nextLine()
    } else if (tokens[0].value === 'END') {
      // page is end of story
      page.isEnd = true
      finished = true
      parserState.nextLine()
    } else {
      throw new Error(`Unknown syntax: "${line}"`)
    }

    if (!finished && !parserState.isFinished()) {
      // if we're not done with the page (or the story) go to next line
      parserState.nextLine()
    }
  }
  parserState.addPage(page)
}

/*
CHALLENGE "skeleton"
TEXT "A skeleton attacks you!"
HEALTH 5 SPEED 3 ATTACK 1 DEFENSE 4
WEAPON "dagger" DAMAGE 3
*/
const processChallenge = (parserState: ParserState): Challenge => {
  let finished = false;
  let name, health, speed, attack, defense, weapon;
  while (!finished && !parserState.isFinished()) {
    let line = parserState.getCurrentLine()
    let tokens = parseLine(line)
    if (!tokens.length) {
      finished = true
    } else if (tokens[0].value === 'CHALLENGE') {
      name = tokens[1].value
      parserState.nextLine()
    } else if (tokens[0].value === 'TEXT') {
      // TODO
      parserState.nextLine()
    } else if (tokens[0].value === 'WEAPON') {
      let keyValues = getKeyValues(tokens)
      weapon = {
        name: keyValues.WEAPON,
        damage: keyValues.DAMAGE,
        speed: 0,
      }
      parserState.nextLine()
    } else if (hasToken(tokens, 'HEALTH')) {
      let keyValues = getKeyValues(tokens)
      health = keyValues.HEALTH
      speed = keyValues.SPEED
      attack = keyValues.ATTACK
      defense = keyValues.DEFENSE
      parserState.nextLine()
    }
  }
  const challenge = makeChallenge(name, health, speed, attack, defense, weapon)
  return challenge
}

const hasToken = (tokens: any[], value: string) => !!tokens.filter(token => token.value === value).length

/*
PLAYER "hero"
HEALTH 10 ATTACK 3 DEFENSE 2
ITEM TYPE "weapon" NAME "sword" DAMAGE 4 SPEED 3
ITEM TYPE "armor" NAME "leather" DEFENSE 1
*/
const processPlayer = (parserState: ParserState) => {
  let finished = false;
  let name, health, attack, defense;
  let weapons = [];
  let armor = [];
  while (!finished && !parserState.isFinished()) {
    let line = parserState.getCurrentLine()
    if (!line.length) {
      parserState.nextLine()
    } else {
      let tokens = parseLine(line)
      if (tokens[0].value === 'PAGE') {
        finished = true
      } else if (tokens[0].value === 'PLAYER') {
        name = tokens[1].value
        parserState.nextLine()
      } else if (tokens[0].value === 'ITEM') {
        let keyValues = getKeyValues(tokens)
        if (keyValues.ITEM === 'armor') {
          armor.push({ name: keyValues.NAME, defense: keyValues.DEFENSE })
        } else if (keyValues.ITEM === 'weapon') {
          weapons.push({ name: keyValues.NAME, damage: keyValues.DAMAGE, speed: keyValues.SPEED })
        }
        parserState.nextLine()
      } else {
        let keyValues = getKeyValues(tokens)
        health = keyValues.HEALTH
        attack = keyValues.ATTACK
        defense = keyValues.DEFENSE
        parserState.nextLine()
      }
    }
  }
  const player = initalPlayer(name, attack, health, defense)
  player.weapons = weapons
  player.armor = armor
  parserState.story.player = player
}

const getKeyValues = (tokens: any[]) => {
  const result: any = {}
  let key: string;
  tokens.forEach((token, i) => {
    if (!(i % 2)) {
      key = token.value
    } else {
      let value = isNumber(token.value)
        ? parseInt(token.value)
        : token.value
      result[key] = value
    }
  })
  return result
}

module.exports = parser
