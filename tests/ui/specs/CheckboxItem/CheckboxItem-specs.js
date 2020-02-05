const Page = require('./CheckboxItemPage'),
	{expectChecked, expectInline, expectUnchecked} = require('./CheckboxItem-utils.js'),
	{expectOrdering} = require('@enact/ui-test-utils/test/utils.js');

describe('CheckboxItem', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const checkboxItem = Page.components.checkboxDefault;

			it('should have focus on first item at start', function () {
				expect(checkboxItem.self.hasFocus()).to.be.true();
			});

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item');
			});

			it('should not be checked', function () {
				expectUnchecked(checkboxItem);
			});

			it('should display icon before the text', function () {
				expect(checkboxItem.isBefore).to.be.true();
			});

			it('should have icon to the left of marquee text', function () {
				expectOrdering(checkboxItem.icon, checkboxItem.value);
			});

			describe('5-way', function () {
				it('should check the item when selected - [GT-21124]', function () {
					Page.spotlightSelect();
					expectChecked(checkboxItem);
				});

				it('should re-uncheck the item when selected twice', function () {
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectUnchecked(checkboxItem);
				});

				it('should display check icon when selected', function () {
					Page.spotlightSelect();
					expect(checkboxItem.iconSymbol).to.equal('✓');
				});

				it('should move focus down on SpotlightDown', function () {
					Page.spotlightDown();
					expect(Page.components.checkboxDefaultSelected.self.hasFocus()).to.be.true();
				});

				it('should move focus up on SpotlightUp', function () {
					Page.components.checkboxDefaultSelected.focus();
					Page.spotlightUp();
					expect(checkboxItem.self.hasFocus()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should check the item when clicked', function () {
					checkboxItem.self.click();
					expectChecked(checkboxItem);
				});

				it('should re-uncheck the item when clicked twice', function () {
					checkboxItem.self.click();
					checkboxItem.self.click();
					expectUnchecked(checkboxItem);
				});

				it('should display check icon when clicked', function () {
					checkboxItem.self.click();
					expect(checkboxItem.iconSymbol).to.equal('✓');
				});
			});
		});

		describe('selected', function () {
			const checkboxItem = Page.components.checkboxDefaultSelected;

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item selected');
			});

			it('should be checked', function () {
				expectChecked(checkboxItem);
			});

			it('should display correct icon - [GT-21121]', function () {
				expect(checkboxItem.iconSymbol).to.equal('✓');
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', function () {
					checkboxItem.focus();
					Page.spotlightSelect();
					expectUnchecked(checkboxItem);
				});

				it('should re-check the item when selected twice', function () {
					checkboxItem.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', function () {
					checkboxItem.self.click();
					expectUnchecked(checkboxItem);
				});

				it('should re-check the item when clicked twice', function () {
					checkboxItem.self.click();
					checkboxItem.self.click();
					expectChecked(checkboxItem);
				});
			});
		});

		describe('iconPosition after', function () {
			const checkboxItemIconAfter = Page.components.checkboxIconAfter;

			it('should have correct text', function () {
				expect(checkboxItemIconAfter.valueText).to.equal('Checkbox Item after');
			});

			it('should be checked', function () {
				expectChecked(checkboxItemIconAfter);
			});

			it('should display icon after the text', function () {
				expect(checkboxItemIconAfter.isAfter).to.be.true();
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', function () {
					checkboxItemIconAfter.focus();
					Page.spotlightSelect();
					expectUnchecked(checkboxItemIconAfter);
				});

				it('should re-check the item when selected twice', function () {
					checkboxItemIconAfter.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectChecked(checkboxItemIconAfter);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', function () {
					checkboxItemIconAfter.self.click();
					expectUnchecked(checkboxItemIconAfter);
				});

				it('should re-check the item when clicked twice', function () {
					checkboxItemIconAfter.self.click();
					checkboxItemIconAfter.self.click();
					expectChecked(checkboxItemIconAfter);
				});
			});
		});

		describe('inline', function () {
			const checkboxItem = Page.components.checkboxInline;

			it('should have two inlined checkboxes positioned inlined', function () {
				const checkboxItem2 = Page.components.checkboxInlineAfter.self;

				expectInline(checkboxItem.self, checkboxItem2);
			});

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item inline');
			});

			it('should be checked', function () {
				expectChecked(checkboxItem);
			});

			it('should display icon before the text', function () {
				expect(checkboxItem.isBefore).to.be.true();
			});

			it('should display item inline', function () {
				expect(checkboxItem.isInline).to.be.true();
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', function () {
					checkboxItem.focus();
					Page.spotlightSelect();
					expectUnchecked(checkboxItem);
				});

				it('should re-check the item when selected twice', function () {
					checkboxItem.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', function () {
					checkboxItem.self.click();
					expectUnchecked(checkboxItem);
				});

				it('should re-check the item when clicked twice', function () {
					checkboxItem.self.click();
					checkboxItem.self.click();
					expectChecked(checkboxItem);
				});
			});
		});

		describe('inline after', function () {
			const checkboxItem = Page.components.checkboxInlineAfter;

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item inline after');
			});

			it('should be checked', function () {
				expectChecked(checkboxItem);
			});

			it('should display icon after the text', function () {
				expect(checkboxItem.isAfter).to.be.true();
			});

			it('should display item inline', function () {
				expect(checkboxItem.isInline).to.be.true();
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', function () {
					checkboxItem.focus();
					Page.spotlightSelect();
					expectUnchecked(checkboxItem);
				});

				it('should re-check the item when selected twice', function () {
					checkboxItem.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', function () {
					checkboxItem.self.click();
					expectUnchecked(checkboxItem);
				});

				it('should re-check the item when clicked twice', function () {
					checkboxItem.self.click();
					checkboxItem.self.click();
					expectChecked(checkboxItem);
				});
			});
		});

		// Note, the disabled test below requires the previous component to be known for 5-way
		// navigation and assumes there's no next component.  If you add components before or after
		// this test, please update the links.
		describe('disabled', function () {
			const checkboxItem = Page.components.checkboxDisabled;
			const prevCheckboxItem = Page.components.checkboxInlineAfter;

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item disabled');
			});

			it('should be checked', function () {
				expectChecked(checkboxItem);
			});

			it('should display icon before the text', function () {
				expect(checkboxItem.isBefore).to.be.true();
			});

			describe('5-way', function () {
				it('should be able to focus the item', function () {
					prevCheckboxItem.focus();
					Page.spotlightDown();
					expect(checkboxItem.self.hasFocus()).to.be.true();
				});
				it('should not uncheck the item when selected', function () {
					Page.spotlightDown();
					expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should not uncheck the item when clicked', function () {
					checkboxItem.self.click();
					expectChecked(checkboxItem);
				});
			});
		});
		// Note, the disabled test above requires the previous component to be known for 5-way
		// navigation and assumes there's no next component.  If you add components before or after
		// this test, please update the links.
	});

	describe('RTL locale', function () {
		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should have focus on first item at start', function () {
			expect(Page.components.checkboxDefault.self.hasFocus()).to.be.true();
		});

		it('should have icon to the right of text when default', function () {
			const checkboxItem = Page.components.checkboxDefault;

			expectOrdering(checkboxItem.value, checkboxItem.icon);
		});

		it('should have two inlined checkboxes positioned inlined', function () {
			const checkboxItem1 = Page.components.checkboxInline.self;
			const checkboxItem2 = Page.components.checkboxInlineAfter.self;

			expectInline(checkboxItem1, checkboxItem2);
		});
	});
});
