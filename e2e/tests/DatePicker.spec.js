const {test, expect} = require('@playwright/test');

test.describe('DatePicker', function () {
	test.beforeEach(async ({page}) => {
		await page.goto('/datepicker');
	});


	test('should change day value on mouse wheel down', async function ({page}) {
		const day = await page.getByLabel(/day change a value with up down button/);
		await day.hover();
		await expect(day).toContainText("10");
		await page.mouse.wheel(0, 100);
		await expect(day).toContainText("9");
	});
});
