const Page = require('./RadioItemPage');

describe('RadioItem', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.radioDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const radioItem = Page.components.radioDefault;

		it('should have correct text', function () {
			expect(radioItem.valueText).to.equal('Radio Item1');
		});

		it('should not be selected', function () {
			expect(radioItem.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should select the item when selected', function () {
				Page.spotlightSelect();
				expect(radioItem.isSelected).to.be.true();
			});

			it('should re-unselect the item when selected twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(radioItem.isSelected).to.be.false();
			});

			it('should move focus down on SpotlightDown', function () {
				Page.spotlightDown();
				expect(Page.components.radioDefaultSelected.self.isFocused()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.components.radioDefaultSelected.focus();
				Page.spotlightUp();
				expect(radioItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', function () {
				radioItem.self.click();
				expect(radioItem.isSelected).to.be.true();
			});

			it('should re-unselect the item when clicked twice', function () {
				radioItem.self.click();
				radioItem.self.click();
				expect(radioItem.isSelected).to.be.false();
			});
		});
	});

	describe('default selected', function () {
		const radioItem = Page.components.radioDefaultSelected;

		it('should have correct text', function () {
			expect(radioItem.valueText).to.equal('Radio Item selected');
		});

		it('should be selected', function () {
			expect(radioItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				radioItem.focus();
				Page.spotlightSelect();
				expect(radioItem.isSelected).to.be.false();
			});

			it('should re-select the item when selected twice', function () {
				radioItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(radioItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				radioItem.self.click();
				expect(radioItem.isSelected).to.be.false();
			});

			it('should re-select the item when clicked twice', function () {
				radioItem.self.click();
				radioItem.self.click();
				expect(radioItem.isSelected).to.be.true();
			});
		});
	});

	describe('inline', function () {
		const radioItem = Page.components.radioInline;

		it('should have correct text', function () {
			expect(radioItem.valueText).to.equal('Radio Item inline');
		});

		it('should be selected', function () {
			expect(radioItem.isSelected).to.be.true();
		});

		it('should display item inline', function () {
			expect(radioItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				radioItem.focus();
				Page.spotlightSelect();
				expect(radioItem.isSelected).to.be.false();
			});

			it('should re-select the item when selected twice', function () {
				radioItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(radioItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				radioItem.self.click();
				expect(radioItem.isSelected).to.be.false();
			});

			it('should re-select the item when clicked twice', function () {
				radioItem.self.click();
				radioItem.self.click();
				expect(radioItem.isSelected).to.be.true();
			});
		});
	});

	// Note, the disabled test below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
	describe('disabled', function () {
		const radioItem = Page.components.radioDisabled;
		const prevRadioItem = Page.components.radioInline;

		it('should have correct text', function () {
			expect(radioItem.valueText).to.equal('Radio Item disabled');
		});

		it('should be selected', function () {
			expect(radioItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the item', function () {
				prevRadioItem.focus();
				Page.spotlightDown();
				expect(radioItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				radioItem.self.click();
				expect(radioItem.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.

	describe('inline disabled', function () {
		const radioItem = Page.components.radioInlineDisabled;
		const radioDisabled = Page.components.radioDisabled;

		it('should have correct text', function () {
			expect(radioItem.valueText).to.equal('Radio Item inline disabled');
		});

		it('should be selected', function () {
			expect(radioItem.isSelected).to.be.true();
		});

		it('should display item inline', function () {
			expect(radioItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the item', function () {
				radioDisabled.focus();
				Page.spotlightDown();
				expect(radioItem.self.isFocused()).to.be.true();
			});
			it('should not unselect the item when selected', function () {
				radioItem.focus();
				Page.spotlightSelect();
				expect(radioItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				radioItem.self.click();
				expect(radioItem.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
});
