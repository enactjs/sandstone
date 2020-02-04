const Page = require('./ItemPage');
const {validateTitle} = require('./Item-utils');

describe('Item', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.itemDefault1.self.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const itemDefault1 = Page.components.itemDefault1;
		const itemDefault3 = Page.components.itemDefault3;

		// validateTitle(itemDefault1, 'Item 1');

		describe('5-way', function () {
			// Step 3 - 5-way Up
			it('should focus the first item with 5-way Up - [GT-28153]', function () {
				Page.components.item2Disabled.focus();
				browser.pause(3000);
				Page.spotlightUp();
				expect(itemDefault1.self.hasFocus()).to.be.true();
				browser.pause(5000);
			});

			// Step 5 - 5-way Down
			it('should focus an item with 5-way Down - [GT-28153]', function () {
				Page.components.item2Disabled.focus();
				browser.pause(3000);
				Page.spotlightDown();
				// browser.pause(5000);
				expect(itemDefault3.self.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			// Step 3 - Focus on the Item title
			it('should focus the first item when hovered - [GT-28154]', function () {
				itemDefault1.hover();
				browser.pause(3000);
				expect(itemDefault1.self.hasFocus()).to.be.true();
				browser.pause(5000);
			});
		});
	});

	describe('disabled', function () {
		const item2Disabled = Page.components.item2Disabled;
		const itemDefault1 = Page.components.itemDefault1;
		const itemDefault3 = Page.components.itemDefault3;

		// validateTitle(item2Disabled, 'Item 2 disabled');

		describe('5-way', function () {
			// Step 7 - 5-way Up
			it('should focus the disabled item with 5-way Up - [GT-28153]', function () {
				itemDefault3.focus();
				Page.spotlightUp();
				expect(item2Disabled.self.hasFocus()).to.be.true();
			});

			// Step 8 - 5-way Down
			it('should focus the disabled item with 5-way Down - [GT-28153]', function () {
				itemDefault1.focus();
				Page.spotlightDown();
				expect(item2Disabled.self.hasFocus()).to.be.true();
			});
		});

		// Step 4 - Focus on the disabled Item title
		describe('pointer', function () {
			it('should focus the disabled item with hover - [GT-28154]', function () {
				item2Disabled.hover();
				expect(item2Disabled.self.hasFocus()).to.be.true();
			});
		});
	});

});
