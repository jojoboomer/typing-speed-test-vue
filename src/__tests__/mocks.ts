import { vi } from 'vitest'

export const mockPassages = {
  passages: {
    general: {
      easy: [{ text: 'Hello world' }],
      medium: [{ text: 'The quick brown fox jumps over the lazy dog' }],
      hard: [{ text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }],
    },
    programming: {
      easy: [{ text: 'const x = 5' }],
      medium: [
        { text: 'function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2) }' },
      ],
      hard: [
        {
          text: 'async function fetchData(url) { const res = await fetch(url); return res.json() }',
        },
      ],
    },
    quotes: {
      easy: [{ text: 'Be yourself' }],
      medium: [{ text: 'The only way to do great work is to love what you do' }],
      hard: [{ text: 'Innovation distinguishes between a leader and a follower' }],
    },
    numbers: {
      easy: [{ text: '123' }],
      medium: [{ text: '1234567890' }],
      hard: [{ text: '1.41421356237 is the square root of 2' }],
    },
  },
}

vi.mock('@/data/data.json', () => mockPassages)
