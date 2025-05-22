import { defineConfig, devices } from '@playwright/test';

// https://playwright.dev/docs/test-configuration
export default defineConfig({
    // Look for test files here, relative to this configuration file.
    testDir: './e2e',

    // Run all tests in parallel.
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.TF_BUILD,

    // Retry on CI only.
    retries: process.env.TF_BUILD ? 2 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.TF_BUILD ? 1 : undefined,

    // Disable reporting
    reporter: [['dot']],

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'http://localhost:5173',

        // Collect trace when retrying the failed test.
        trace: 'on-first-retry',
    },

    // Configure projects for major browsers.
    projects: [
        { name: 'chromium', use: devices['Desktop Chrome'] },
        /* { name: 'webkit', use: devices['Desktop Safari'] },  TODO: Reinstate
        { name: 'firefox', use: devices['Desktop Firefox'] },
        { name: 'Mobile Chrome', use: devices['Pixel 7'] },
        { name: 'Mobile Safari', use: devices['iPhone 15'] }, */
    ],

    // Run your local dev server before starting the tests.
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.TF_BUILD,
        stdout: 'pipe',
    },
});
