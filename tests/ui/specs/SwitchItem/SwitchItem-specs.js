const Page = require('./SwitchItemPage');

describe('SwitchItem', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.switchDefault.self.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const switchItem = Page.components.switchDefault;

		it('should have correct text', function () {
			expect(switchItem.valueText).to.equal('Switch Item1');
		});

		it('should not be selected', function () {
			expect(switchItem.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should select the item when selected - [GT-21377]', function () {
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.true();
			});

			it('should re-unselect the item when selected twice - [GT-21377]', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.false();
			});

			it('should move focus down on SpotlightDown', function () {
				Page.spotlightDown();
				expect(Page.components.switchDefaultSelected.self.hasFocus()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.components.switchDefaultSelected.focus();
				Page.spotlightUp();
				expect(switchItem.self.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', function () {
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.true();
			});

			it('should re-unselect the item when clicked twice', function () {
				switchItem.self.click();
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.false();
			});
		});
	});

	describe('default selected', function () {
		const switchItem = Page.components.switchDefaultSelected;

		it('should have correct text', function () {
			expect(switchItem.valueText).to.equal('Switch Item selected');
		});

		it('should be selected', function () {
			expect(switchItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				switchItem.focus();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when selected twice', function () {
				switchItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when clicked twice', function () {
				switchItem.self.click();
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.true();
			});
		});
	});

	describe('inline', function () {
		const switchItem = Page.components.switchInline;

		it('should have correct text', function () {
			expect(switchItem.valueText).to.equal('Switch Item inline');
		});

		it('should be selected', function () {
			expect(switchItem.isSelected).to.be.true();
		});

		it('should display item inline', function () {
			expect(switchItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				switchItem.focus();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when selected twice', function () {
				switchItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when clicked twice', function () {
				switchItem.self.click();
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.true();
			});
		});
	});

	// Note, the disabled test below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
	describe('disabled', function () {
		const switchItem = Page.components.switchDisabled;
		const prevSwitchItem = Page.components.switchInline;

		it('should have correct text', function () {
			expect(switchItem.valueText).to.equal('Switch Item disabled');
		});

		it('should be selected', function () {
			expect(switchItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should be able focus the item', function () {
				prevSwitchItem.focus();
				Page.spotlightDown();
				expect(switchItem.self.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above/below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.

	describe('inline disabled', function () {
		const switchItem = Page.components.switchInlineDisabled;
		const prevSwitchInline = Page.components.switchDisabled;

		it('should have correct text', function () {
			expect(switchItem.valueText).to.equal('Switch Item inline disabled');
		});

		it('should be selected', function () {
			expect(switchItem.isSelected).to.be.true();
		});

		it('should display item inline', function () {
			expect(switchItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should be able focus the item', function () {
				prevSwitchInline.focus();
				Page.spotlightDown();
				expect(switchItem.self.hasFocus()).to.be.true();
			});
			it('should not unselect the item when clicked', function () {
				switchItem.focus();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
});
