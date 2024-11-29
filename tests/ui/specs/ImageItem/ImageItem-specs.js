const Page = require('./ImageItemPage');

describe('ImageItem', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first ImageItem at start', async function () {
		expect(await Page.components.imageItemDefault.self.isFocused()).toBe(true);
	});

	describe('default', function () {
		const imageItem = Page.components.imageItemDefault;

		it('should have correct text', async function () {
			expect(await imageItem.textContent).toBe('Caption');
		});

		it('should display an image', async function () {
			expect(await imageItem.image).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemLongCaption.focus();
				await Page.spotlightLeft();

				expect(await imageItem.self.isFocused()).toBe(true);
			});
		});
	});

	describe('long caption', function () {
		const imageItem = Page.components.imageItemLongCaption;

		it('should wrap caption with Marquee with long caption', async function () {
			expect(await imageItem.valueText).toBe('Image Item with longer caption has Marquee applied');
		});

		it('should display an image', async function () {
			expect(await imageItem.image).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemDefault.focus();
				await Page.spotlightRight();

				expect(await imageItem.self.isFocused()).toBe(true);
			});
		});
	});

	describe('centered', function () {
		const imageItem = Page.components.imageItemCentered;

		it('should display correct text', async function () {
			expect(await imageItem.textContent).toBe('Centered');
		});

		it('should display an image', async function () {
			expect(await imageItem.image).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemLongCaption.focus();
				await Page.spotlightRight();

				expect(await imageItem.self.isFocused()).toBe(true);
			});
		});
	});

	describe('disabled', function () {
		const imageItem = Page.components.imageItemDisabled;

		it('should display correct text', async function () {
			expect(await imageItem.textContent).toBe('Image Item disabled');
		});

		it('should display an image', async function () {
			expect(await imageItem.image).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemDefault.focus();
				await Page.spotlightDown();

				expect(await imageItem.self.isFocused()).toBe(true);
			});
		});
	});

	describe('selected', function () {
		const imageItem = Page.components.imageItemSelected;

		it('should display correct text', async function () {
			expect(await imageItem.textContent).toBe('Image Item selected');
		});

		it('should display an image', async function () {
			expect(await imageItem.image).toBe(true);
		});

		it('should have "selected" class', async function () {
			expect(await imageItem.isSelected).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemDisabled.focus();
				await Page.spotlightRight();

				expect(await imageItem.self.isFocused()).toBe(true);
			});
		});
	});

	describe('with label', function () {
		const imageItem = Page.components.imageItemWithLabel;

		it('should display an image', async function () {
			expect(await imageItem.image).toBe(true);
		});

		it('should have a label', async function () {
			expect(await imageItem.hasLabel).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemSelected.focus();
				await Page.spotlightRight();

				expect(await imageItem.self.isFocused()).toBe(true);
			});
		});
	});
});
