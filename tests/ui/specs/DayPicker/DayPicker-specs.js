const Page = require('./DayPickerPage');

describe('DayPicker', function () {
	beforeEach(async function () {
		await Page.open();
	});

	describe('default', function () {
		const dayPicker = Page.components.defaultDayPicker;

		it('should have focus on first option on start', async function () {
			expect(await dayPicker.item(0).isFocused()).to.be.true();
		});

		describe('5-way', function () {
			it('should move focus on second option with 5-Way Down', async function () {
				await Page.spotlightDown();

				expect(await dayPicker.item(1).isFocused()).to.be.true();
			});

			it('should select second option with 5-way `enter`', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();

				expect(await dayPicker.item(1).getAttribute('aria-checked')).to.equal('true');
			});

			it('should unselect second option with 5-way `enter` pressed twice', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await dayPicker.item(1).getAttribute('aria-checked')).to.equal('false');
			});
		});

		describe('pointer', function () {
			it('should select second option when clicked once', async function () {
				await dayPicker.item(1).click();

				expect(await dayPicker.item(1).getAttribute('aria-checked')).to.equal('true');
			});

			it('should unselect second option when clicked twice', async function () {
				await dayPicker.item(1).click();
				await dayPicker.item(1).click();

				expect(await dayPicker.item(1).getAttribute('aria-checked')).to.equal('false');
			});
		});
	});

	describe('disabled', function () {
		const dayPicker = Page.components.disabledDayPicker;

		describe('5-way', function () {
			it('should focus first option with 5-way Right', async function () {
				await Page.spotlightRight();

				expect(await dayPicker.item(0).isFocused()).to.be.true();
			});

			it('should focus second option with 5-way Right', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();

				expect(await dayPicker.item(1).isFocused()).to.be.true();
			});

			it('should not select option with 5-way', async function () {
				await Page.spotlightRight();
				await Page.spotlightSelect();
				expect(await dayPicker.item(0).getAttribute('aria-checked')).to.equal('false');
			});
		});

		describe('pointer', function () {
			it('should not select option with click', async function () {
				await dayPicker.item(0).click();
				expect(await dayPicker.item(0).getAttribute('aria-checked')).to.equal('false');
			});
		});
	});
});
