// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 360000,
  expect: {
    timeout: 20000,
  },
  use: {
    baseURL: 'https://www.vueling.com/en',
    actionTimeout: 30000,
    trace: 'retain-on-failure',
    video: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
