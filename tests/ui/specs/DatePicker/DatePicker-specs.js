const Page = require('./DatePickerPage');
const {daysInMonth, extractValues, validateTitle} = require('./DatePicker-utils.js');

describe('DatePicker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const datePicker = Page.components.datePickerDefault;

			it('should have correct title', function () {
				validateTitle(datePicker, 'Date Picker Default');
			});

			it('should have month-day-year order', function () {
				expect(datePicker.month.isFocused(), 'Month').to.be.true();
				Page.spotlightRight();
				expect(datePicker.day.isFocused(), 'Day').to.be.true();
				Page.spotlightRight();
				expect(datePicker.year.isFocused(), 'Year').to.be.true();
			});

			describe('5-way', function () {
				// Start of [GT-28597] - Month, Day, Year pickers Animate with 5-way - LTR
				it('should increase the month when incrementing the picker', function () {
					const {month} = extractValues(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					Page.spotlightUp();
					const {month: value} = extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', function () {
					const {month} = extractValues(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					Page.spotlightDown();
					const {month: value} = extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', function () {
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					Page.spotlightRight();
					expect(datePicker.day.isFocused()).to.be.true();
					Page.spotlightUp();
					const {day: value} = extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', function () {
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					Page.spotlightRight();
					expect(datePicker.day.isFocused()).to.be.true();
					Page.spotlightDown();
					const {day: value} = extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', function () {
					const {year} = extractValues(datePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(datePicker.year.isFocused()).to.be.true();
					Page.spotlightUp();
					const {year: value} = extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', function () {
					const {year} = extractValues(datePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(datePicker.year.isFocused()).to.be.true();
					Page.spotlightDown();
					const {year: value} = extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
				// End of [GT-28597] - Month, Day, Year pickers Animate with 5-way - LTR
			});

			describe('pointer', function () {

				it('should select item', function () {
					datePicker.month.click();
					expect(datePicker.month.isFocused()).to.be.true();
				});

				// Start of [GT-28541] - Month, Day, Year pickers Animate with Pointer Click - LTR
				it('should increase the month when incrementing the picker', function () {
					const {month} = extractValues(datePicker);
					datePicker.month.click();
					expect(datePicker.month.isFocused()).to.be.true();
					datePicker.incrementer(datePicker.month).click();
					const {month: value} = extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', function () {
					const {month} = extractValues(datePicker);
					datePicker.month.click();
					expect(datePicker.month.isFocused()).to.be.true();
					datePicker.decrementer(datePicker.month).click();
					const {month: value} = extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', function () {
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					datePicker.day.click();
					expect(datePicker.day.isFocused()).to.be.true();
					datePicker.incrementer(datePicker.day).click();
					const {day: value} = extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', function () {
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					datePicker.day.click();
					expect(datePicker.day.isFocused()).to.be.true();
					datePicker.decrementer(datePicker.day).click();
					const {day: value} = extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', function () {
					const {year} = extractValues(datePicker);
					datePicker.year.click();
					expect(datePicker.year.isFocused()).to.be.true();
					datePicker.incrementer(datePicker.year).click();
					const {year: value} = extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', function () {
					const {year} = extractValues(datePicker);
					datePicker.year.click();
					expect(datePicker.year.isFocused()).to.be.true();
					datePicker.decrementer(datePicker.year).click();
					const {year: value} = extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
				// End of [GT-28541] - Month, Day, Year pickers Animate with Pointer Click - LTR
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)`
			const datePicker = Page.components.datePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', function () {
					datePicker.focus();

					const {day, month, year} = extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2009);
				});
			});

			describe('pointer', function () {
				it('should not update on click', function () {
					const {day, month, year} = extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2009);
				});
			});

		});


		describe('disabled', function () {
			const datePicker = Page.components.datePickerDisabled;

			it('should focus the disabled month picker', function () {
				datePicker.month.click();
				expect(datePicker.month.isFocused()).to.be.true();
			});

			it('should not increase the day when incrementing disabled picker', function () {
				datePicker.day.click();
				expect(datePicker.day.isFocused()).to.be.true();

				datePicker.incrementer(datePicker.day).click();
				browser.pause(500);
				const {day: value} = extractValues(datePicker);
				expect(value).to.equal(1);
			});

			it('should not decrease the day when decrementing disabled picker', function () {
				datePicker.day.click();
				expect(datePicker.day.isFocused()).to.be.true();

				datePicker.decrementer(datePicker.day).click();
				browser.pause(500);
				const {day: value} = extractValues(datePicker);
				expect(value).to.equal(1);
			});

		});

		describe('disabled with \'defaultValue\'', function () {
			const datePicker = Page.components.datePickerDisabledWithDefaultValue;

			it('should display default date', function () {
				const {day, month, year} = extractValues(datePicker);

				expect(day).to.equal(6);
				expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
				expect(year).to.equal(2009);

			});

			it('should not update \'defaultValue\' on decrementing disabled picker', function () {
				const {day, month, year} = extractValues(datePicker);
				datePicker.month.click();
				expect(datePicker.month.isFocused()).to.be.true();
				datePicker.decrementer(datePicker.month).click();

				datePicker.day.click();
				expect(datePicker.day.isFocused()).to.be.true();
				datePicker.decrementer(datePicker.day).click();

				datePicker.year.click();
				expect(datePicker.year.isFocused()).to.be.true();
				datePicker.decrementer(datePicker.year).click();

				browser.pause(500);

				expect(day).to.equal(6);
				expect(month).to.equal(6);
				expect(year).to.equal(2009);
			});

			it('should not update \'defaultValue\' on incrementing disabled picker', function () {
				const {day, month, year} = extractValues(datePicker);

				datePicker.month.click();
				expect(datePicker.month.isFocused()).to.be.true();
				datePicker.incrementer(datePicker.month).click();

				datePicker.day.click();
				expect(datePicker.day.isFocused()).to.be.true();
				datePicker.incrementer(datePicker.day).click();

				datePicker.year.click();
				expect(datePicker.year.isFocused()).to.be.true();
				datePicker.incrementer(datePicker.year).click();

				browser.pause(500);
				expect(day).to.equal(6);
				expect(month).to.equal(6);
				expect(year).to.equal(2009);
			});
		});

	});

	describe('RTL locale', function () {
		const datePicker = Page.components.datePickerDefault;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should focus rightmost picker (day) when selected', function () {
			expect(datePicker.day.isFocused()).to.be.true();
		});

		it('should have day-month-year order', function () {
			expect(datePicker.day.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.month.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.year.isFocused()).to.be.true();
		});
	});

});
