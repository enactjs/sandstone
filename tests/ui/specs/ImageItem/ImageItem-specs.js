// const Page = require('./ImageItemPage');
import Page from './ImageItemPage.js';

describe('ImageItem', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first ImageItem at start', async function () {
		expect(await Page.components.imageItemDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const imageItem = Page.components.imageItemDefault;

		it('should have correct text', async function () {
			expect(await imageItem.textContent).to.equal('Caption');
		});

		it('should display an image', async function () {
			expect(await imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemLongCaption.focus();
				await Page.spotlightLeft();

				expect(await imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('long caption', function () {
		const imageItem = Page.components.imageItemLongCaption;

		it('should wrap caption with Marquee with long caption', async function () {
			expect(await imageItem.valueText).to.equal('Image Item with longer caption has Marquee applied');
		});

		it('should display an image', async function () {
			expect(await imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemDefault.focus();
				await Page.spotlightRight();

				expect(await imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('centered', function () {
		const imageItem = Page.components.imageItemCentered;

		it('should display correct text', async function () {
			expect(await imageItem.textContent).to.equal('Centered');
		});

		it('should display an image', async function () {
			expect(await imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemLongCaption.focus();
				await Page.spotlightRight();

				expect(await imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const imageItem = Page.components.imageItemDisabled;

		it('should display correct text', async function () {
			expect(await imageItem.textContent).to.equal('Image Item disabled');
		});

		it('should display an image', async function () {
			expect(await imageItem.image).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemDefault.focus();
				await Page.spotlightDown();

				expect(await imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('selected', function () {
		const imageItem = Page.components.imageItemSelected;

		it('should display correct text', async function () {
			expect(await imageItem.textContent).to.equal('Image Item selected');
		});

		it('should display an image', async function () {
			expect(await imageItem.image).to.be.true();
		});

		it('should have "selected" class', async function () {
			expect(await imageItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemDisabled.focus();
				await Page.spotlightRight();

				expect(await imageItem.self.isFocused()).to.be.true();
			});
		});
	});

	describe('with label', function () {
		const imageItem = Page.components.imageItemWithLabel;

		it('should display an image', async function () {
			expect(await imageItem.image).to.be.true();
		});

		it('should have a label', async function () {
			expect(await imageItem.hasLabel).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the image item', async function () {
				await Page.components.imageItemSelected.focus();
				await Page.spotlightRight();

				expect(await imageItem.self.isFocused()).to.be.true();
			});
		});
	});
});
