const Page = require('./RadioItemPage');

describe('RadioItem', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.radioDefault.self.isFocused()).toBe(true);
	});

	describe('default', function () {
		const radioItem = Page.components.radioDefault;

		it('should have correct text', async function () {
			expect(await radioItem.valueText).toBe('Radio Item1');
		});

		it('should not be selected', async function () {
			expect(await radioItem.isSelected).toBe(false);
		});

		describe('5-way', function () {
			it('should select the item when selected', async function () {
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).toBe(true);
			});

			it('should re-unselect the item when selected twice', async function () {
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).toBe(false);
			});

			it('should move focus down on SpotlightDown', async function () {
				await Page.spotlightDown();
				expect(await Page.components.radioDefaultSelected.self.isFocused()).toBe(true);
			});

			it('should move focus up on SpotlightUp', async function () {
				await Page.components.radioDefaultSelected.focus();
				await Page.spotlightUp();
				expect(await radioItem.self.isFocused()).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', async function () {
				await radioItem.self.click();
				expect(await radioItem.isSelected).toBe(true);
			});

			it('should re-unselect the item when clicked twice', async function () {
				await radioItem.self.click();
				await radioItem.self.click();
				expect(await radioItem.isSelected).toBe(false);
			});
		});
	});

	describe('default selected', function () {
		const radioItem = Page.components.radioDefaultSelected;

		it('should have correct text', async function () {
			expect(await radioItem.valueText).toBe('Radio Item selected');
		});

		it('should be selected', async function () {
			expect(await radioItem.isSelected).toBe(true);
		});

		describe('5-way', function () {
			it('should unselect the item when selected', async function () {
				await radioItem.focus();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).toBe(false);
			});

			it('should re-select the item when selected twice', async function () {
				await radioItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', async function () {
				await radioItem.self.click();
				expect(await radioItem.isSelected).toBe(false);
			});

			it('should re-select the item when clicked twice', async function () {
				await radioItem.self.click();
				await radioItem.self.click();
				expect(await radioItem.isSelected).toBe(true);
			});
		});
	});

	describe('inline', function () {
		const radioItem = Page.components.radioInline;

		it('should have correct text', async function () {
			expect(await radioItem.valueText).toBe('Radio Item inline');
		});

		it('should be selected', async function () {
			expect(await radioItem.isSelected).toBe(true);
		});

		it('should display item inline', async function () {
			expect(await radioItem.isInline).toBe(true);
		});

		describe('5-way', function () {
			it('should unselect the item when selected', async function () {
				await radioItem.focus();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).toBe(false);
			});

			it('should re-select the item when selected twice', async function () {
				await radioItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', async function () {
				await radioItem.self.click();
				expect(await radioItem.isSelected).toBe(false);
			});

			it('should re-select the item when clicked twice', async function () {
				await radioItem.self.click();
				await radioItem.self.click();
				expect(await radioItem.isSelected).toBe(true);
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
			expect(await radioItem.valueText).toBe('Radio Item disabled');
		});

		it('should be selected', async function () {
			expect(await radioItem.isSelected).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await prevRadioItem.focus();
				await Page.spotlightDown();
				expect(await radioItem.self.isFocused()).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', async function () {
				await radioItem.self.click();
				expect(await radioItem.isSelected).toBe(true);
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
			expect(await radioItem.valueText).toBe('Radio Item inline disabled');
		});

		it('should be selected', async function () {
			expect(await radioItem.isSelected).toBe(true);
		});

		it('should display item inline', async function () {
			expect(await radioItem.isInline).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await radioDisabled.focus();
				await Page.spotlightDown();
				expect(await radioItem.self.isFocused()).toBe(true);
			});
			it('should not unselect the item when selected', async function () {
				await radioItem.focus();
				await Page.spotlightSelect();
				expect(await radioItem.isSelected).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', async function () {
				await radioItem.self.click();
				expect(await radioItem.isSelected).toBe(true);
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
});
