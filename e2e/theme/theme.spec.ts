import { expect, test } from '@playwright/test';

// TODO: This test is skipped and is here as a reference only
test.describe.skip('theme change tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    });

    test('default theme is dark', async ({ page }) => {
        await page.getByTestId('settings-button').click();
        await expect(page.getByTestId('theme-button')).toContainText(
            'Theme: dark',
        );
    });

    test('click theme list item to change theme to light', async ({ page }) => {
        await page.getByTestId('settings-button').click();
        await page.getByTestId('theme-button').click();
        await expect(page.getByTestId('theme-button')).toContainText(
            'Theme: light',
        );
    });

    test('theme change to light persists after reload', async ({ page }) => {
        await page.getByTestId('settings-button').click();
        await expect(page.getByTestId('theme-button')).toContainText(
            'Theme: dark',
        );
        await page.getByTestId('theme-button').click();
        await page.reload();
        await page.getByTestId('settings-button').click();
        await expect(page.getByTestId('theme-button')).toContainText(
            'Theme: light',
        );
    });
});
