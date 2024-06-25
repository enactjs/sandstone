const Page = require('./CheckboxPage');

describe('Checkbox', function () {

	beforeEach(async function () {
		await Page.open();
	});

	const {
		checkbox1,
		checkbox2,
		checkbox3,
		checkbox4
	} = Page.components;

	describe('default', function () {
		it('should focus on load', async function () {
			expect(await checkbox1.self.isFocused()).toBe(true);
		});

		it('should not be checked', async function () {
			expect(await checkbox1.isChecked).toBe(false);
		});

		it('should be checked', async function () {
			expect(await checkbox2.isChecked).toBe(true);
		});
	});

	describe('5-way', function () {
		it('should focus', async function () {
			await Page.spotlightDown();

			expect(await checkbox2.self.isFocused()).toBe(true);

			await Page.spotlightDown();

			expect(await checkbox3.self.isFocused()).toBe(true);

			await Page.spotlightDown();

			expect(await checkbox4.self.isFocused()).toBe(true);
		});

		it('should get checked', async function () {
			await Page.spotlightSelect();

			expect(await checkbox1.isChecked).toBe(true);
		});

		it('should get checked (indeterminate)', async function () {
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightSelect();

			expect(await checkbox3.isChecked).toBe(true);
		});

		it('should re-uncheck the item when selected twice', async function () {
			await Page.spotlightSelect();
			await Page.spotlightSelect();
			expect(await checkbox1.isChecked).toBe(false);
		});

		it('should not get checked', async function () {
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightDown();
			await Page.spotlightSelect();

			expect(await checkbox4.isChecked).toBe(false);
		});

		it('should get unchecked', async function () {
			await Page.spotlightDown();
			await Page.spotlightSelect();

			expect(await checkbox2.isChecked).toBe(false);
		});
	});

	describe('pointer', function () {
		it('should get checked', async function () {
			await checkbox1.self.click();

			expect(await checkbox1.isChecked).toBe(true);
		});

		it('should get checked (indeterminate)', async function () {
			await checkbox3.self.click();

			expect(await checkbox3.isChecked).toBe(true);
		});

		it('should re-uncheck the item when selected twice', async function () {
			await checkbox1.self.click();
			await checkbox1.self.click();

			expect(await checkbox1.isChecked).toBe(false);
		});

		it('should not get checked', async function () {
			await checkbox4.self.click();

			expect(await checkbox4.isChecked).toBe(false);
		});

		it('should get unchecked', async function () {
			await checkbox2.self.click();

			expect(await checkbox2.isChecked).toBe(false);
		});
	});
});
