const Page = require('./FormCheckboxItemPage'),
	{expectChecked, expectUnchecked} = require('./FormCheckboxItem-utils.js');

describe('FormCheckboxItem', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.formCheckboxDefault.self.isFocused()).toBe(true);
	});

	describe('default', function () {
		const FormCheckboxItem = Page.components.formCheckboxDefault;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item');
		});

		it('should not be checked', async function () {
			expectUnchecked(FormCheckboxItem);
		});

		it('should display icon before the text', async function () {
			expect(await FormCheckboxItem.slotBefore).toBe(true);
		});

		describe('5-way', function () {
			it('should check the item when selected', async function () {
				await Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});

			it('should re-uncheck the item when selected twice', async function () {
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expectUnchecked(FormCheckboxItem);
			});

			it('should display check icon when selected', async function () {
				await Page.spotlightSelect();
				expect(await FormCheckboxItem.iconSymbol).toBe('✓');
			});

			it('should move focus down on SpotlightDown', async function () {
				await Page.spotlightDown();
				expect(await Page.components.formCheckboxDefaultSelected.self.isFocused()).toBe(true);
			});

			it('should move focus up on SpotlightUp', async function () {
				await Page.components.formCheckboxDefaultSelected.focus();
				await Page.spotlightUp();
				expect(await FormCheckboxItem.self.isFocused()).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should check the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				expectChecked(FormCheckboxItem);
			});

			it('should re-uncheck the item when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				expectUnchecked(FormCheckboxItem);
			});

			it('should display check icon when clicked', async function () {
				await FormCheckboxItem.self.click();
				expect(await FormCheckboxItem.iconSymbol).toBe('✓');
			});
		});
	});

	describe('default selected', function () {
		const FormCheckboxItem = Page.components.formCheckboxDefaultSelected;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item selected');
		});

		it('should be checked', async function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display correct icon', async function () {
			expect(await FormCheckboxItem.iconSymbol).toBe('✓');
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('indeterminate', async function () {
		const FormCheckboxItem = Page.components.formCheckboxIndeterminate;

		it('should have minus icon', async function () {
			expect(await FormCheckboxItem.indeterminateIconSymbol).toBe('-');
		});

		describe('5-way', function () {
			it('should still display minus icon when selected once', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				expect(await FormCheckboxItem.indeterminateIconSymbol).toBe('-');
			});

			it('should still display minus icon when selected twice', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await FormCheckboxItem.indeterminateIconSymbol).toBe('-');
			});
		});

		describe('pointer', function () {
			it('should still display minus icon when clicked once', async function () {
				await FormCheckboxItem.self.click();
				expect(await FormCheckboxItem.indeterminateIconSymbol).toBe('-');
			});

			it('should still display minus icon when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				expect(await FormCheckboxItem.indeterminateIconSymbol).toBe('-');
			});
		});
	});

	describe('slotBefore', function () {
		const FormCheckboxItem = Page.components.formCheckboxSlotBefore;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item slotBefore');
		});

		it('should be checked', async function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display icon before the text', async function () {
			expect(await FormCheckboxItem.slotBeforeNode).toBe(true);
		});

		it('should display `↑` icon', async function () {
			expect(await FormCheckboxItem.slotBeforeIconSymbol).toBe('↑');
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('inline', function () {
		const FormCheckboxItem = Page.components.formCheckboxInline;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item inline');
		});

		it('should be checked', async function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display icon before the text', async function () {
			expect(await FormCheckboxItem.slotBefore).toBe(true);
		});

		it('should display item inline', async function () {
			expect(await FormCheckboxItem.isInline).toBe(true);
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('inline slotBefore', function () {
		const FormCheckboxItem = Page.components.formCheckboxInlineSlotBefore;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item inline slotBefore');
		});

		it('should be checked', async function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display icon before the text', async function () {
			expect(await FormCheckboxItem.slotBeforeNode).toBe(true);
		});

		it('should display slotBefore icon', async function () {
			expect(await FormCheckboxItem.slotBeforeIconSymbol).toBe('↑');
		});

		it('should display item inline', async function () {
			expect(await FormCheckboxItem.isInline).toBe(true);
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('with label', function () {
		describe('label below', function () {
			const FormCheckboxItem = Page.components.formCheckboxLabelBelow;

			it('should have correct label text', async function () {
				expect(await FormCheckboxItem.labelText).toBe('Label Below');
			});

			it('should have label below', async function () {
				expect(await FormCheckboxItem.hasLabelBelow).toBe(true);
			});
		});

		describe('label above', function () {
			const FormCheckboxItem = Page.components.formCheckboxLabelAbove;

			it('should have correct label text', async function () {
				expect(await FormCheckboxItem.labelText).toBe('Label Above');
			});

			it('should have label above', async function () {
				expect(await FormCheckboxItem.hasLabelAbove).toBe(true);
			});
		});

		describe('label before', function () {
			const FormCheckboxItem = Page.components.formCheckboxLabelBefore;

			it('should have correct label text', async function () {
				expect(await FormCheckboxItem.labelText).toBe('Label Before');
			});

			it('should have label before', async function () {
				expect(await FormCheckboxItem.hasLabelBefore).toBe(true);
			});
		});

		describe('label after', function () {
			const FormCheckboxItem = Page.components.formCheckboxLabelAfter;

			it('should have correct label text', async function () {
				expect(await FormCheckboxItem.labelText).toBe('Label After');
			});

			it('should have label after', async function () {
				expect(await FormCheckboxItem.hasLabelAfter).toBe(true);
			});
		});
	});

	// Note, the disabled test requires the previous component to be known for 5-way navigation and
	// assumes there's no next component.  If you add components before or after this test, please
	// update the links.
	describe('disabled', function () {
		const FormCheckboxItem = Page.components.formCheckboxDisabled;
		const prevFormCheckboxItem = Page.components.formCheckboxLabelAfter;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item disabled');
		});

		it('should be checked', async function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display icon before the text', async function () {
			expect(await FormCheckboxItem.slotBefore).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await prevFormCheckboxItem.focus();
				await Page.spotlightDown();
				expect(await FormCheckboxItem.self.isFocused()).toBe(true);
			});

			it('should not uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should not uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});

	// Note, the disabled test requires the previous component to be known for 5-way navigation and
	// assumes there's no next component.  If you add components before or after this test, please
	// update the links.
	describe('inline disabled', function () {
		const FormCheckboxItem = Page.components.formCheckboxInlineDisabled;
		const formCheckboxInlineDisabled = Page.components.formCheckboxInlineDisabled;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item inline disabled');
		});

		it('should be checked', async function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display item inline', async function () {
			expect(await FormCheckboxItem.isInline).toBe(true);
		});

		it('should display icon before the text', async function () {
			expect(await FormCheckboxItem.slotBefore).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightDown();
				expect(await formCheckboxInlineDisabled.self.isFocused()).toBe(true);
			});
			it('should not uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should not uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				expectChecked(FormCheckboxItem);
			});
		});
		// Note, the disabled test above requires the previous component to be known for 5-way
		// navigation and assumes there's no next component.  If you add components before or after
		// this test, please update the links.
	});
});
