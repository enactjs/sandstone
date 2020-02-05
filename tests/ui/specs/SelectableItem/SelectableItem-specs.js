const Page = require('./SelectableItemPage'),
	{expectSelected, expectUnselected} = require('./SelectableItem-utils.js');

describe('SelectableItem', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.selectableDefault.self.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const selectableItem = Page.components.selectableDefault;

		it('should have correct text', function () {
			expect(selectableItem.valueText).to.equal('Selectable Item1');
		});

		it('should not be selected', function () {
			expectUnselected(selectableItem);
		});

		describe('5-way', function () {
			it('should select the item when selected', function () {
				Page.spotlightSelect();
				expectSelected(selectableItem);
			});

			it('should re-unselect the item when selected twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectUnselected(selectableItem);
			});

			it('should move focus down on SpotlightDown', function () {
				Page.spotlightDown();
				expect(Page.components.selectableDefaultSelected.self.hasFocus()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.components.selectableDefaultSelected.focus();
				Page.spotlightUp();
				expect(selectableItem.self.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', function () {
				selectableItem.self.click();
				expectSelected(selectableItem);
			});

			it('should re-unselect the item when clicked twice', function () {
				selectableItem.self.click();
				selectableItem.self.click();
				expectUnselected(selectableItem);
			});
		});
	});

	describe('default selected', function () {
		const selectableItem = Page.components.selectableDefaultSelected;

		it('should have correct text', function () {
			expect(selectableItem.valueText).to.equal('Selectable Item selected');
		});

		it('should be selected', function () {
			expectSelected(selectableItem);
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				selectableItem.focus();
				Page.spotlightSelect();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when selected twice', function () {
				selectableItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(selectableItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				selectableItem.self.click();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when clicked twice', function () {
				selectableItem.self.click();
				selectableItem.self.click();
				expectSelected(selectableItem);
			});
		});
	});

	describe('inline', function () {
		const selectableItem = Page.components.selectableInline;

		it('should have correct text', function () {
			expect(selectableItem.valueText).to.equal('Selectable Item inline');
		});

		it('should be selected', function () {
			expectSelected(selectableItem);
		});

		it('should display item inline', function () {
			expect(selectableItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				selectableItem.focus();
				Page.spotlightSelect();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when selected twice', function () {
				selectableItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(selectableItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				selectableItem.self.click();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when clicked twice', function () {
				selectableItem.self.click();
				selectableItem.self.click();
				expectSelected(selectableItem);
			});
		});
	});

	// Note, the disabled test below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
	describe('disabled', function () {
		const selectableItem = Page.components.selectableDisabled;
		const prevSelectableItem = Page.components.selectableInline;

		it('should have correct text', function () {
			expect(selectableItem.valueText).to.equal('Selectable Item disabled');
		});

		it('should be selected', function () {
			expectSelected(selectableItem);
		});

		describe('5-way', function () {
			it('should be able to focus the item', function () {
				prevSelectableItem.focus();
				Page.spotlightDown();
				expect(selectableItem.self.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				selectableItem.self.click();
				expectSelected(selectableItem);
			});
		});
	});
	// Note, the disabled test above/below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.

	describe('inline disabled', function () {
		const selectableItem = Page.components.selectableInlineDisabled;
		const selectableDisabled = Page.components.selectableDisabled;

		it('should have correct text', function () {
			expect(selectableItem.valueText).to.equal('Selectable Item inline disabled');
		});

		it('should be selected', function () {
			expectSelected(selectableItem);
		});

		it('should display item inline', function () {
			expect(selectableItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the item', function () {
				selectableDisabled.focus();
				Page.spotlightDown();
				expect(selectableItem.self.hasFocus()).to.be.true();
			});
			it('should not unselect the item when selected', function () {
				selectableItem.focus();
				Page.spotlightSelect();
				expectSelected(selectableItem);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				selectableItem.self.click();
				expectSelected(selectableItem);
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
});
