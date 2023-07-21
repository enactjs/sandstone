const {test, expect} = require('@playwright/test');


test.describe('DatePickerScreenshot', function () {
	test.beforeEach(async ({page}) => {
		await page.goto('/datepickerscreenshot');
	});

	test('with standard Panel Components', async ({page}) => {
		const day = await page.getByLabel(/day change a value with up down button/);
		await day.hover();
		await expect(day).toContainText("10");
		expect(await page.screenshot({fullPage: true})).toMatchSnapshot('datepickerss.png');
		await page.pause();
	});
});
