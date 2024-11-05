const Page = require('./SwitchItemPage');

describe('SwitchItem', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.switchDefault.self.isFocused()).toBe(true);
	});

	describe('default', function () {
		const switchItem = Page.components.switchDefault;

		it('should have correct text', async function () {
			expect(await switchItem.valueText).toMatch('Switch Item1');
		});

		it('should not be selected', async function () {
			expect(await switchItem.isSelected).toBe(false);
		});

		describe('5-way', function () {
			it('should select the item when selected', async function () {
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).toBe(true);
			});

			it('should re-unselect the item when selected twice', async function () {
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).toBe(false);
			});

			it('should move focus down on SpotlightDown', async function () {
				await Page.spotlightDown();
				expect(await Page.components.switchDefaultSelected.self.isFocused()).toBe(true);
			});

			it('should move focus up on SpotlightUp', async function () {
				await Page.components.switchDefaultSelected.focus();
				await Page.spotlightUp();
				expect(await switchItem.self.isFocused()).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked - [QWTC-2123]', async function () {
				await switchItem.self.click();
				expect(await switchItem.isSelected).toBe(true);
			});

			it('should re-unselect the item when clicked twice - [QWTC-2123]', async function () {
				await switchItem.self.click();
				await switchItem.self.click();
				expect(await switchItem.isSelected).toBe(false);
			});
		});
	});

	describe('default selected', function () {
		const switchItem = Page.components.switchDefaultSelected;

		it('should have correct text', async function () {
			expect(await switchItem.valueText).toMatch('Switch Item selected');
		});

		it('should be selected', async function () {
			expect(await switchItem.isSelected).toBe(true);
		});

		describe('5-way', function () {
			it('should unselect the item when selected', async function () {
				await switchItem.focus();
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).toBe(false);
			});

			it('should re-select the item when selected twice', async function () {
				await switchItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', async function () {
				await switchItem.self.click();
				expect(await switchItem.isSelected).toBe(false);
			});

			it('should re-select the item when clicked twice', async function () {
				await switchItem.self.click();
				await switchItem.self.click();
				expect(await switchItem.isSelected).toBe(true);
			});
		});
	});

	describe('inline', function () {
		const switchItem = Page.components.switchInline;

		it('should have correct text', async function () {
			expect(await switchItem.valueText).toMatch('Switch Item inline');
		});

		it('should be selected', async function () {
			expect(await switchItem.isSelected).toBe(true);
		});

		it('should display item inline', async function () {
			expect(await switchItem.isInline).toBe(true);
		});

		describe('5-way', function () {
			it('should unselect the item when selected', async function () {
				await switchItem.focus();
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).toBe(false);
			});

			it('should re-select the item when selected twice', async function () {
				await switchItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', async function () {
				await switchItem.self.click();
				expect(await switchItem.isSelected).toBe(false);
			});

			it('should re-select the item when clicked twice', async function () {
				await switchItem.self.click();
				await switchItem.self.click();
				expect(await switchItem.isSelected).toBe(true);
			});
		});
	});

	// Note, the disabled test below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
	describe('disabled', function () {
		const switchItem = Page.components.switchDisabled;
		const prevSwitchItem = Page.components.switchInline;

		it('should have correct text', async function () {
			expect(await switchItem.valueText).toMatch('Switch Item disabled');
		});

		it('should be selected', async function () {
			expect(await switchItem.isSelected).toBe(true);
		});

		describe('5-way', function () {
			it('should be able focus the item', async function () {
				await prevSwitchItem.focus();
				await Page.spotlightDown();
				expect(await switchItem.self.isFocused()).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', async function () {
				await switchItem.self.click();
				expect(await switchItem.isSelected).toBe(true);
			});
		});
	});
	// Note, the disabled test above/below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.

	describe('inline disabled', function () {
		const switchItem = Page.components.switchInlineDisabled;
		const prevSwitchInline = Page.components.switchDisabled;

		it('should have correct text', async function () {
			expect(await switchItem.valueText).toMatch('Switch Item inline disabled');
		});

		it('should be selected', async function () {
			expect(await switchItem.isSelected).toBe(true);
		});

		it('should display item inline', async function () {
			expect(await switchItem.isInline).toBe(true);
		});

		describe('5-way', function () {
			it('should be able focus the item', async function () {
				await prevSwitchInline.focus();
				await Page.spotlightDown();
				expect(await switchItem.self.isFocused()).toBe(true);
			});
			it('should not unselect the item when clicked', async function () {
				await switchItem.focus();
				await Page.spotlightSelect();
				expect(await switchItem.isSelected).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', async function () {
				await switchItem.self.click();
				expect(await switchItem.isSelected).toBe(true);
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
});
