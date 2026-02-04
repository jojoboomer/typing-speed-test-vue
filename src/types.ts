import type {
  END_STATUS,
  GAME_DIFFICULTY,
  GAME_MODES,
  GAME_STATUS,
  GAME_TEXT,
} from './store/typing.store'

export type GameStatus = (typeof GAME_STATUS)[number]
export type EndStatus = (typeof END_STATUS)[number]
export type GameMode = (typeof GAME_MODES)[number]
export type GameDifficulty = (typeof GAME_DIFFICULTY)[number]
export type GameText = (typeof GAME_TEXT)[number]

export interface Passage {
  id: string
  text: string
}

export interface DifficultyLevel {
  easy: Passage[]
  medium: Passage[]
  hard: Passage[]
}

export interface PassagesData {
  passages: {
    general: DifficultyLevel
    programming: DifficultyLevel
    quotes: DifficultyLevel
    numbers: DifficultyLevel
  }
}

export interface GameResult {
  wpm: number
  accuracy: number
  duration: number
  mode: GameMode
  timestamp: number
}

export interface KeyStats {
  total: number // Veces que se presionó esta tecla
  errors: number // Veces que se presionó incorrectamente
}
