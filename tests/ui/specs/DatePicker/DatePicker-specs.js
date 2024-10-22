const Page = require('./DatePickerPage');
const {daysInMonth, extractValues, validateTitle} = require('./DatePicker-utils.js');

describe('DatePicker', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			let datePicker;

			beforeEach(async function () {
				datePicker = await Page.components.datePickerDefault;
			});

			it('should have correct title', async function () {
				validateTitle(datePicker, 'Date Picker Default');
			});

			it('should have month-day-year order', async function () {
				expect(await datePicker.month.isFocused()).toBe(true);
				await Page.spotlightRight();
				expect(await datePicker.day.isFocused()).toBe(true);
				await Page.spotlightRight();
				expect(await datePicker.year.isFocused()).toBe(true);
			});

			describe('5-way', function () {
				// Start of [QWTC-2097] - Month, Day, Year pickers Animate with 5-way - LTR
				it('should increase the month when incrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					expect(await datePicker.month.isFocused()).toBe(true);
					await Page.spotlightUp();
					const {month: value} = await extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the month when decrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					expect(await datePicker.month.isFocused()).toBe(true);
					await Page.spotlightDown();
					const {month: value} = await extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).toBe(expected);
				});

				it('should increase the day when incrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await Page.spotlightRight();
					expect(await datePicker.day.isFocused()).toBe(true);
					await Page.spotlightUp();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await Page.spotlightRight();
					expect(await datePicker.day.isFocused()).toBe(true);
					await Page.spotlightDown();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).toBe(expected);
				});

				it('should increase the year when incrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.year.isFocused()).toBe(true);
					await Page.spotlightUp();
					const {year: value} = await extractValues(datePicker);
					const expected = year + 1;
					expect(value).toBe(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.year.isFocused()).toBe(true);
					await Page.spotlightDown();
					const {year: value} = await extractValues(datePicker);
					const expected = year - 1;
					expect(value).toBe(expected);
				});
				// End of [QWTC-2097] - Month, Day, Year pickers Animate with 5-way - LTR

				it('should focus move with 5-way select key [QWTC-2540]', async function () {
					// Step 3: Hover and 5-way Left and Select on the Month picker.
					await Page.showPointerByKeycode();
					await $('#datePickerDefault').moveTo({xOffset: -150, yOffset: 0});
					expect(await datePicker.month.isFocused()).toBe(true);
					await Page.spotlightLeft();
					await Page.spotlightSelect();
					// Step 3 Verify: The focus moves to the Day picker.
					expect(await datePicker.day.isFocused()).toBe(true);

					// Step 4: 5-way Select on the Day picker.
					await Page.spotlightSelect();
					// Step 4 Verify: The focus moves to the Year picker.
					expect(await datePicker.year.isFocused()).toBe(true);

					// Step 5: 5-way Select on the Year picker.
					await Page.spotlightSelect();
					// Step 5 Verify: The focus stays on the Year picker.
					expect(await datePicker.year.isFocused()).toBe(true);
				});
			});

			describe('pointer', function () {

				it('should select item', async function () {
					await datePicker.month.click();
					expect(await datePicker.month.isFocused()).toBe(true);
				});

				// Start of [QWTC-2095] - Month, Day, Year pickers Animate with Pointer Click - LTR
				it('should increase the month when incrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					await datePicker.month.click();
					expect(await datePicker.month.isFocused()).toBe(true);
					await datePicker.incrementer('month').click();
					const {month: value} = await extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the month when decrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					await datePicker.month.click();
					expect(await datePicker.month.isFocused()).toBe(true);
					await datePicker.decrementer('month').click();
					const {month: value} = await extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).toBe(expected);
				});

				it('should increase the day when incrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await datePicker.day.click();
					expect(await datePicker.day.isFocused()).toBe(true);
					await datePicker.incrementer('day').click();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).toBe(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await datePicker.day.click();
					expect(await datePicker.day.isFocused()).toBe(true);
					await datePicker.decrementer('day').click();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).toBe(expected);
				});

				it('should increase the year when incrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await datePicker.year.click();
					expect(await datePicker.year.isFocused()).toBe(true);
					await datePicker.incrementer('year').click();
					const {year: value} = await extractValues(datePicker);
					const expected = year + 1;
					expect(value).toBe(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await datePicker.year.click();
					expect(await datePicker.year.isFocused()).toBe(true);
					await datePicker.decrementer('year').click();
					const {year: value} = await extractValues(datePicker);
					const expected = year - 1;
					expect(value).toBe(expected);
				});
				// End of [QWTC-2095] - Month, Day, Year pickers Animate with Pointer Click - LTR
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)`
			const datePicker = Page.components.datePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', async function () {
					await datePicker.focus();

					const {day, month, year} = await extractValues(datePicker);

					expect(day).toBe(6);
					expect(month).toBe(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).toBe(2009);
				});
			});

			describe('pointer', function () {
				it('should not update on click', async function () {
					const {day, month, year} = await extractValues(datePicker);

					expect(day).toBe(6);
					expect(month).toBe(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).toBe(2009);
				});
			});

		});


		describe('disabled', function () {
			const datePicker = Page.components.datePickerDisabled;

			it('should focus the disabled month picker', async function () {
				await datePicker.month.click();
				expect(await datePicker.month.isFocused()).toBe(true);
			});

			it('should not increase the day when incrementing disabled picker', async function () {
				await datePicker.day.click();
				expect(await datePicker.day.isFocused()).toBe(true);

				await datePicker.incrementer('day').click();
				browser.pause(500);
				const {day: value} = await extractValues(datePicker);
				expect(value).toBe(1);
			});

			it('should not decrease the day when decrementing disabled picker', async function () {
				await datePicker.day.click();
				expect(await datePicker.day.isFocused()).toBe(true);

				await datePicker.decrementer('day').click();
				browser.pause(500);
				const {day: value} = await extractValues(datePicker);
				expect(value).toBe(1);
			});

		});

		describe('disabled with \'defaultValue\'', function () {
			const datePicker = Page.components.datePickerDisabledWithDefaultValue;

			it('should display default date', async function () {
				const {day, month, year} = await extractValues(datePicker);

				expect(day).toBe(6);
				expect(month).toBe(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
				expect(year).toBe(2009);

			});

			it('should not update \'defaultValue\' on decrementing disabled picker', async function () {
				const {day, month, year} = await extractValues(datePicker);
				await datePicker.month.click();
				expect(await datePicker.month.isFocused()).toBe(true);
				await datePicker.decrementer('month').click();

				await datePicker.day.click();
				expect(await datePicker.day.isFocused()).toBe(true);
				await datePicker.decrementer('day').click();

				await datePicker.year.click();
				expect(await datePicker.year.isFocused()).toBe(true);
				await datePicker.decrementer('year').click();

				browser.pause(500);

				expect(await day).toBe(6);
				expect(await month).toBe(6);
				expect(await year).toBe(2009);
			});

			it('should not update \'defaultValue\' on incrementing disabled picker', async function () {
				const {day, month, year} = await extractValues(datePicker);

				await datePicker.month.click();
				expect(await datePicker.month.isFocused()).toBe(true);
				await datePicker.incrementer('month').click();

				await datePicker.day.click();
				expect(await datePicker.day.isFocused()).toBe(true);
				await datePicker.incrementer('day').click();

				await datePicker.year.click();
				expect(await datePicker.year.isFocused()).toBe(true);
				await datePicker.incrementer('year').click();

				browser.pause(500);
				expect(await day).toBe(6);
				expect(await month).toBe(6);
				expect(await year).toBe(2009);
			});
		});

	});

	describe('RTL locale', function () {
		const datePicker = Page.components.datePickerDefault;

		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should focus rightmost picker (day) when selected', async function () {
			expect(await datePicker.day.isFocused()).toBe(true);
		});

		it('should have day-month-year order', async function () {
			expect(await datePicker.day.isFocused()).toBe(true);
			await Page.spotlightLeft();
			expect(await datePicker.month.isFocused()).toBe(true);
			await Page.spotlightLeft();
			expect(await datePicker.year.isFocused()).toBe(true);
		});

		it('should focus move with 5-way select key in RTL [QWTC-2540]', async function () {
			// Step 7: Hover and 5-way Right and Select on the DayPicker
			await Page.showPointerByKeycode();
			await $('#datePickerDefault').moveTo({xOffset: 150, yOffset: 0});
			expect(await datePicker.day.isFocused()).toBe(true);
			await Page.spotlightRight();
			await Page.spotlightSelect();
			// Step 7 Verify: The focus moves to the Month Picker.
			expect(await datePicker.month.isFocused()).toBe(true);

			// Step 8: 5-way Select on the Month Picker
			await Page.spotlightSelect();
			// Step 8 Verify: The focus moves to the Year Picker.
			expect(await datePicker.year.isFocused()).toBe(true);

			// Step 9: 5-way Select on the YearPicker.
			await Page.spotlightSelect();
			// Step 9 Verify: The focus stays on the Year Picker.
			expect(await datePicker.year.isFocused()).toBe(true);
		});
	});

	// In case of visual checking(enable/disable status,color), it will be tested on the screenshot tests.
	describe('check end value', function () {
		const datePickerCheckMinValue = Page.components.datePickerCheckMinValue;
		const datePickerCheckMaxValue = Page.components.datePickerCheckMaxValue;
		it('should check minimum end-value', async function () {
			// Step 3-1: Click on  Year Down picker until the Year 1900 displays.
			await datePickerCheckMinValue.decrementer('year').click();
			await datePickerCheckMinValue.decrementer('year').click();
			await datePickerCheckMinValue.decrementer('year').click();
			await datePickerCheckMinValue.decrementer('year').click();
			await datePickerCheckMinValue.decrementer('year').click();
			// Step 3 Verify: Year Value changes to 1900.
			expect((await extractValues(datePickerCheckMinValue)).year).toBe(1900);

			// check disabled picker does not work when value reached minimum end-value.
			await datePickerCheckMinValue.decrementer('year').click();
			expect((await extractValues(datePickerCheckMinValue)).year).toBe(1900);
			await datePickerCheckMinValue.incrementer('year').click();
			expect((await extractValues(datePickerCheckMinValue)).year).toBe(1901);
		});

		it('should check maximum end-value', async function () {
			// Step 3-1: Click on  Year Up picker until the Year 2099 displays.
			await datePickerCheckMaxValue.incrementer('year').click();
			await datePickerCheckMaxValue.incrementer('year').click();
			await datePickerCheckMaxValue.incrementer('year').click();
			await datePickerCheckMaxValue.incrementer('year').click();
			await datePickerCheckMaxValue.incrementer('year').click();
			// Step 3 Verify: Year Value changes to 2099.
			expect((await extractValues(datePickerCheckMaxValue)).year).toBe(2099);

			// check disabled picker does not work when value reached maximum end-value.
			await datePickerCheckMaxValue.incrementer('year').click();
			expect((await extractValues(datePickerCheckMaxValue)).year).toBe(2099);
			await datePickerCheckMaxValue.decrementer('year').click();
			expect((await extractValues(datePickerCheckMaxValue)).year).toBe(2098);
		});
	});
});
