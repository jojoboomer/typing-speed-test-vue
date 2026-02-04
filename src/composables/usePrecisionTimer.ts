import { ref } from 'vue'

export function usePrecisionTimer() {
  const elapsedTime = ref(0)
  const isRunning = ref(false)
  let startTime = 0
  // removed unused pausedTime
  let rafId: number | null = null

  const update = () => {
    if (!isRunning.value) return
    const now = performance.now()
    // Calculamos tiempo real transcurrido
    elapsedTime.value = (now - startTime) / 1000
    rafId = requestAnimationFrame(update)
  }

  const start = () => {
    if (isRunning.value) return
    // Ajustar startTime considerando si venimos de una pausa
    startTime = performance.now() - elapsedTime.value * 1000
    isRunning.value = true
    rafId = requestAnimationFrame(update)
  }

  const pause = () => {
    isRunning.value = false
    if (rafId) cancelAnimationFrame(rafId)
  }

  const stop = () => {
    pause()
    elapsedTime.value = 0
  }

  return {
    elapsedTime,
    isRunning,
    start,
    pause,
    stop,
  }
}
