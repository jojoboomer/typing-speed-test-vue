import { calculateAccuracy, calculateWPM } from '@/lib/typing-utils'
import { describe, expect, it } from 'vitest'

describe('typing-utils', () => {
  it('calculateWPM returns 0 when time is zero', () => {
    expect(calculateWPM('hello', 0)).toBe(0)
  })

  it('calculateAccuracy basic', () => {
    const res = calculateAccuracy('hello', 'hello')
    expect(res.accuracy).toBe(100)
    expect(res.correctChars).toBe(5)
    expect(res.incorrectChars).toBe(0)
  })
})
