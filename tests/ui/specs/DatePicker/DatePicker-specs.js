const Page = require('./DatePickerPage');
const {daysInMonth, expectClosed, expectNoLabels, expectOpen, extractValues, validateTitle} = require('./DatePicker-utils.js');

describe('DatePicker', function () {
	Page.open();

	it('should have focus on start', function () {
		expect(Page.components.datePickerDefaultClosedWithoutNoneText.title.isFocused()).to.be.true();
	});

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const datePicker = Page.components.datePickerDefaultClosedWithoutNoneText;

			it('should have correct title', function () {
				validateTitle(datePicker, 'Date Picker Default');
			});

			it('should be initially closed', function () {
				datePicker.self.waitForExist(500);
				expectClosed(datePicker);
			});

			it('should have month-day-year order', function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expectOpen(datePicker);
				expect(datePicker.month.isFocused(), 'Month').to.be.true();
				Page.spotlightRight();
				expect(datePicker.day.isFocused(), 'Day').to.be.true();
				Page.spotlightRight();
				expect(datePicker.year.isFocused(), 'Year').to.be.true();
			});

			describe('5-way', function () {
				it('should open, spot first item on select, and update value to current date', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const month = new Date(datePicker.valueText).getMonth();
					expectOpen(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					expect(month).to.be.within(0, 11);
				});

				it('should close when pressing select', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectOpen(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					Page.spotlightSelect();
					expectClosed(datePicker);
				});

				it('should focus title when 5-way right from last picker - [GT-24986]', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectOpen(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					Page.spotlightRight();
					Page.spotlightRight();
					Page.spotlightRight();
					expect(datePicker.title.isFocused()).to.be.true();
				});

				it('should increase the month when incrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {month} = extractValues(datePicker);
					expectOpen(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightUp();
					});
					const {month: value} = extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker - [GT-21247]', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {month} = extractValues(datePicker);
					expectOpen(datePicker);
					expect(datePicker.month.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
					const {month: value} = extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker - [GT-21247]', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					expectOpen(datePicker);
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
					expectOpen(datePicker);
					Page.spotlightRight();
					expect(datePicker.day.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
					const {day: value} = extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker - [GT-21247]', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {year} = extractValues(datePicker);
					expectOpen(datePicker);
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
					expectOpen(datePicker);
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
			});

			describe('pointer', function () {
				it('should open on title click when closed', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					expectOpen(datePicker);
				});

				it('should close on title click when open', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					expectOpen(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					expectClosed(datePicker);
				});

				it('should select item', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					datePicker.month.click();
					expect(datePicker.month.isFocused()).to.be.true();
				});

				it('should increase the month when incrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					const {month} = extractValues(datePicker);
					expectOpen(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.incrementer(datePicker.month).click();
					});
					const {month: value} = extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					const {month} = extractValues(datePicker);
					expectOpen(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.decrementer(datePicker.month).click();
					});
					const {month: value} = extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					expectOpen(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.incrementer(datePicker.day).click();
					});
					const {day: value} = extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					expectOpen(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.decrementer(datePicker.day).click();
					});
					const {day: value} = extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					const {year} = extractValues(datePicker);
					expectOpen(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.incrementer(datePicker.year).click();
					});
					const {year: value} = extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					const {year} = extractValues(datePicker);
					expectOpen(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.decrementer(datePicker.year).click();
					});
					const {year: value} = extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
			});
		});

		describe('default with noneText', function () {
			const datePicker = Page.components.datePickerDefaultClosedWithNoneText;

			it('should display \'noneText\' - [GT-21246]', function () {
				expect(datePicker.valueText).to.equal('Nothing Selected');
			});
		});

		describe('default open', function () {
			const datePicker = Page.components.datePickerDefaultOpenWithNoneText;

			it('should be initially open', function () {
				datePicker.self.waitForExist(500);
				expectOpen(datePicker);
			});

			describe('5-way', function () {
				it('should close when pressing select', function () {
					datePicker.focus();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectClosed(datePicker);
					expect(datePicker.title.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click when open - [GT-21246]', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					expectClosed(datePicker);
				});

				it('should open on title click when closed', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					expectClosed(datePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					expectOpen(datePicker);
				});
			});
		});

		describe('\'defaultOpen\' with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const datePicker = Page.components.datePickerDefaultOpenWithDefaultValue;

			it('should be initially open', function () {
				datePicker.self.waitForExist(500);
				expectOpen(datePicker);
			});

			it('should not display \'noneText\'', function () {
				expect(datePicker.valueText).to.not.equal('Nothing Selected');
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
				it('should not update on title click', function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						datePicker.title.click();
					});
					const {day, month, year} = extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2009);
				});
			});

		});

		describe('no labels', function () {
			const datePicker = Page.components.datePickerNoLabels;

			it('should not have labeled pickers', function () {
				datePicker.title.click();
				expectNoLabels(datePicker);
			});
		});

		describe('disabled', function () {
			const datePicker = Page.components.datePickerDisabledWithNoneText;

			it('should be initially closed', function () {
				datePicker.self.waitForExist(500);
				expectClosed(datePicker);
			});

			it('should display \'noneText\'', function () {
				expect(datePicker.valueText).to.equal('Nothing Selected');
			});

			describe('5-way', function () {
				it('should be able to receive focus', function () {
					Page.components.datePickerNoLabels.focus();
					Page.spotlightDown();
					expect(datePicker.title.isFocused()).to.be.true();
				});
				it('should not open when selected', function () {
					Page.spotlightSelect();
					browser.pause(500);
					expectClosed(datePicker);
				});
			});

			describe('pointer', function () {
				it('should not open when clicked', function () {
					datePicker.title.click();
					// it should never open, but wait and then check to be sure
					browser.pause(500);
					expectClosed(datePicker);
				});
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const datePicker = Page.components.datePickerDisabledWithDefaultValue;

			it('should be initially closed', function () {
				datePicker.self.waitForExist(500);
				expectClosed(datePicker);
			});

			it('should not display \'noneText\'', function () {
				expect(datePicker.valueText).to.not.equal('Nothing Selected');
			});
		});

		describe('disabled \'defaultOpen\'', function () {
			const datePicker = Page.components.datePickerDisabledOpenWithNoneText;
			it('should be initially closed', function () {
				datePicker.self.waitForExist(500);
				expectClosed(datePicker);
			});

			it('should display \'noneText\'', function () {
				expect(datePicker.valueText).to.equal('Nothing Selected');
			});
		});

		describe('disabled \'defaultOpen\' with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const datePicker = Page.components.datePickerDisabledOpenWithDefaultValue;

			it('should be initially closed', function () {
				datePicker.self.waitForExist(500);
				expectClosed(datePicker);
			});

			it('should not display \'noneText\'', function () {
				expect(datePicker.valueText).to.not.equal('Nothing Selected');
			});
		});
	});

	describe('RTL locale', function () {
		const datePicker = Page.components.datePickerDefaultClosedWithoutNoneText;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should focus rightmost picker (day) when selected', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expectOpen(datePicker);
			expect(datePicker.day.isFocused()).to.be.true();
		});

		it('should have day-month-year order', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expectOpen(datePicker);
			expect(datePicker.day.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.month.isFocused()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.year.isFocused()).to.be.true();
		});

		it('should focus title when 5-way left from last picker - [GT-25238]', function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expectOpen(datePicker);
			expect(datePicker.day.isFocused()).to.be.true();
			Page.spotlightLeft();
			Page.spotlightLeft();
			Page.spotlightLeft();
			expect(datePicker.title.isFocused()).to.be.true();
		});
	});

});
