import { defineStore } from 'pinia'
import { useTestStore } from './test.store'

export const GAME_STATUS = ['initial', 'started', 'finished'] as const
export const END_STATUS = ['first', 'normal', 'recod'] as const
export const GAME_MODES = ['timed', 'passage'] as const
export const GAME_DIFFICULTY = ['easy', 'medium', 'hard'] as const

export type GameStatus = (typeof GAME_STATUS)[number]
export type EndStatus = (typeof END_STATUS)[number]
export type GameMode = (typeof GAME_MODES)[number]
export type GameDifficulty = (typeof GAME_DIFFICULTY)[number]

export const useGameStore = defineStore('game-status', {
  state: () => {
    return {
      // GAME STATE
      status: 'initial' as GameStatus,
      endType: '' as EndStatus,
      personalRecord: 60,
      // CONFIG STATE
      mode: 'timed' as GameMode,
      difficulty: 'easy' as GameDifficulty,
    }
  },
  getters: {
    visibleConfetti: (state) => {
      return state.status === 'finished' && state.endType === 'recod'
    },
  },
  actions: {
    setNewRecord(value: number) {
      this.personalRecord = value
    },
    changeMode(value: GameMode) {
      this.mode = value
    },
    changeDifficulty(value: GameDifficulty) {
      this.difficulty = value
    },
    startGame() {
      this.restartGame()
      this.status = 'started'
    },
    endGame() {
      this.endType = 'first'
      this.status = 'finished'
      const currentWpm = useTestStore().wpm
      if (!this.personalRecord) {
        this.endType = 'first'
      } else if (currentWpm > this.personalRecord) {
        this.endType = 'recod'
        this.setNewRecord(currentWpm)
      } else {
        this.endType = 'normal'
      }
    },
    stopGame() {
      useTestStore().restartTestState()
      this.status = 'initial'
    },
    restartGame() {
      useTestStore().restartTestState()
      this.status = 'initial'
    },
  },
  persist: {
    key: 'typing-test-data',
    // omit: ['status', 'endType'],
    pick: ['personalRecord'],
    debug: true,
  },
})
