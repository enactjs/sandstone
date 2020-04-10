const Page = require('./DatePickerPage');
const {daysInMonth, extractValues, validateTitle} = require('./DatePicker-utils.js');

describe('DatePicker', function () {
	Page.open();

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
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {month} = extractValues(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightUp();
					});
					const {month: value} = extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {month} = extractValues(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
					const {month: value} = extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					Page.spotlightRight();
					expect(datePicker.day.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightUp();
					});
					const {day: value} = extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					Page.spotlightRight();
					expect(datePicker.day.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
					const {day: value} = extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {year} = extractValues(datePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(datePicker.year.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightUp();
					});
					const {year: value} = extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {year} = extractValues(datePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(datePicker.year.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
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
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.incrementer(datePicker.month).click();
					});
					const {month: value} = extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', function () {
					const {month} = extractValues(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.decrementer(datePicker.month).click();
					});
					const {month: value} = extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', function () {
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.incrementer(datePicker.day).click();
					});
					const {day: value} = extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', function () {
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.decrementer(datePicker.day).click();
					});
					const {day: value} = extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', function () {
					const {year} = extractValues(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.incrementer(datePicker.year).click();
					});
					const {year: value} = extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', function () {
					const {year} = extractValues(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.decrementer(datePicker.year).click();
					});
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
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

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

			it('should not display \'noneText\'', function () {
				expect(datePicker.dateLabel).to.not.equal('Nothing Selected');
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const datePicker = Page.components.datePickerDisabledWithDefaultValue;

			it('should not display \'noneText\'', function () {
				expect(datePicker.dateLabel).to.not.equal('Nothing Selected');
			});
		});

	});

	describe('RTL locale', function () {
		const datePicker = Page.components.datePickerDefault;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should focus rightmost picker (day) when selected', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expect(datePicker.day.isFocused()).to.be.true();
		});

		it('should have day-month-year order', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expect(datePicker.day.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.month.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.year.isFocused()).to.be.true();
		});
	});

});
