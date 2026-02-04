export function calculateWPM(text: string, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0
  const characters = text.length
  const words = characters / 5 // Standard: 5 characters = 1 word
  const minutes = timeInSeconds / 60
  return Math.round(words / minutes)
}

export function calculateAccuracy(
  userInput: string,
  passage: string,
): {
  accuracy: number
  correctChars: number
  incorrectChars: number
} {
  if (userInput.length === 0) {
    return { accuracy: 100, correctChars: 0, incorrectChars: 0 }
  }

  let correctChars = 0
  let incorrectChars = 0

  for (let i = 0; i < userInput.length; i++) {
    if (i < passage.length && userInput[i] === passage[i]) {
      correctChars++
    } else {
      incorrectChars++
    }
  }

  const accuracy = Math.round((correctChars / userInput.length) * 100)
  return { accuracy, correctChars, incorrectChars }
}
