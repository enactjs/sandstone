const Page = require('./CheckboxPage');

describe('Checkbox', function () {

	beforeEach(async function () {
		await Page.open();
	});

	const {
		normalCheckbox,
		selectedCheckbox,
		indeterminateCheckbox,
		disabledCheckbox
	} = Page.components;

	describe('default', function () {
		it('should focus on load', async function () {
			expect(await normalCheckbox.self.isFocused()).toBe(true);
		});

		it('should not be checked', async function () {
			expect(await normalCheckbox.isChecked).toBe(false);
		});

		it('should be checked', async function () {
			expect(await selectedCheckbox.isChecked).toBe(true);
		});
	});

	describe('5-way', function () {
		it('should focus', async function () {
			await Page.spotlightDown();

			expect(await selectedCheckbox.self.isFocused()).toBe(true);

			await Page.spotlightDown();

			expect(await indeterminateCheckbox.self.isFocused()).toBe(true);

			await Page.spotlightDown();

			expect(await disabledCheckbox.self.isFocused()).toBe(true);
		});

		it('should get checked', async function () {
			await Page.spotlightSelect();

			expect(await normalCheckbox.isChecked).toBe(true);
		});

		it('should get checked (indeterminate)', async function () {
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightSelect();

			expect(await indeterminateCheckbox.isChecked).toBe(true);
		});

		it('should re-uncheck the item when selected twice', async function () {
			await Page.spotlightSelect();
			await Page.spotlightSelect();
			expect(await normalCheckbox.isChecked).toBe(false);
		});

		it('should not get checked', async function () {
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightSelect();

			expect(await disabledCheckbox.isChecked).toBe(false);
		});

		it('should get unchecked', async function () {
			await Page.spotlightDown();
			await Page.spotlightSelect();

			expect(await selectedCheckbox.isChecked).toBe(false);
		});
	});

	describe('pointer', function () {
		it('should get checked', async function () {
			await normalCheckbox.self.click();

			expect(await normalCheckbox.isChecked).toBe(true);
		});

		it('should get checked (indeterminate)', async function () {
			await indeterminateCheckbox.self.click();

			expect(await indeterminateCheckbox.isChecked).toBe(true);
		});

		it('should re-uncheck the item when selected twice', async function () {
			await normalCheckbox.self.click();
			await normalCheckbox.self.click();

			expect(await normalCheckbox.isChecked).toBe(false);
		});

		it('should not get checked', async function () {
			await disabledCheckbox.self.click();

			expect(await disabledCheckbox.isChecked).toBe(false);
		});

		it('should get unchecked', async function () {
			await selectedCheckbox.self.click();

			expect(await selectedCheckbox.isChecked).toBe(false);
		});
	});
});
