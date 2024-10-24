const Page = require('./TimePickerPage');
const {extractValues, validateTitle} = require('./TimePicker-utils.js');

describe('TimePicker', function () {
	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const timePicker = Page.components.timePickerDefault;

			it('should have correct title', async function () {
				validateTitle(timePicker, 'Time Picker Default');
			});

			it('should have hour-minute-meridiem order', async function () {
				await browser.waitUntil(async () => await timePicker.hour.isFocused(), {timeout: 1500,  timeoutMsg: 'hour focused'});
				await Page.spotlightRight();
				await browser.waitUntil(async () => await timePicker.minute.isFocused(), {timeout: 1500,  timeoutMsg: 'minute focused'});
				await Page.spotlightRight();
				await browser.waitUntil(async () => await timePicker.meridiem.isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem focused'});
			});

			describe('5-way', function () {
				// Start of [QWTC-2104] - Hour, Minute, Meridiem pickers Animates with 5-way - LTR
				it('should increase the hour when incrementing the picker', async function () {
					const {hour} = await extractValues(timePicker);
					await browser.waitUntil(async () => await timePicker.hour.isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightUp();
					const {hour: value} = await extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the hour when decrementing the picker', async function () {
					const {hour} = await extractValues(timePicker);
					await browser.waitUntil(async () => await timePicker.hour.isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightDown();
					const {hour: value} = await extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).toBe(expected);
				});

				it('should increase the minute when incrementing the picker', async function () {
					const {minute} = await extractValues(timePicker);
					await Page.spotlightRight();
					await browser.waitUntil(async () => await timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightUp();
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).toBe(expected);
				});

				it('should decrease the minute when decrementing the picker', async function () {
					const {minute} = await extractValues(timePicker);
					await Page.spotlightRight();
					await browser.waitUntil(async () => await timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightDown();
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).toBe(expected);
				});

				it('should update value text when incrementing the meridiem picker', async function () {
					const time = timePicker.timeLabel;
					await Page.spotlightRight();
					await Page.spotlightRight();
					await browser.waitUntil(async () => await timePicker.meridiem.isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightUp();
					const newTime = timePicker.timeLabel;
					const value = time !== newTime;
					expect(value).toBe(true);
				});

				it('should update value text when decrementing the meridiem picker', async function () {
					const time = timePicker.timeLabel;
					await Page.spotlightRight();
					await Page.spotlightRight();
					await browser.waitUntil(async () => await timePicker.meridiem.isFocused(), {timeout: 1500,  interval: 100});
					await Page.spotlightDown();
					const newTime = timePicker.timeLabel;
					const value = time !== newTime;
					expect(value).toBe(true);
				});
				// End of [QWTC-2104] - Hour, Minute, Meridiem pickers Animates with 5-way - LTR

				it('should change the meridiem on hour boundaries', async function () {
					const {meridiem} = await extractValues(timePicker);
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						await Page.spotlightDown();
					}
					expect(meridiem !== timePicker.item('meridiem').getText()).toBe(true);
				});

				it('should be able to change values with 5-way up and down keys [QWTC-2549]', async function () {
					const {minute} = await extractValues(timePicker);
					// Step 3-1: Hover on the hour Picker.
					await Page.showPointerByKeycode();
					await $('#timePickerDefault').moveTo({xOffset: -50, yOffset: 0});
					// Step 3-2: Press 5-way Left.
					await Page.spotlightLeft();
					// Step 3-1 Verify: Spotlight on the hour picker.
					expect(await timePicker.hour.isFocused()).toBe(true);
					// Step 3-3: Press 5-way ok.
					await Page.spotlightSelect();
					// Step 3-2 Verify: Spotlight moves to minute picker.
					expect(await timePicker.minute.isFocused()).toBe(true);

					// Step 4: Press 5-way Up on the minute picker.
					await Page.spotlightUp();
					const expected = minute !== 59 ? minute + 1 : 0;
					// Step 4-1 Verify: Spotlight on the minute picker.
					// Step 4-2 Verify: The minute value is changed upward.
					expect(await timePicker.minute.isFocused()).toBe(true);
					expect((await extractValues(timePicker)).minute).toBe(expected);
					// Step 5: Press 5-way Down on the minute picker.
					await Page.spotlightDown();
					// Step 5-1 Verify: Spotlight on the minute picker.
					// Step 5-2 Verify: The minute value is changed downward.
					expect(await timePicker.minute.isFocused()).toBe(true);
					expect((await extractValues(timePicker)).minute).toBe(minute);
				});

				it('should move to the next picker with 5-way OK key [QWTC-2541]', async function () {
					// Step 3-1: Hover on the hour Picker.
					await Page.showPointerByKeycode();
					await $('#timePickerDefault').moveTo({xOffset: -50, yOffset: 0});
					// Step 3-2: Press 5-way Left.
					await Page.spotlightLeft();
					// Step 3-1 Verify: Spotlight on the hour picker.
					expect(await timePicker.hour.isFocused()).toBe(true);
					// Step 3-3: Press 5-way ok.
					await Page.spotlightSelect();
					// Step 3-2 Verify: Spotlight moves to minute picker.
					expect(await timePicker.minute.isFocused()).toBe(true);

					// Step 4: Press 5-way ok on the minute picker.
					await Page.spotlightSelect();
					// Step 4 Verify: Spotlight moves to the meridiem picker.
					expect(await timePicker.meridiem.isFocused()).toBe(true);

					// Step 5: Press 5-way ok on the meridiem picker.
					await Page.spotlightSelect();
					// Step 5 Verify: Spotlight still on the meridiem picker.
					expect(await timePicker.meridiem.isFocused()).toBe(true);
				});
			});

			describe('pointer', function () {
				it('should select hour when opened', async function () {
					await timePicker.hour.click();
					await browser.waitUntil(async () => await timePicker.hour.isFocused(), {timeout: 1500,  interval: 100});
				});

				// Start of [QWTC-2098] - Hour, Minute, Meridiem pickers Animate on Pointer Click and Hold
				it('should increase the hour when incrementing the picker', async function () {
					const {hour} = await extractValues(timePicker);
					await timePicker.incrementer('hour').click();
					const {hour: value} = await extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the hour when decrementing the picker]', async function () {
					const {hour} = await extractValues(timePicker);
					await timePicker.decrementer('hour').click();
					const {hour: value} = await extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).toBe(expected);
				});

				it('should increase the minute when incrementing the picker]', async function () {
					const {minute} = await extractValues(timePicker);
					await timePicker.minute.click();
					await browser.waitUntil(async () => await timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					await timePicker.incrementer('minute').click();
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).toBe(expected);
				});

				it('should decrease the minute when decrementing the picker', async function () {
					const {minute} = await extractValues(timePicker);
					await timePicker.minute.click();
					await browser.waitUntil(async () => await timePicker.minute.isFocused(), {timeout: 1500,  interval: 100});
					await timePicker.decrementer('minute').click();
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).toBe(expected);
				});
				// End of [QWTC-2098] - Hour, Minute, Meridiem pickers Animate on Pointer Click and Hold

				it('should change the meridiem on hour boundaries - [QWTC-2099]', async function () {
					const value = timePicker.timeLabel;
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						await timePicker.decrementer('hour').click();
					}
					expect(value !== timePicker.timeLabel).toBe(true);
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', async function () {
					timePicker.focus();
					await Page.spotlightSelect();

					const {hour, minute, meridiem} = await extractValues(timePicker);

					expect(hour).toBe(12);
					expect(minute).toBe(0);
					expect(meridiem).toBe('AM');
				});
			});
		});

		describe('disabled', function () {
			const timePicker = Page.components.timePickerDisabled;

			describe('5-way', function () {
				it('should not update on select', async function () {
					await Page.spotlightSelect();
					timePicker.focus();
				});
			});

			describe('pointer', function () {
				it('should not update hour on click', async function () {
					await timePicker.hour.click();
					expect(await timePicker.hour.isFocused()).toBe(true);

					await timePicker.incrementer('hour').click();
					browser.pause(500);
					const {hour: value} = await extractValues(timePicker);
					expect(value).toBe(12);
				});
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const timePicker = Page.components.timePickerDisabledWithDefaultValue;
			it('should not update \'defaultValue\' on click', async function () {
				const {hour, minute, meridiem} = await extractValues(timePicker);

				await timePicker.minute.click();
				expect(await timePicker.minute.isFocused()).toBe(true);
				await timePicker.decrementer('minute').click();

				await timePicker.hour.click();
				expect(await timePicker.hour.isFocused()).toBe(true);
				await timePicker.decrementer('hour').click();

				await timePicker.meridiem.click();
				expect(await timePicker.meridiem.isFocused()).toBe(true);
				await timePicker.decrementer('meridiem').click();

				browser.pause(500);
				expect(hour).toBe(12);
				expect(minute).toBe(0);
				expect(meridiem).toBe('AM');
			});

		});
	});

	describe('RTL locale', function () {
		const timePicker = Page.components.timePickerDefault;

		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should focus middle picker (hour) when selected', async function () {
			await browser.waitUntil(async () => await timePicker.hour.isFocused(), {timeout: 1500,  interval: 100});
		});

		it('should have minute-hour-meridiem order', async function () {
			await browser.waitUntil(async () => await timePicker.hour.isFocused(), {timeout: 1500,  timeoutMsg: 'initial', interval: 100});
			await Page.spotlightRight();
			await browser.waitUntil(async () => await timePicker.minute.isFocused(), {timeout: 1500,  timeoutMsg: 'minute', interval: 100});
			await Page.spotlightLeft();
			await browser.waitUntil(async () => await timePicker.hour.isFocused(), {timeout: 1500,  timeoutMsg: 'hour', interval: 100});
			await Page.spotlightLeft();
			await browser.waitUntil(async () => await timePicker.meridiem.isFocused(), {timeout: 1500,  timeoutMsg: 'meridiem', interval: 100});
		});

		it('should move to the next picker with 5-way OK key in ar-SA locale [QWTC-2541]', async function () {
			// Step 10-1: hover on the hour picker.
			await Page.showPointerByKeycode();
			await $('#timePickerDefault').moveTo({xOffset: -50, yOffset: 0});
			// Step 10-1 Verify: Spotlight on the hour picker.
			await expect(await timePicker.hour.isFocused()).toBe(true);
			// Step 10-2: Press 5-way Right.
			await Page.spotlightRight();
			await expect(await timePicker.minute.isFocused()).toBe(true);
			// Step 10-3: Press 5-way ok.
			await Page.spotlightSelect();
			// Step 10-2 Verify: Spotlight moves to the hour picker.
			await expect(await timePicker.hour.isFocused()).toBe(true);

			// Step 11: 5-way ok on the hour picker.
			await Page.spotlightSelect();
			// Step 11 Verify: Spotlight moves on the meridiem picker.
			await expect(await timePicker.meridiem.isFocused()).toBe(true);

			// Step 12: 5-way ok on the meridiem picker.
			await Page.spotlightSelect();
			// Step 12 Verify: Spotlight still on the meridiem picker.
			await expect(await timePicker.meridiem.isFocused()).toBe(true);
		});
	});

	describe('es-ES locale', function () {
		const timePicker = Page.components.timePickerDefault;

		beforeEach(async function () {
			await Page.open('?locale=es-ES');
		});

		it('should move to the next picker with 5-way OK key in es-ES locale [QWTC-2541]', async function () {
			// Step 6 Verify: There is no meridiem in ES.
			expect(await timePicker.meridiem.isExisting()).toBe(false);

			// Step 7-1: Hover on the hour picker.
			await Page.showPointerByKeycode();
			await $('#timePickerDefault').moveTo({xOffset: 100, yOffset: 100});
			// Step 7-2: Press 5-way Left.
			await Page.spotlightLeft();
			// Step 7-1 Verify: Spotlight on the hour picker.
			await expect(await timePicker.hour.isFocused()).toBe(true);
			// Step 7-3: Press 5-way ok.
			await Page.spotlightSelect();
			// Step 7-2 Verify: Spotlight moves to minute picker.
			await expect(await timePicker.minute.isFocused()).toBe(true);

			// Step 8: Press 5-way ok on the minute picker.
			await Page.spotlightSelect();
			// Step 8 Verify: Spotlight still on the minute picker.
			await expect(await timePicker.minute.isFocused()).toBe(true);
		});
	});

	describe('24-hour locale', function () {
		const timePicker = Page.components.timePickerWithDefaultValue;

		beforeEach(async function () {
			await Page.open('?locale=fr-FR');
		});

		it('should not have a meridiem picker', async function () {
			expect(await timePicker.meridiem.isExisting()).toBe(false);
		});

		it('should display hours in 24-hour format', async function () {
			expect((await extractValues(timePicker)).hour).toBe(0); // midnight hour
		});

		it('should increment hours from 23 to 0', async function () {
			// FIXME: replace with trigger for expandable open (or replace with defaultOpen picker)
			await Page.delay(500);

			// go to 23 first
			await timePicker.hour.click();
			expect(await timePicker.hour.isFocused()).toBe(true);

			await timePicker.decrementer('hour').click();
			expect((await extractValues(timePicker)).hour).toBe(23);
			// now increment
			await timePicker.incrementer('hour').click();
			expect((await extractValues(timePicker)).hour).toBe(0);
		});

		it('should decrement hours from 0 to 23', async function () {
			// FIXME: replace with trigger for expandable open (or replace with defaultOpen picker)
			await Page.delay(500);
			await timePicker.hour.click();
			expect(await timePicker.hour.isFocused()).toBe(true);

			await timePicker.decrementer('hour').click();
			expect((await extractValues(timePicker)).hour).toBe(23);
		});
	});

});
