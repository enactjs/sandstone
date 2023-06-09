const {test, expect} = require('@playwright/test')

test.describe('Button', function () {
	test.beforeEach(async ({page}) => {
		await page.goto('http://127.0.0.1:3000/Button');
	});

	test.describe('5-way',  function () {
		test('has title', async ({page}) => {
			const button = await page.getByRole('button').filter({hasText: 'Default Button'});
			// Expect a title "to contain" a substring.
			await expect(button).toHaveId('button1');
		});

		test('should focus disabled button on 5-way right', async function ({page}) {
			const buttonDisabled = await page.getByRole('button').filter({hasText: 'Button Disabled'})
			await page.keyboard.press('ArrowRight');
			await expect(buttonDisabled).toBeFocused();
		});

		test('should focus buttonSizeSmall button on 5-way left', async function ({page}) {
			await page.getByPlaceholder('inputButton').hover();
			const buttonSizeSmall = await page.getByRole('button').filter({hasText: 'Button size small'})
			await page.keyboard.press('ArrowLeft');
			await expect(buttonSizeSmall).toBeFocused();
		});
	});

	test.describe('pointer', function () {
		test('should focus the disabled when hovered', async function ({page}) {
			const buttonDisabled = await page.getByRole('button').filter({hasText: 'Button Disabled'})
			await buttonDisabled.hover();
			await expect(buttonDisabled).toBeFocused();
		});

		test('should focus first when hovered', async function ({page}) {
			const button = await page.getByRole('button').filter({hasText: 'Default Button'});
			await button.hover();
			await expect(button).toBeFocused();
		});
	});
});
