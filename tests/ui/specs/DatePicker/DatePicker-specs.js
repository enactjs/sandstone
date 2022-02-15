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
				expect(await datePicker.month.isFocused(), 'Month').to.be.true();
				await Page.spotlightRight();
				expect(await datePicker.day.isFocused(), 'Day').to.be.true();
				await Page.spotlightRight();
				expect(await datePicker.year.isFocused(), 'Year').to.be.true();
			});

			describe('5-way', function () {
				// Start of [QWT-2553] - Month, Day, Year pickers Animate with 5-way - LTR
				it('should increase the month when incrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					expect(await datePicker.month.isFocused()).to.be.true();
					await Page.spotlightUp();
					const {month: value} = await extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					expect(await datePicker.month.isFocused()).to.be.true();
					await Page.spotlightDown();
					const {month: value} = await extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await Page.spotlightRight();
					expect(await datePicker.day.isFocused()).to.be.true();
					await Page.spotlightUp();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await Page.spotlightRight();
					expect(await datePicker.day.isFocused()).to.be.true();
					await Page.spotlightDown();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.year.isFocused()).to.be.true();
					await Page.spotlightUp();
					const {year: value} = await extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.year.isFocused()).to.be.true();
					await Page.spotlightDown();
					const {year: value} = await extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
				// End of [QWT-2553] - Month, Day, Year pickers Animate with 5-way - LTR
			});

			describe('pointer', function () {

				it('should select item', async function () {
					await datePicker.month.click();
					expect(await datePicker.month.isFocused()).to.be.true();
				});

				// Start of [QWT-2555] - Month, Day, Year pickers Animate with Pointer Click - LTR
				it('should increase the month when incrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					await datePicker.month.click();
					expect(await datePicker.month.isFocused()).to.be.true();
					await datePicker.incrementer(datePicker.month).click();
					const {month: value} = await extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', async function () {
					const {month} = await extractValues(datePicker);
					await datePicker.month.click();
					expect(await datePicker.month.isFocused()).to.be.true();
					await datePicker.decrementer(datePicker.month).click();
					const {month: value} = await extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await datePicker.day.click();
					expect(await datePicker.day.isFocused()).to.be.true();
					await datePicker.incrementer(datePicker.day).click();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await datePicker.day.click();
					expect(await datePicker.day.isFocused()).to.be.true();
					await datePicker.decrementer(datePicker.day).click();
					const {day: value} = await extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await datePicker.year.click();
					expect(await datePicker.year.isFocused()).to.be.true();
					await datePicker.incrementer(datePicker.year).click();
					const {year: value} = await extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					const {year} = await extractValues(datePicker);
					await datePicker.year.click();
					expect(await datePicker.year.isFocused()).to.be.true();
					await datePicker.decrementer(datePicker.year).click();
					const {year: value} = await extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
				// End of [QWT-2555] - Month, Day, Year pickers Animate with Pointer Click - LTR
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)`
			const datePicker = Page.components.datePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', async function () {
					await datePicker.focus();

					const {day, month, year} = await extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2009);
				});
			});

			describe('pointer', function () {
				it('should not update on click', async function () {
					const {day, month, year} = await extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2009);
				});
			});

		});


		describe('disabled', function () {
			const datePicker = Page.components.datePickerDisabled;

			it('should focus the disabled month picker', async function () {
				await datePicker.month.click();
				expect(await datePicker.month.isFocused()).to.be.true();
			});

			it('should not increase the day when incrementing disabled picker', async function () {
				await datePicker.day.click();
				expect(await datePicker.day.isFocused()).to.be.true();

				await datePicker.incrementer(datePicker.day).click();
				browser.pause(500);
				const {day: value} = await extractValues(datePicker);
				expect(value).to.equal(1);
			});

			it('should not decrease the day when decrementing disabled picker', async function () {
				await datePicker.day.click();
				expect(await datePicker.day.isFocused()).to.be.true();

				await datePicker.decrementer(datePicker.day).click();
				browser.pause(500);
				const {day: value} = await extractValues(datePicker);
				expect(value).to.equal(1);
			});

		});

		describe('disabled with \'defaultValue\'', function () {
			const datePicker = Page.components.datePickerDisabledWithDefaultValue;

			it('should display default date', async function () {
				const {day, month, year} = await extractValues(datePicker);

				expect(day).to.equal(6);
				expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
				expect(year).to.equal(2009);

			});

			it('should not update \'defaultValue\' on decrementing disabled picker', async function () {
				const {day, month, year} = await extractValues(datePicker);
				await datePicker.month.click();
				expect(await datePicker.month.isFocused()).to.be.true();
				await datePicker.decrementer(datePicker.month).click();

				await datePicker.day.click();
				expect(await datePicker.day.isFocused()).to.be.true();
				await datePicker.decrementer(datePicker.day).click();

				await datePicker.year.click();
				expect(await datePicker.year.isFocused()).to.be.true();
				await datePicker.decrementer(datePicker.year).click();

				browser.pause(500);

				expect(await day).to.equal(6);
				expect(await month).to.equal(6);
				expect(await year).to.equal(2009);
			});

			it('should not update \'defaultValue\' on incrementing disabled picker', async function () {
				const {day, month, year} = await extractValues(datePicker);

				await datePicker.month.click();
				expect(await datePicker.month.isFocused()).to.be.true();
				await datePicker.incrementer(datePicker.month).click();

				await datePicker.day.click();
				expect(await datePicker.day.isFocused()).to.be.true();
				await datePicker.incrementer(datePicker.day).click();

				await datePicker.year.click();
				expect(await datePicker.year.isFocused()).to.be.true();
				await datePicker.incrementer(datePicker.year).click();

				browser.pause(500);
				expect(await day).to.equal(6);
				expect(await month).to.equal(6);
				expect(await year).to.equal(2009);
			});
		});

	});

	describe('RTL locale', function () {
		const datePicker = Page.components.datePickerDefault;

		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should focus rightmost picker (day) when selected', async function () {
			expect(await datePicker.day.isFocused()).to.be.true();
		});

		it('should have day-month-year order', async function () {
			expect(await datePicker.day.isFocused()).to.be.true();
			await Page.spotlightLeft();
			expect(await datePicker.month.isFocused()).to.be.true();
			await Page.spotlightLeft();
			expect(await datePicker.year.isFocused()).to.be.true();
		});
	});

});
