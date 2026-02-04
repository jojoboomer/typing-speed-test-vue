import type { GameDifficulty, GameText, Passage } from '@/types'

// OPTIMIZACIÓN: Importación dinámica.
// El JSON no se carga en el bundle inicial, ahorrando KB al inicio.
// Solo se descarga cuando el usuario va a jugar.
const loadPassages = async () => import('@/data/data.json')

export const passageService = {
  async getRandomPassage(difficulty: GameDifficulty, content: GameText): Promise<Passage> {
    const module = await loadPassages()
    // Asumimos estructura { passages: { easy: [], medium: [] } }
    console.log(module.passages)
    const pool = module.passages[content][difficulty]

    if (!pool?.length) {
      throw new Error(`No passages found for difficulty: ${difficulty}`)
    }

    const idx = Math.floor(Math.random() * pool.length)
    return pool[idx]
  },
}
