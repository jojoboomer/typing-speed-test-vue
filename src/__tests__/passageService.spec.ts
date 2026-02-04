import '@/__tests__/mocks'
import { passageService } from '@/lib/passageService'
import { describe, expect, it } from 'vitest'

describe('passageService', () => {
  it('returns a passage for valid difficulty and content', async () => {
    const passage = await passageService.getRandomPassage('easy', 'general')
    expect(passage).toBeDefined()
    expect(passage.text).toBe('Hello world')
  })

  it('returns different passages for different contents', async () => {
    const general = await passageService.getRandomPassage('easy', 'general')
    const programming = await passageService.getRandomPassage('easy', 'programming')
    expect(general.text).not.toBe(programming.text)
  })

  it('throws when passages not found', async () => {
    let threw = false
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await passageService.getRandomPassage('easy' as any, 'unknown' as any)
    } catch {
      threw = true
    }
    expect(threw).toBe(true)
  })
})
