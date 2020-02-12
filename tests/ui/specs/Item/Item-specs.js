const Page = require('./ItemPage');
const {validateTitle} = require('./Item-utils');

describe('Item', function () {
	const item1Default = Page.components.item1Default;
	const item2Disabled = Page.components.item2Disabled;
	const item3WithLabel = Page.components.item3WithLabel;
	const item4Inline = Page.components.item4Inline;
	const item5InLineDisabled = Page.components.item5InLineDisabled;
	const item7Inline = Page.components.item7Inline;

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should have focus on first item at start', function () {
			expect(item1Default.self.hasFocus()).to.be.true();
		});

		describe('default', function () {

			validateTitle(item1Default, 'Item 1');

			describe('5-way', function () {
			// Step 3 - 5-way Up
				it('should focus the first item with 5-way Up - [GT-28153]', function () {
					item2Disabled.focus();
					Page.spotlightUp();
					expect(item1Default.self.hasFocus()).to.be.true();
				});

				// Step 5 - 5-way Down
				it('should focus an item with a label with 5-way Down - [GT-28153]', function () {
					item2Disabled.focus();
					Page.spotlightDown();
					expect(item3WithLabel.self.hasFocus()).to.be.true();
				});

				// Validating that the items are in fact inline and can be navigated between via 5-way
				it('should focus an inline item with 5-way Left', function () {
					item7Inline.focus();
					Page.spotlightLeft();
					expect(Page.components.item6Inline.self.hasFocus()).to.be.true();
				});

				it('should focus an inline item with 5-way Right', function () {
					item7Inline.focus();
					Page.spotlightRight();
					expect(Page.components.item8Inline.self.hasFocus()).to.be.true();
				});
			});

			describe('pointer', function () {
			// Step 3 - Focus on the Item title
				it('should focus the first item when hovered - [GT-28154]', function () {
					item1Default.hover();
					expect(item1Default.self.hasFocus()).to.be.true();
				});

				it('should focus an item when switching from pointer to 5-way]', function () {
					item1Default.hover();
					item2Disabled.focus();
					expect(item2Disabled.self.hasFocus()).to.be.true();
				});
			});
		});

		describe('disabled', function () {

			validateTitle(item2Disabled, 'Item 2 disabled');

			describe('5-way', function () {
			// Step 7 - 5-way Up
				it('should focus a disabled item with 5-way Up - [GT-28153]', function () {
					item3WithLabel.focus();
					Page.spotlightUp();
					expect(item2Disabled.self.hasFocus()).to.be.true();
				});

				// Step 8 - 5-way Down
				it('should focus a disabled item with 5-way Down - [GT-28153]', function () {
					item1Default.focus();
					Page.spotlightDown();
					expect(item2Disabled.self.hasFocus()).to.be.true();
				});

				it('should focus a disabled and inline item with 5-way Right', function () {
					item4Inline.focus();
					Page.spotlightRight();
					expect(item5InLineDisabled.self.hasFocus()).to.be.true();
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

	describe('RTL locale', function () {
		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should have focus on first item at start', function () {
			expect(item1Default.self.hasFocus()).to.be.true();
		});

		it('should have focus on first item at start', function () {
			expect(item1Default.self.hasFocus()).to.be.true();
		});

		describe('default', function () {

			validateTitle(item1Default, 'Item 1');

			describe('5-way', function () {
				// Step 3 - 5-way Up
				it('should focus the first item with 5-way Up - [GT-28153]', function () {
					item2Disabled.focus();
					Page.spotlightUp();
					expect(item1Default.self.hasFocus()).to.be.true();
				});

				// Step 5 - 5-way Down
				it('should focus an item with 5-way Down - [GT-28153]', function () {
					item2Disabled.focus();
					Page.spotlightDown();
					expect(item3WithLabel.self.hasFocus()).to.be.true();
				});
			});

			describe('pointer', function () {
			// Step 3 - Focus on the Item title
				it('should focus the first item when hovered - [GT-28154]', function () {
					item1Default.hover();
					expect(item1Default.self.hasFocus()).to.be.true();
				});
			});
		});

		describe('disabled', function () {

			validateTitle(item2Disabled, 'Item 2 disabled');

			describe('5-way', function () {
			// Step 7 - 5-way Up
				it('should focus the disabled item with 5-way Up - [GT-28153]', function () {
					item3WithLabel.focus();
					Page.spotlightUp();
					expect(item2Disabled.self.hasFocus()).to.be.true();
				});

				// Step 8 - 5-way Down
				it('should focus the disabled item with 5-way Down - [GT-28153]', function () {
					item1Default.focus();
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
});
