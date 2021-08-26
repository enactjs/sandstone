const Page = require('./DayPickerPage');

describe('DayPicker', function () {
	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const dayPicker = Page.components.defaultDayPicker;

		it('should have focus on first option on start', function () {
			expect(dayPicker.item(0).isFocused()).to.be.true();
		});

		describe('5-way', function () {
			it('should move focus on second option with 5-Way Down', function () {
				Page.spotlightDown();
				expect(dayPicker.item(1).isFocused()).to.be.true();
			});

			it('should select second option with 5-way `enter`', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(dayPicker.item(1).getAttribute('aria-checked')).to.equal('true');
			});

			it('should unselect second option with 5-way `enter` pressed twice', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(dayPicker.item(1).getAttribute('aria-checked')).to.equal('false');
			});
		});

		describe('pointer', function () {
			it('should select second option when clicked once', function () {
				dayPicker.item(1).click();
				expect(dayPicker.item(1).getAttribute('aria-checked')).to.equal('true');
			});

			it('should unselect second option when clicked twice', function () {
				dayPicker.item(1).click();
				dayPicker.item(1).click();
				expect(dayPicker.item(1).getAttribute('aria-checked')).to.equal('false');
			});
		});
	});

	describe('disabled', function () {
		const dayPicker = Page.components.disabledDayPicker;

		describe('5-way', function () {
			it('should focus first option with 5-way Right', function () {
				Page.spotlightRight();
				expect(dayPicker.item(0).isFocused()).to.be.true();
			});

			it('should focus second option with 5-way Right', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				expect(dayPicker.item(1).isFocused()).to.be.true();
			});

			it('should not select option with 5-way', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				expect(dayPicker.item(0).getAttribute('aria-checked')).to.equal('false');
			});
		});

		describe('pointer', function () {
			it('should not select option with click', function () {
				dayPicker.item(0).click();
				expect(dayPicker.item(0).getAttribute('aria-checked')).to.equal('false');
			});
		});
	});
});
