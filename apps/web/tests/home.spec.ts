import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the welcome message', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: /Welcome to Fullstack Monorepo/i })).toBeVisible();
    await expect(page.getByText(/Production-quality monorepo/i)).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('link', { name: /Open Studio/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Sign In/i })).toBeVisible();
  });

  test('should navigate to studio page', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('link', { name: /Open Studio/i }).click();
    
    await expect(page).toHaveURL('/studio');
    await expect(page.getByRole('heading', { name: /App Studio/i })).toBeVisible();
  });
});
