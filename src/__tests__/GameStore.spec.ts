import '@/__tests__/mocks'
import { useTypingStore } from '@/store/typing.store'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('typing store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initGame loads a passage and resets state', async () => {
    const store = useTypingStore()
    await store.initGame()
    expect(store.status).toBe('initial')
    expect(store.currentPassage).toBeDefined()
    expect(store.userInput).toBe('')
    expect(store.totalErrors).toBe(0)
  })

  it('start/pause/resume/stop flow', async () => {
    const store = useTypingStore()
    // Must init game first to load a passage
    await store.initGame()
    store.startGame()
    expect(store.status).toBe('started')
    store.pauseGame()
    expect(store.status).toBe('paused')
    store.resumeGame()
    expect(store.status).toBe('started')
    store.stopGame()
    expect(store.status).toBe('finished')
  })

  it('handleInput updates userInput and starts game', async () => {
    const store = useTypingStore()
    // Must init game first to load a passage
    await store.initGame()
    store.handleInput('h')
    expect(store.userInput).toBe('h')
    expect(store.status).toBe('started')
  })

  it('setDifficulty updates difficulty', () => {
    const store = useTypingStore()
    store.setDifficulty('hard')
    expect(store.difficulty).toBe('hard')
  })
})
