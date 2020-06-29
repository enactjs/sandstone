const Page = require('./TimePickerPage');
const {extractValues, validateTitle} = require('./TimePicker-utils.js');

describe('TimePicker', function () {
	Page.open();

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const timePicker = Page.components.timePickerDefault;

			it('should have correct title', function () {
				validateTitle(timePicker, 'Time Picker Default');
			});

			it('should have hour-minute-meridiem order', function () {
				browser.waitUntil(() => timePicker.hour.isFocused(), {timeout: 1500,  timeoutMsg: 'hour focused'});
				Page.spotlightRight();
				browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  timeoutMsg: 'minute focused'});
				Page.spotlightRight();
				browser.waitUntil(() => timePicker.meridiem.isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem focused'});
			});

			describe('5-way', function () {
				// Start of [GT-28551] - Hour, Minute, Meridiem pickers Animates with 5-way - LTR
				it('should increase the hour when incrementing the picker', function () {
					const {hour} = extractValues(timePicker);
					browser.waitUntil(() => timePicker.hour.isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightUp();
					const {hour: value} = extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker', function () {
					const {hour} = extractValues(timePicker);
					browser.waitUntil(() => timePicker.hour.isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightDown();
					const {hour: value} = extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker', function () {
					const {minute} = extractValues(timePicker);
					Page.spotlightRight();
					browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightUp();
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', function () {
					const {minute} = extractValues(timePicker);
					Page.spotlightRight();
					browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightDown();
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should update value text when incrementing the meridiem picker', function () {
					const time = timePicker.timeLabel;
					Page.spotlightRight();
					Page.spotlightRight();
					browser.waitUntil(() => timePicker.meridiem.isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightUp();
					const newTime = timePicker.timeLabel;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should update value text when decrementing the meridiem picker', function () {
					const time = timePicker.timeLabel;
					Page.spotlightRight();
					Page.spotlightRight();
					browser.waitUntil(() => timePicker.meridiem.isFocused(), {timeout: 1500,  interval: 100});
					Page.spotlightDown();
					const newTime = timePicker.timeLabel;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});
				// End of [GT-28551] - Hour, Minute, Meridiem pickers Animates with 5-way - LTR

				it('should change the meridiem on hour boundaries', function () {
					const {meridiem} = extractValues(timePicker);
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						Page.spotlightDown();
					}
					expect(meridiem !== timePicker.item(timePicker.meridiem).getText()).to.be.true();
				});
			});

			describe('pointer', function () {

				it('should select hour when opened', function () {
					timePicker.hour.click();
					browser.waitUntil(() => timePicker.hour.isFocused(), {timeout: 1500,  interval: 100});
				});

				// Start of [GT-28545] - Hour, Minute, Meridiem pickers Animate on Pointer Click and Hold
				it('should increase the hour when incrementing the picker', function () {
					const {hour} = extractValues(timePicker);
					timePicker.incrementer(timePicker.hour).click();
					const {hour: value} = extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker]', function () {
					const {hour} = extractValues(timePicker);
					timePicker.decrementer(timePicker.hour).click();
					const {hour: value} = extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker]', function () {
					const {minute} = extractValues(timePicker);
					timePicker.minute.click();
					browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					timePicker.incrementer(timePicker.minute).click();
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', function () {
					const {minute} = extractValues(timePicker);
					timePicker.minute.click();
					browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					timePicker.decrementer(timePicker.minute).click();
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});
				// End of [GT-28545] - Hour, Minute, Meridiem pickers Animate on Pointer Click and Hold

				it('should change the meridiem on hour boundaries - [GT-28546]', function () {
					const value = timePicker.timeLabel;
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						timePicker.decrementer(timePicker.hour).click();
					}
					expect(value !== timePicker.timeLabel).to.be.true();
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', function () {
					timePicker.focus();
					Page.spotlightSelect();

					const {hour, minute, meridiem} = extractValues(timePicker);

					expect(hour).to.equal(12);
					expect(minute).to.equal(0);
					expect(meridiem).to.equal('AM');
				});
			});
		});

		describe('disabled', function () {
			const timePicker = Page.components.timePickerDisabled;

			describe('5-way', function () {
				it('should not update on select', function () {
					Page.spotlightSelect();
					timePicker.focus();
				});
			});

			describe('pointer', function () {
				it('should not update hour on click', function () {
					timePicker.hour.click();
					expect(timePicker.hour.isFocused()).to.be.true();

					timePicker.incrementer(timePicker.hour).click();
					browser.pause(500);
					const {hour: value} = extractValues(timePicker);
					expect(value).to.equal(12);
				});
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const timePicker = Page.components.timePickerDisabledWithDefaultValue;
			it('should not update \'defaultValue\' on click', function () {
				const {hour, minute, meridiem} = extractValues(timePicker);

				timePicker.minute.click();
				expect(timePicker.minute.isFocused()).to.be.true();
				timePicker.decrementer(timePicker.minute).click();

				timePicker.hour.click();
				expect(timePicker.hour.isFocused()).to.be.true();
				timePicker.decrementer(timePicker.hour).click();

				timePicker.meridiem.click();
				expect(timePicker.meridiem.isFocused()).to.be.true();
				timePicker.decrementer(timePicker.meridiem).click();

				browser.pause(500);
				expect(hour).to.equal(12);
				expect(minute).to.equal(0);
				expect(meridiem).to.equal('AM');
			});

		});
	});

	describe('RTL locale', function () {
		const timePicker = Page.components.timePickerDefault;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should focus middle picker (hour) when selected', function () {
			browser.waitUntil(() => timePicker.hour.isFocused(), {timeout: 1500,  interval: 100});
		});

		it('should have minute-hour-meridiem order', function () {
			browser.waitUntil(() => timePicker.hour.isFocused(), {timeout: 1500,  timeoutMsg: 'initial', interval: 100});
			Page.spotlightRight();
			browser.waitUntil(() => timePicker.minute.isFocused(), {timeout: 1500,  timeoutMsg: 'minute', interval: 100});
			Page.spotlightLeft();
			browser.waitUntil(() => timePicker.hour.isFocused(), {timeout: 1500,  timeoutMsg: 'hour', interval: 100});
			Page.spotlightLeft();
			browser.waitUntil(() => timePicker.meridiem.isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem', interval: 100});
		});
	});

	describe('24-hour locale', function () {
		const timePicker = Page.components.timePickerWithDefaultValue;

		beforeEach(function () {
			Page.open('?locale=fr-FR');
		});

		it('should not have a meridiem picker', function () {
			expect(timePicker.meridiem.isExisting(), 'meridiem exists').to.be.false();
		});

		it('should display hours in 24-hour format', function () {
			expect(extractValues(timePicker).hour).to.equal(0); // midnight hour
		});

		it('should increment hours from 23 to 0', function () {
			// FIXME: replace with trigger for expandable open (or replace with defaultOpen picker)
			Page.delay(500);

			// go to 23 first
			timePicker.hour.click();
			expect(timePicker.hour.isFocused()).to.be.true();

			timePicker.decrementer(timePicker.hour).click();
			expect(extractValues(timePicker).hour).to.equal(23);
			// now increment
			timePicker.incrementer(timePicker.hour).click();
			expect(extractValues(timePicker).hour).to.equal(0);
		});

		it('should decrement hours from 0 to 23', function () {
			// FIXME: replace with trigger for expandable open (or replace with defaultOpen picker)
			Page.delay(500);
			timePicker.hour.click();
			expect(timePicker.hour.isFocused()).to.be.true();

			timePicker.decrementer(timePicker.hour).click();
			expect(extractValues(timePicker).hour).to.equal(23);
		});
	});

});
