import { test, expect } from '@playwright/test';

test('homepage loads and shows header', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('.logo')).toBeVisible();
});
