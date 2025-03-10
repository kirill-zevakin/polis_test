// playwright.config.js 
/* @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    baseURL: 'https://polis812.github.io/vacuu/',
    headless: true,
  },
  testMatch: /.*\.spec\.js/, 
  reporter: 'html',       
};
module.exports = config;
// vacuu.spec.js

const { test, expect } = require('@playwright/test');

test.describe('Vacuu Landing Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Language switch button should not work', async ({ page }) => {
        const languageButton = await page.locator('.header__lang');
        await expect(languageButton).toBeVisible();
        const initialText = await page.locator('h1').textContent();
        await languageButton.click();
        await page.waitForTimeout(500);
        const newText = await page.locator('h1').textContent();
        expect(newText).toEqual(initialText); 
    });

    test('Blog button should not work', async ({ page }) => {
        const blogButton = await page.locator('text=Blog');
        await expect(blogButton).toBeVisible();
        const initialURL = page.url();
        await blogButton.click();
        await page.waitForTimeout(500);
        const currentURL = page.url();
        expect(currentURL).toEqual(initialURL);
    });

    test('Get Started button should not work', async ({ page }) => {
        const getStartedButton = await page.locator('text=Get Started');
        await expect(getStartedButton).toBeVisible();
        const initialURL = page.url();
        await getStartedButton.click();
        await page.waitForTimeout(500);
        const currentURL = page.url();
        expect(currentURL).toEqual(initialURL);
    });

    test('Testimonial switch buttons should not work', async ({ page }) => {
        const previousButton = await page.locator('.reviews__actions');
        const nextButton = await page.locator('.arrow-right arrow-enable');   
        await expect(previousButton).toBeVisible();
        await expect(nextButton).toBeVisible();
        const initialTestimonial = await page.locator('.testimonial-content').textContent();
        await previousButton.click();
        await page.waitForTimeout(500);
        const prevTestimonial = await page.locator('.testimonial-content').textContent();
        expect(prevTestimonial).toEqual(initialTestimonial);
        await nextButton.click();
        await page.waitForTimeout(500);
        const nextTestimonial = await page.locator('.testimonial-content').textContent();
        expect(nextTestimonial).toEqual(initialTestimonial);
    });
});
