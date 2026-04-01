import { test, expect } from '@playwright/test'

test.describe('Someday — Proposal Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for main content to be painted
    await page.waitForSelector('#hero', { state: 'visible' })
  })

  // ── Page foundation ────────────────────────────
  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Jethy/)
  })

  test('particle canvas is present and sized', async ({ page }) => {
    const canvas = page.locator('#particle-canvas')
    await expect(canvas).toBeVisible()
    const box = await canvas.boundingBox()
    expect(box!.width).toBeGreaterThan(100)
    expect(box!.height).toBeGreaterThan(100)
  })

  // ── Hero section ───────────────────────────────
  test('hero section renders greeting and title', async ({ page }) => {
    await expect(page.locator('#hero-greeting')).toContainText('Jethy')
    await expect(page.locator('#hero-title')).toBeVisible()
    await expect(page.locator('#scroll-indicator')).toBeVisible()
  })

  test('hero bears image is present', async ({ page }) => {
    const bearsImg = page.locator('#hero-bears-img')
    await expect(bearsImg).toBeVisible()
  })

  // ── Navigation / sections ──────────────────────
  test('all 6 sections exist in the DOM', async ({ page }) => {
    for (const id of ['hero', 'story', 'photos', 'reasons', 'promise', 'proposal']) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
  })

  test('story section has 4 timeline items', async ({ page }) => {
    await page.locator('#story').scrollIntoViewIfNeeded()
    const items = page.locator('.timeline-item')
    await expect(items).toHaveCount(4)
  })

  test('reasons section has 6 reason cards', async ({ page }) => {
    await page.locator('#reasons').scrollIntoViewIfNeeded()
    const cards = page.locator('.reason-card')
    await expect(cards).toHaveCount(6)
  })

  test('promise letter contains his words', async ({ page }) => {
    await page.locator('#promise').scrollIntoViewIfNeeded()
    await expect(page.locator('.letter-salutation')).toContainText('Jethy')
    await expect(page.locator('#ll-1')).toContainText('couple of days')
    await expect(page.locator('#ll-5')).toContainText('love you')
    await expect(page.locator('.letter-signature')).toContainText('Eunich John')
  })

  // ── Proposal interaction ───────────────────────
  test('YES and NO buttons are visible', async ({ page }) => {
    await page.locator('#proposal').scrollIntoViewIfNeeded()
    await expect(page.locator('#yes-btn')).toBeVisible()
    await expect(page.locator('#no-btn')).toBeVisible()
  })

  test('NO button moves away on hover', async ({ page }) => {
    await page.locator('#proposal').scrollIntoViewIfNeeded()
    const noBtn = page.locator('#no-btn')
    const before = await noBtn.boundingBox()
    await noBtn.hover()
    await page.waitForTimeout(600)
    const after = await noBtn.boundingBox()
    // Position should have changed
    const moved = Math.abs(after!.x - before!.x) + Math.abs(after!.y - before!.y)
    expect(moved).toBeGreaterThan(5)
  })

  test('clicking YES shows celebration overlay', async ({ page }) => {
    await page.locator('#proposal').scrollIntoViewIfNeeded()
    await page.locator('#yes-btn').click()
    await page.waitForTimeout(400)
    await expect(page.locator('#celebration')).toHaveClass(/active/)
    await expect(page.locator('.celebration-title')).toBeVisible()
    await expect(page.locator('.celebration-names')).toContainText('Eunich John')
    await expect(page.locator('.celebration-names')).toContainText('Janna Jeth')
  })

  test('confetti canvas is active after YES', async ({ page }) => {
    await page.locator('#proposal').scrollIntoViewIfNeeded()
    await page.locator('#yes-btn').click()
    await page.waitForTimeout(300)
    const confetti = page.locator('#confetti-canvas')
    await expect(confetti).toBeVisible()
  })

  // ── Audio player ───────────────────────────────
  test('audio player pill is visible', async ({ page }) => {
    await expect(page.locator('#audio-player')).toBeVisible()
    await expect(page.locator('#audio-player')).toContainText('Panata')
  })

  // ── Mobile viewport ───────────────────────────
  test('renders correctly on mobile (iPhone 13 viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.locator('#hero')).toBeVisible()
    await expect(page.locator('#yes-btn')).toBeVisible()
    await expect(page.locator('.audio-pill')).toBeVisible()
  })

  // ── Photos ────────────────────────────────────
  test('photo grid has 4 photo cards', async ({ page }) => {
    await page.locator('#photos').scrollIntoViewIfNeeded()
    await expect(page.locator('.photo-card')).toHaveCount(4)
  })
})
