import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the homepage', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/Agent Monorepo/);
    
    // Check for main heading
    await expect(page.locator('h1').first()).toContainText('AI-Driven Code Generator');
    
    // Check for sign in button (when not authenticated)
    const signInButton = page.getByRole('button', { name: /Sign In/i });
    await expect(signInButton).toBeVisible();
  });

  test('should have navigation elements', async ({ page }) => {
    await page.goto('/');
    
    // Check for GitHub link
    const githubLink = page.getByRole('link', { name: /View on GitHub/i });
    await expect(githubLink).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/');
    
    // Check for features
    await expect(page.locator('text=Monorepo Architecture')).toBeVisible();
    await expect(page.locator('text=Modern Stack')).toBeVisible();
    await expect(page.locator('text=Auth Ready')).toBeVisible();
  });
});
