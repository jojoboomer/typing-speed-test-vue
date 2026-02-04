import { capitalize } from '@/lib/utils'
import { describe, expect, it } from 'vitest'

describe('utils', () => {
  it('capitalize should capitalize strings', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('')).toBe('')
  })
})
