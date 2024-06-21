const Page = require('./ItemPage');

describe('Item', function () {
	const item1 = Page.components.item1;
	const item2Disabled = Page.components.item2Disabled;
	const item3WithLabel = Page.components.item3WithLabel;
	const item4Inline = Page.components.item4Inline;
	const item5InLineDisabled = Page.components.item5InLineDisabled;
	const item7Inline = Page.components.item7Inline;

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		it('should have focus on first item at start', async function () {
			expect(await item1.self.isFocused()).toBe(true);
		});

		describe('default', function () {

			describe('5-way', function () {
			// Step 3 - 5-way Up
				it('should focus the first item with 5-way Up - [QWTC-1819]', async function () {
					await item2Disabled.focus();
					await Page.spotlightUp();
					expect(await item1.self.isFocused()).toBe(true);
				});

				// Step 5 - 5-way Down
				it('should focus an item with a label with 5-way Down - [QWTC-1819]', async function () {
					await item2Disabled.focus();
					await Page.spotlightDown();
					expect(await item3WithLabel.self.isFocused()).toBe(true);
				});

				// Validating that the items are in fact inline and can be navigated between via 5-way
				it('should focus an inline item with 5-way Left', async function () {
					await item7Inline.focus();
					await Page.spotlightLeft();
					expect(await Page.components.item6Inline.self.isFocused()).toBe(true);
				});

				it('should focus an inline item with 5-way Right', async function () {
					await item7Inline.focus();
					await Page.spotlightRight();
					expect(await Page.components.item8Inline.self.isFocused()).toBe(true);
				});
			});

			describe('pointer', function () {
			// Step 3 - Focus on the Item title. In sampler, the item has no label. Here we focusing on an item with a label.
				it('should focus the third item when hovered - [QWTC-1820]', async function () {
					await item3WithLabel.hover();
					expect(await item3WithLabel.self.isFocused()).toBe(true);
				});

				it('should focus an item when switching from pointer to 5-way', async function () {
					await item1.hover();
					await item2Disabled.focus();
					expect(await item2Disabled.self.isFocused()).toBe(true);
				});
			});
		});

		describe('disabled', function () {

			describe('5-way', function () {
			// Step 7 - 5-way Up
				it('should focus a disabled item with 5-way Up - [QWTC-1819]', async function () {
					await item3WithLabel.focus();
					await Page.spotlightUp();
					expect(await item2Disabled.self.isFocused()).toBe(true);
				});

				// Step 8 - 5-way Down
				it('should focus a disabled item with 5-way Down - [QWTC-1819]', async function () {
					await item1.focus();
					await Page.spotlightDown();
					expect(await item2Disabled.self.isFocused()).toBe(true);
				});

				it('should focus a disabled and inline item with 5-way Right', async function () {
					await item4Inline.focus();
					await Page.spotlightRight();
					expect(await item5InLineDisabled.self.isFocused()).toBe(true);
				});
			});

			// Step 4 - Focus on the disabled Item title
			describe('pointer', function () {
				it('should focus the disabled item with hover - [QWTC-1820]', async function () {
					await item2Disabled.hover();
					expect(await item2Disabled.self.isFocused()).toBe(true);
				});
			});
		});
	});

	describe('RTL locale', function () {
		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should have focus on first item at start', async function () {
			expect(await item1.self.isFocused()).toBe(true);
		});

		describe('default', function () {

			describe('5-way', function () {
				// Validating that the items are in fact inline and can be navigated between via 5-way
				it('should focus an inline item with 5-way Right', async function () {
					await item7Inline.focus();
					await Page.spotlightRight();
					expect(await Page.components.item6Inline.self.isFocused()).toBe(true);
				});

				it('should focus an inline item with 5-way Left', async function () {
					await item7Inline.focus();
					await Page.spotlightLeft();
					expect(await Page.components.item8Inline.self.isFocused()).toBe(true);
				});
			});
		});
	});
});
