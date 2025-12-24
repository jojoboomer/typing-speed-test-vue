import { passages } from '@/data/data.json'
import { defineStore } from 'pinia'
import { useGameStore } from './game.store'

export const GAME_STATUS = ['initial', 'started', 'finished'] as const
export const END_STATUS = ['first', 'normal', 'recod'] as const
export const GAME_MODES = ['timed', 'passage'] as const
export const GAME_DIFFICULTY = ['easy', 'medium', 'hard'] as const

export type GameStatus = (typeof GAME_STATUS)[number]
export type EndStatus = (typeof END_STATUS)[number]
export type GameMode = (typeof GAME_MODES)[number]
export type GameDifficulty = (typeof GAME_DIFFICULTY)[number]

export const useTestStore = defineStore('test-status', {
  state: () => {
    return {
      passageSelected: '',
      correctChars: 0,
      incorrectChars: 0,
      countdownTime: 60,
      elapsedTime: 0,
    }
  },
  getters: {
    totalCharPassage: (state): number => {
      return state.passageSelected.split('').length
    },
    totalCharsUser(): number {
      return this.incorrectChars + this.correctChars
    },
    wpm(): number {
      if (this.totalCharsUser === 0 && this.elapsedTime === 0) return 0
      if (useGameStore().status !== 'started') return this.wpm
      const words = this.totalCharsUser / 5 || 0
      const minutes = this.elapsedTime / 60 || 0
      return Math.round(words / minutes)
    },
    accuracy(): number {
      if (this.totalCharsUser === 0) return 100
      const calc = Math.round((this.correctChars / this.totalCharsUser) * 100)
      return calc
    },
    passageFinished(): boolean {
      return this.totalCharsUser === this.totalCharPassage
    },
    shouldEnd(): boolean {
      const passageFinished = this.totalCharsUser === this.totalCharPassage
      const timeout = this.elapsedTime === this.countdownTime && useGameStore().mode === 'timed'
      return passageFinished || timeout
    },
  },
  actions: {
    addCorrectChar() {
      this.correctChars = this.correctChars + 1
    },
    addWrongChar() {
      this.incorrectChars = this.incorrectChars + 1
    },
    getRandomPassage() {
      const passagesDiff = passages[useGameStore().difficulty]
      const randomPassage = passagesDiff[Math.floor(Math.random() * passagesDiff.length)] as {
        text: string
      }
      this.passageSelected = randomPassage.text
    },
    async restartTestState() {
      this.getRandomPassage()
      this.correctChars = 0
      this.incorrectChars = 0
      this.countdownTime = 60
      this.elapsedTime = 0
    },
  },
  persist: {
    // key: 'typing-test-data',
    // omit: ['status', 'endType'],
    // pick: ['personalRecord'],
    // debug: true,
  },
})
