const Page = require('./TimePickerPage');
const {expectClosed, expectOpen, expectNoLabels, extractValues, validateTitle} = require('./TimePicker-utils.js');

describe('TimePicker', function () {
	Page.open();

	it('should have focus on start', function () {
		expect(Page.components.timePickerDefaultClosedWithoutNoneText.title.hasFocus()).to.be.true();
	});

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const timePicker = Page.components.timePickerDefaultClosedWithoutNoneText;

			it('should have correct title', function () {
				validateTitle(timePicker, 'Time Picker Default');
			});

			it('should be initially closed', function () {
				timePicker.self.waitForExist(500);
				expectClosed(timePicker);
			});

			it('should have hour-minute-meridiem order', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expectOpen(timePicker);
				expect(timePicker.hour.hasFocus()).to.be.true();
				Page.spotlightRight();
				expect(timePicker.minute.hasFocus()).to.be.true();
				Page.spotlightRight();
				expect(timePicker.meridiem.hasFocus()).to.be.true();
			});

			describe('5-way', function () {
				it('should open, spot hour picker on select, and update value to current time', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectOpen(timePicker);
					const value = /^\d{1,2}:\d{2}\s[A|P]M$/.test(timePicker.valueText);
					expect(value).to.be.true();
				});

				it('should close when pressing select', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectClosed(timePicker);
				});

				it('should focus title when 5-way right from last picker - [GT-25237]', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectOpen(timePicker);
					expect(timePicker.hour.hasFocus()).to.be.true();
					Page.spotlightRight();
					Page.spotlightRight();
					Page.spotlightRight();
					expect(timePicker.title.hasFocus()).to.be.true();
				});

				it('should increase the hour when incrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {hour} = extractValues(timePicker);
					expectOpen(timePicker);
					expect(timePicker.hour.hasFocus()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightUp();
					});
					const {hour: value} = extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {hour} = extractValues(timePicker);
					expectOpen(timePicker);
					expect(timePicker.hour.hasFocus()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
					const {hour: value} = extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {minute} = extractValues(timePicker);
					expectOpen(timePicker);
					Page.spotlightRight();
					expect(timePicker.minute.hasFocus()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightUp();
					});
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {minute} = extractValues(timePicker);
					expectOpen(timePicker);
					Page.spotlightRight();
					expect(timePicker.minute.hasFocus()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should update value text when incrementing the meridiem picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const time = timePicker.valueText;
					expectOpen(timePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(timePicker.meridiem.hasFocus()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightUp();
					});
					const newTime = timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should update value text when decrementing the meridiem picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const time = timePicker.valueText;
					expectOpen(timePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(timePicker.meridiem.hasFocus()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
					const newTime = timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should change the meridiem on hour boundaries', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const value = timePicker.item(timePicker.meridiem).getText();
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						Page.spotlightDown();
					}
					expect(value !== timePicker.item(timePicker.meridiem).getText()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should open on title click when closed', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectOpen(timePicker);
				});

				it('should close on title click when open', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectClosed(timePicker);
				});

				it('should select hour when opened', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					timePicker.hour.click();
					expect(timePicker.hour.hasFocus()).to.be.true();
				});

				it('should increase the hour when incrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const {hour} = extractValues(timePicker);
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.incrementer(timePicker.hour).click();
					});
					const {hour: value} = extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker - [GT-21531]', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const {hour} = extractValues(timePicker);
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.decrementer(timePicker.hour).click();
					});
					const {hour: value} = extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker - [GT-21531]', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const {minute} = extractValues(timePicker);
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.incrementer(timePicker.minute).click();
					});
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const {minute} = extractValues(timePicker);
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.decrementer(timePicker.minute).click();
					});
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should update value text when incrementing the meridiem picker - [GT-21531]', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const time = timePicker.valueText;
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.incrementer(timePicker.meridiem).click();
					});
					const newTime = timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should update value text when decrementing the meridiem picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const time = timePicker.valueText;
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.decrementer(timePicker.meridiem).click();
					});
					const newTime = timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should change the meridiem on hour boundaries - [GT-21563]', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const value = timePicker.valueText;
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						timePicker.decrementer(timePicker.hour).click();
					}
					expect(value !== timePicker.valueText).to.be.true();
				});
			});
		});

		describe('default with noneText', function () {
			const timePicker = Page.components.timePickerDefaultClosedWithNoneText;

			it('should display \'noneText\'', function () {
				expect(timePicker.valueText).to.equal('Nothing Selected');
			});
		});

		describe('default open', function () {
			const timePicker = Page.components.timePickerDefaultOpenWithNoneText;

			it('should be initially open', function () {
				timePicker.self.waitForExist(500);
				expectOpen(timePicker);
			});

			describe('5-way', function () {
				it('should close when pressing select', function () {
					timePicker.focus();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectClosed(timePicker);
					expect(timePicker.title.hasFocus()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click when open', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectClosed(timePicker);
				});

				it('should open on title click when closed', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectClosed(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectOpen(timePicker);
				});
			});
		});

		describe('\'defaultOpen\' with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerDefaultOpenWithDefaultValue;

			it('should be initially open', function () {
				timePicker.self.waitForExist(500);
				expectOpen(timePicker);
			});

			it('should not display \'noneText\'', function () {
				expect(timePicker.valueText).to.not.equal('Nothing Selected');
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', function () {
					timePicker.focus();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {hour, minute, meridiem} = extractValues(timePicker);

					expect(hour).to.equal(12);
					expect(minute).to.equal(0);
					expect(meridiem).to.equal('AM');
				});
			});

			describe('pointer', function () {
				it('should not update on title click', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const {hour, minute, meridiem} = extractValues(timePicker);

					expect(hour).to.equal(12);
					expect(minute).to.equal(0);
					expect(meridiem).to.equal('AM');
				});
			});

		});

		describe('no labels', function () {
			const timePicker = Page.components.timePickerNoLabels;

			it('should not have labeled pickers', function () {
				timePicker.title.click();
				expectNoLabels(timePicker);
			});
		});

		describe('disabled', function () {
			const timePicker = Page.components.timePickerDisabledWithNoneText;

			it('should be initially closed', function () {
				timePicker.self.waitForExist(500);
				expectClosed(timePicker);
			});

			it('should display \'noneText\'', function () {
				expect(timePicker.valueText).to.equal('Nothing Selected');
			});

			describe('5-way', function () {
				it('should be able receive focus', function () {
					Page.components.timePickerNoLabels.focus();
					Page.spotlightDown();
					expect(timePicker.title.hasFocus()).to.be.true();
				});
				it('should not open when selected', function () {
					timePicker.focus();
					Page.spotlightSelect();
					// it should never open, but wait and then check to be sure
					browser.pause(500);
					expectClosed(timePicker);
				});
			});

			describe('pointer', function () {
				it('should not open when clicked', function () {
					timePicker.title.click();
					// it should never open, but wait and then check to be sure
					browser.pause(500);
					expectClosed(timePicker);
				});
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const timePicker = Page.components.timePickerDisabledWithDefaultValue;

			it('should be initially closed', function () {
				timePicker.self.waitForExist(500);
				expectClosed(timePicker);
			});

			it('should not display \'noneText\'', function () {
				expect(timePicker.valueText).to.not.equal('Nothing Selected');
			});
		});

		describe('disabled \'defaultOpen\'', function () {
			const timePicker = Page.components.timePickerDisabledOpenWithNoneText;

			it('should be initially closed', function () {
				timePicker.self.waitForExist(500);
				expectClosed(timePicker);
			});

			it('should display \'noneText\'', function () {
				expect(timePicker.valueText).to.equal('Nothing Selected');
			});
		});

		describe('disabled \'defaultOpen\' with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerDisabledOpenWithDefaultValue;

			it('should be initially closed', function () {
				timePicker.self.waitForExist(500);
				expectClosed(timePicker);
			});

			it('should not display \'noneText\'', function () {
				expect(timePicker.valueText).to.not.equal('Nothing Selected');
			});
		});
	});

	describe('RTL locale', function () {
		const timePicker = Page.components.timePickerDefaultClosedWithoutNoneText;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should focus middle picker (hour) when selected', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expectOpen(timePicker);
			expect(timePicker.hour.hasFocus()).to.be.true();
		});

		it('should have minute-hour-meridiem order', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expectOpen(timePicker);
			Page.spotlightRight();
			expect(timePicker.minute.hasFocus()).to.be.true();
			Page.spotlightLeft();
			expect(timePicker.hour.hasFocus()).to.be.true();
			Page.spotlightLeft();
			expect(timePicker.meridiem.hasFocus()).to.be.true();
		});

		it('should focus title when 5-way left from last picker - [GT-25247]', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expectOpen(timePicker);
			expect(timePicker.hour.hasFocus()).to.be.true();
			Page.spotlightLeft();
			Page.spotlightLeft();
			expect(timePicker.title.hasFocus()).to.be.true();
		});
	});

	describe('24-hour locale', function () {
		const timePicker = Page.components.timePickerWithDefaultValue;

		beforeEach(function () {
			Page.open('?locale=fr-FR');
		});

		it('should not have a meridiem picker', function () {
			timePicker.title.click();
			expect(timePicker.meridiem.value).to.be.null();
		});

		it('should display hours in 24-hour format', function () {
			timePicker.title.click();
			expect(extractValues(timePicker).hour).to.equal(0); // midnight hour
		});

		it('should increment hours from 23 to 0', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				timePicker.title.click();
			});
			// go to 23 first
			timePicker.decrementer(timePicker.hour).click();
			expect(extractValues(timePicker).hour).to.equal(23);
			// now increment
			timePicker.incrementer(timePicker.hour).click();
			expect(extractValues(timePicker).hour).to.equal(0);
		});

		it('should decrement hours from 0 to 23', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				timePicker.title.click();
			});
			timePicker.decrementer(timePicker.hour).click();
			expect(extractValues(timePicker).hour).to.equal(23);
		});
	});

});
