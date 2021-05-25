const Page = require('./RangePickerPage');
const {extractValue} = require('./RangePicker-utils.js');

describe('RangePicker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('horizontal', function () {
			describe('default', function () {
				const rangePicker = Page.components.rangePickerDefault;

				describe('5-way', function () {
					it('should change the value forward when incrementing the rangePicker', function () {
						expect(rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
						Page.spotlightSelect();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(5);
					});

					it('should change the value backward when decrementing the rangePicker', function () {
						expect(rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
						Page.spotlightSelect();
						Page.spotlightLeft();
						expect(rangePicker.decrementer(rangePicker.self).isFocused()).to.be.true();
						Page.spotlightSelect();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(0);
					});
				});

				describe('pointer', function () {
					it('should increase the value when incrementing the rangePicker', function () {
						rangePicker.incrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(5);
					});

					it('should decrease the value when decrementing the rangePicker', function () {
						rangePicker.incrementer(rangePicker.self).click();
						expect(rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
						rangePicker.decrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(0);
					});

					it('should not increase the value when incrementing the rangePicker and current value is equal to max', function () {
						rangePicker.incrementer(rangePicker.self).click();
						rangePicker.incrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue1 = extractValue(rangePicker);
						expect(newValue1).to.equal(10);
						rangePicker.incrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue2 = extractValue(rangePicker);
						expect(newValue2).to.equal(10);
					});

					it('should not decrease the value when decrementing the rangePicker and current value is equal to min', function () {
						rangePicker.decrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(0);
					});
				});
			});

			describe('disabled', function () {
				const rangePicker = Page.components.rangePickerDisabled;

				describe('5-way', function () {
					it('should not update on select', function () {
						const oldValue = extractValue(rangePicker);
						Page.spotlightSelect();
						rangePicker.focus();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(oldValue);
					});
				});

				describe('pointer', function () {
					it('should not increase the value when clicking the incrementer', function () {
						const oldValue = extractValue(rangePicker);
						rangePicker.incrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(oldValue);
					});

					it('should not decrease the value when clicking the decrementer', function () {
						const oldValue = extractValue(rangePicker);
						rangePicker.decrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(oldValue);
					});
				});
			});

			describe('with \'negativeValues\'', function () {
				const rangePicker = Page.components.rangePickerWithNegativeValues;

				it('should have the default value selected', function () {
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(0);
				});

				it('should decrement to negative number', function () {
					rangePicker.decrementer(rangePicker.self).click();
					browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(newValue).to.equal(-1);
				});
			});

			describe('wrap', function () {
				const rangePicker = Page.components.rangePickerWrap;

				describe('5-way', function () {
					it('should change the value forward when incrementing the rangePicker', function () {
						rangePicker.focus();
						expect(rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
						Page.spotlightSelect();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(5);
					});

					it('should change the value backward when decrementing the rangePicker', function () {
						rangePicker.focus();
						Page.spotlightSelect();
						Page.spotlightLeft();
						expect(rangePicker.decrementer(rangePicker.self).isFocused()).to.be.true();
						Page.spotlightSelect();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(0);
					});
				});

				describe('pointer', function () {
					it('should increase the value when incrementing the rangePicker', function () {
						rangePicker.incrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(5);
					});

					it('should decrease the value when decrementing the rangePicker', function () {
						rangePicker.incrementer(rangePicker.self).click();
						expect(rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
						rangePicker.decrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(0);
					});

					it('should wrap value when incrementing the rangePicker and current value is equal to max', function () {
						rangePicker.incrementer(rangePicker.self).click();
						rangePicker.incrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue1 = extractValue(rangePicker);
						expect(newValue1).to.equal(10);
						rangePicker.incrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue2 = extractValue(rangePicker);
						expect(newValue2).to.equal(0);
					});

					it('should wrap the value when decrementing the rangePicker and current value is equal to min', function () {
						rangePicker.decrementer(rangePicker.self).click();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(10);
					});
				});
			});

			describe('joined', function () {
				const rangePicker = Page.components.rangePickerJoined;

				describe('5-way', function () {
					it('should increase the value on 5-way select', function () {
						rangePicker.focusJoined();
						Page.spotlightSelect();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(5);
					});
				});

				describe('pointer', function () {
					it('should increase the value when on click', function () {
						rangePicker.self.click();
						browser.pause(500);
						const newValue = extractValue(rangePicker);
						expect(newValue).to.equal(5);
					});

					it('should wrap the value when current value is equal to max', function () {
						rangePicker.self.click();
						rangePicker.self.click();
						browser.pause(500);
						const newValue1 = extractValue(rangePicker);
						expect(newValue1).to.equal(10);
						rangePicker.self.click();
						browser.pause(500);
						const newValue2 = extractValue(rangePicker);
						expect(newValue2).to.equal(0);
					});
				});
			});
		})
	});
});
