const Page = require('./PickerPage');
const {extractValue} = require('./Picker-utils.js');

describe('Picker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const picker = Page.components.pickerDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', function () {
					expect(picker.incrementer(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should change the value backward when decrementing the picker', function () {
					expect(picker.incrementer(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					Page.spotlightUp();
					expect(picker.decrementer(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', function () {
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should decrease the value when decrementing the picker', function () {
					picker.incrementer(picker.self).click();
					expect(picker.incrementer(picker.self).isFocused()).to.be.true();
					picker.decrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `Banana`
			const picker = Page.components.pickerWithDefaultValue;

			it('should have the default value selected', function () {
				const newValue = extractValue(picker);
				expect(newValue).to.equal('Banana');
			});
		});

		describe('disabled', function () {
			const picker = Page.components.pickerDisabled;

			describe('5-way', function () {
				it('should not update on select', function () {
					const oldValue = extractValue(picker);
					Page.spotlightSelect();
					picker.focus();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', function () {
					const oldValue = extractValue(picker);
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});

				it('should not decrease the value when clicking the decrementer', function () {
					const oldValue = extractValue(picker);
					picker.decrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});
			});
		});
	});
});
