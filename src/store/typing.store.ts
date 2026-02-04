// stores/typing.ts
import { usePrecisionTimer } from '@/composables/usePrecisionTimer'
import { passageService } from '@/lib/passageService'
import type { GameDifficulty, GameMode, GameStatus, GameText, KeyStats, Passage } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

/* ---------- Constantes y types ---------- */
export const GAME_STATUS = ['initial', 'started', 'finished', 'paused'] as const
export const END_STATUS = ['first', 'normal', 'record', 'lose'] as const
export const GAME_MODES = ['timed', 'passage', 'relaxed'] as const
export const GAME_DIFFICULTY = ['easy', 'medium', 'hard'] as const
export const GAME_TEXT = ['general', 'programming', 'quotes', 'numbers'] as const

const MODE_CONFIG: Record<GameMode, { durationSeconds: number }> = {
  timed: { durationSeconds: 60 },
  relaxed: { durationSeconds: 120 },
  passage: { durationSeconds: 0 },
}

export const useTypingStore = defineStore(
  'typing-game',
  () => {
    // timer form composable
    const timer = usePrecisionTimer()

    // game state
    const status = ref<GameStatus>('initial')
    const mode = ref<GameMode>('timed')
    const difficulty = ref<GameDifficulty>('easy')
    const textContent = ref<GameText>('general')
    const minAccValue = ref<number>(15) // default minimum accuracy to 15%

    // current passage data
    const currentPassage = ref<Passage | null>(null)
    const userInput = ref<string>('')
    const totalErrors = ref<number>(0)
    const keyStats = ref<Record<string, KeyStats>>({})

    //persisted data
    const personalRecord = ref<number>(0)

    /* --------- getters --------- */
    const targetDuration = computed(() => MODE_CONFIG[mode.value].durationSeconds)

    const wpm = computed(() => {
      const chars = userInput.value.length
      const minutes = timer.elapsedTime.value / 60
      if (chars === 0 || minutes <= 0) return 0
      const words = chars / 5
      return Math.round(words / minutes)
    })

    const accuracy = computed(() => {
      const typed = userInput.value.length
      if (typed === 0) return 100

      let correctChars = 0
      const pass = currentPassage.value?.text || ''
      const input = userInput.value || ''
      const n = Math.min(pass.length, input.length)

      for (let i = 0; i < n; i++) if (input[i] === pass[i]) correctChars++

      return Math.round((correctChars / typed) * 100)
    })

    const isNewRecord = computed(() => {
      return status.value === 'finished' && wpm.value > personalRecord.value
    })

    const correctChars = computed(
      () => userInput.value.split(/\s+/).join('').length - totalErrors.value,
    )

    /* ---------- actions ---------- */
    async function initGame() {
      // Reset de estado
      status.value = 'initial'
      userInput.value = ''
      totalErrors.value = 0
      keyStats.value = {}
      timer.stop()

      try {
        currentPassage.value = await passageService.getRandomPassage(
          difficulty.value,
          textContent.value,
        )
      } catch (error) {
        console.error('Failed to load passage', error)
      }
    }

    function startGame() {
      if (!currentPassage.value) return
      if (status.value !== 'paused') initGame()
      status.value = 'started'
      timer.start()
    }

    function pauseGame() {
      if (status.value === 'started') {
        status.value = 'paused'
        timer.pause()
      }
    }

    function resumeGame() {
      if (status.value === 'paused') {
        status.value = 'started'
        timer.start()
      }
    }

    function stopGame() {
      status.value = 'finished'
      timer.pause() // No stop, para mantener el elapsedTime final visible

      // Actualizar récord
      if (wpm.value > personalRecord.value) {
        personalRecord.value = wpm.value
      }
    }

    function handleInput(newValue: string) {
      if (status.value !== 'started' && status.value !== 'initial') return

      // Auto-start (igual que antes)
      if (status.value === 'initial' && newValue.length > 0) startGame()

      const previousValue = userInput.value
      const isAdding = newValue.length > previousValue.length
      userInput.value = newValue

      // LÓGICA DE HEATMAP
      if (isAdding) {
        const charIndex = newValue.length - 1
        const targetChar = currentPassage.value?.text[charIndex]

        // Normalizamos a minúsculas para agrupar 'A' y 'a' en la misma tecla física
        const typedChar = newValue[charIndex]?.toLowerCase()

        // Inicializar si no existe
        if (!keyStats.value[typedChar]) {
          keyStats.value[typedChar] = { total: 0, errors: 0 }
        }

        const stats = keyStats.value[typedChar]
        stats.total++

        // Si lo que escribió no coincide con lo esperado
        if (targetChar && newValue[charIndex] !== targetChar) {
          totalErrors.value++ // Contador global
          stats.errors++ // Contador específico de la tecla
        }
      }

      checkGameEndConditions()
    }

    function checkGameEndConditions() {
      if (mode.value === 'timed' && timer.elapsedTime.value >= targetDuration.value) {
        stopGame()
        return
      }

      if (
        currentPassage.value?.text &&
        userInput.value.length >= currentPassage.value.text.length
      ) {
        stopGame()
        return
      }

      if (accuracy.value < minAccValue.value && userInput.value.length > 20) {
        stopGame()
        return
      }
    }

    watch(
      () => timer.elapsedTime.value,
      (newVal) => {
        if (status.value === 'started') checkGameEndConditions()
      },
    )

    /* ---------- Exponer API del store ---------- */
    return {
      // State & Getters
      status,
      mode,
      difficulty,
      userInput,
      currentPassage,
      elapsedTime: timer.elapsedTime, // Exponemos solo el valor readonly
      wpm,
      accuracy,
      isNewRecord,
      personalRecord,
      targetDuration,
      keyStats,
      totalErrors,
      totalCorrect: correctChars,
      textContent,
      minAccValue,

      // Actions
      initGame,
      startGame,
      pauseGame,
      resumeGame,
      stopGame, // Alias for manual stop or giving up
      handleInput,

      setMode: (m: GameMode) => {
        mode.value = m
      },
      setDifficulty: (d: GameDifficulty) => {
        difficulty.value = d
      },
      setTextContet: (d: GameText) => {
        textContent.value = d
      },
    }
  },
  {
    persist: {
      key: 'typing-game',
      pick: [
        'personalRecord',
        // 'passageSelected',
        // 'userInput',
        // 'errorCount',
        // 'elapsedTime',
        // 'endType',
        'mode',
        'difficulty',
      ],
    },
  },
)
