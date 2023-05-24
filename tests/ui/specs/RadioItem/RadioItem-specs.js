//const Page = require('./RadioItemPage');
import Page from './RadioItemPage.js';

describe('RadioItem', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.radioDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const radioItem = Page.components.radioDefault;

		it('should have correct text', async function () {
			expect(await radioItem.valueText).to.equal('Radio Item1');
		});

		it('should not be selected', async function () {
			expect(await radioItem.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should select the item when selected', async function () {
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).to.be.true();
			});

			it('should re-unselect the item when selected twice', async function () {
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).to.be.false();
			});

			it('should move focus down on SpotlightDown', async function () {
				await Page.spotlightDown();
				expect(await Page.components.radioDefaultSelected.self.isFocused()).to.be.true();
			});

			it('should move focus up on SpotlightUp', async function () {
				await Page.components.radioDefaultSelected.focus();
				await Page.spotlightUp();
				expect(await radioItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', async function () {
				await radioItem.self.click();
				expect(await radioItem.isSelected).to.be.true();
			});

			it('should re-unselect the item when clicked twice', async function () {
				await radioItem.self.click();
				await radioItem.self.click();
				expect(await radioItem.isSelected).to.be.false();
			});
		});
	});

	describe('default selected', function () {
		const radioItem = Page.components.radioDefaultSelected;

		it('should have correct text', async function () {
			expect(await radioItem.valueText).to.equal('Radio Item selected');
		});

		it('should be selected', async function () {
			expect(await radioItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', async function () {
				await radioItem.focus();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).to.be.false();
			});

			it('should re-select the item when selected twice', async function () {
				await radioItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', async function () {
				await radioItem.self.click();
				expect(await radioItem.isSelected).to.be.false();
			});

			it('should re-select the item when clicked twice', async function () {
				await radioItem.self.click();
				await radioItem.self.click();
				expect(await radioItem.isSelected).to.be.true();
			});
		});
	});

	describe('inline', function () {
		const radioItem = Page.components.radioInline;

		it('should have correct text', async function () {
			expect(await radioItem.valueText).to.equal('Radio Item inline');
		});

		it('should be selected', async function () {
			expect(await radioItem.isSelected).to.be.true();
		});

		it('should display item inline', async function () {
			expect(await radioItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', async function () {
				await radioItem.focus();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).to.be.false();
			});

			it('should re-select the item when selected twice', async function () {
				await radioItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', async function () {
				await radioItem.self.click();
				expect(await radioItem.isSelected).to.be.false();
			});

			it('should re-select the item when clicked twice', async function () {
				await radioItem.self.click();
				await radioItem.self.click();
				expect(await radioItem.isSelected).to.be.true();
			});
		});
	});

	// Note, the disabled test below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
	describe('disabled', function () {
		const radioItem = Page.components.radioDisabled;
		const prevRadioItem = Page.components.radioInline;

		it('should have correct text', async function () {
			expect(await radioItem.valueText).to.equal('Radio Item disabled');
		});

		it('should be selected', async function () {
			expect(await radioItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await prevRadioItem.focus();
				await Page.spotlightDown();
				expect(await radioItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', async function () {
				await radioItem.self.click();
				expect(await radioItem.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.

	describe('inline disabled', function () {
		const radioItem = Page.components.radioInlineDisabled;
		const radioDisabled = Page.components.radioDisabled;

		it('should have correct text', async function () {
			expect(await radioItem.valueText).to.equal('Radio Item inline disabled');
		});

		it('should be selected', async function () {
			expect(await radioItem.isSelected).to.be.true();
		});

		it('should display item inline', async function () {
			expect(await radioItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await radioDisabled.focus();
				await Page.spotlightDown();
				expect(await radioItem.self.isFocused()).to.be.true();
			});
			it('should not unselect the item when selected', async function () {
				await radioItem.focus();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', async function () {
				await radioItem.self.click();
				expect(await radioItem.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
});
