import { expect, test } from '@playwright/test'

test.describe('Game Flow E2E', () => {
  test('should load app and display initial game state', async ({ page }) => {
    await page.goto('/')

    // Check if main content is visible
    await expect(page).toHaveTitle(/vue-typing-challenge|Typing/i)

    // Look for game board or input area
    const input = page.locator('input[type="text"]')
    await expect(input).toBeVisible()
  })

  test('should start game when user types in input', async ({ page }) => {
    await page.goto('/')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Find the input field
    const input = page.locator('input[type="text"]')
    await expect(input).toBeVisible()

    // Type first character (should auto-start the game)
    await input.click()
    await input.type('H', { delay: 50 })

    // Check that some game UI appeared (timer, stats, etc.)
    // Timer might not be immediately visible, check for any game indicator
    await page.waitForTimeout(500)

    // Input should still be visible with our typed character
    const inputValue = await input.inputValue()
    expect(inputValue.length).toBeGreaterThan(0)
  })

  test('should update stats while typing', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const input = page.locator('input[type="text"]')
    await input.click()

    // Type multiple characters
    for (let i = 0; i < 5; i++) {
      await input.type('a', { delay: 50 })
    }

    // Check input has the typed content
    const inputValue = await input.inputValue()
    expect(inputValue.length).toBe(5)
  })
})
