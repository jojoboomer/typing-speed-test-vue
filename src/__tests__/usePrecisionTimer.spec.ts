import { usePrecisionTimer } from '@/composables/usePrecisionTimer'
import { describe, expect, it } from 'vitest'

describe('usePrecisionTimer', () => {
  it('starts, pauses and stops correctly', () => {
    const timer = usePrecisionTimer()
    expect(timer.elapsedTime.value).toBe(0)
    timer.start()
    expect(timer.isRunning.value).toBe(true)
    timer.pause()
    expect(timer.isRunning.value).toBe(false)
    timer.stop()
    expect(timer.elapsedTime.value).toBe(0)
  })
})
