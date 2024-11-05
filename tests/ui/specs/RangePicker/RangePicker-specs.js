const Page = require('./RangePickerPage');
const {extractValue} = require('./RangePicker-utils.js');

describe('RangePicker', function () {
	beforeEach(async function () {
		await Page.open();
	});

	describe('horizontal', function () {
		describe('default', function () {
			const rangePicker = Page.components.rangePickerDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the rangePicker', async function () {
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should change the value backward when decrementing the rangePicker', async function () {
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await Page.spotlightLeft();
					expect(await rangePicker.decrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should decrease the value when decrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});

				it('should not increase the value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).toBe(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).toBe(10);
				});

				it('should not decrease the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});
			});
		});

		describe('disabled', function () {
			const rangePicker = Page.components.rangePickerDisabled;

			describe('5-way', function () {
				it('should not update on select', async function () {
					const oldValue = extractValue(rangePicker);
					await Page.spotlightSelect();
					rangePicker.focus();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(await oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', async function () {
					const oldValue = extractValue(rangePicker);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(await oldValue);
				});

				it('should not decrease the value when clicking the decrementer', async function () {
					const oldValue = extractValue(rangePicker);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(await oldValue);
				});
			});
		});

		describe('with negativeValues', function () {
			const rangePicker = Page.components.rangePickerWithNegativeValues;

			it('should have the default value selected', async function () {
				const newValue = extractValue(rangePicker);
				expect(await newValue).toBe(0);
			});

			it('should decrement to negative number', async function () {
				await rangePicker.decrementer(rangePicker.self).click();
				await browser.pause(500);
				const newValue = extractValue(rangePicker);
				expect(await newValue).toBe(-5);
			});
		});

		describe('wrap', function () {
			const rangePicker = Page.components.rangePickerWrap;

			describe('5-way', function () {
				it('should change the value forward when incrementing the rangePicker', async function () {
					await rangePicker.focus();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should change the value backward when decrementing the rangePicker', async function () {
					await rangePicker.focus();
					await Page.spotlightSelect();
					await Page.spotlightLeft();
					expect(await rangePicker.decrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should decrease the value when decrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});

				it('should wrap value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).toBe(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).toBe(0);
				});

				it('should wrap the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(10);
				});
			});
		});

		describe('joined', function () {
			const rangePicker = Page.components.rangePickerJoined;

			describe('5-way', function () {
				it('should increase the value on 5-way select', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});
			});

			describe('pointer', function () {
				it('should increase the value when on click', async function () {
					await rangePicker.self.click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should wrap the value when current value is equal to max', async function () {
					await rangePicker.self.click();
					await rangePicker.self.click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).toBe(10);
					await rangePicker.self.click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).toBe(0);
				});
			});
		});
	});

	describe('RangePicker', function () {
		const maxValueRangePicker = Page.components.rangePickerMaxValues;
		const minValueRangePicker = Page.components.rangePickerMinValues;

		it('should change the value with 5-way left/right [QWTC-2144]', async function () {
			// Step 3: 5-way Spot and 5-way Select the Right arrow button.
			await maxValueRangePicker.focus();
			expect(await maxValueRangePicker.incrementer(maxValueRangePicker.self).isFocused()).toBe(true);
			await Page.spotlightSelect();
			// Step 3 Verify: The ending value displays 5.
			expect(await extractValue(maxValueRangePicker)).toBe(5);
			// Step 4: 5-way Select 2 times the Right arrow button.
			await Page.spotlightSelect();
			expect(await extractValue(maxValueRangePicker)).toBe(10);
			await Page.spotlightSelect();
			// Step 4 Verify: The ending value displays 15.
			expect(await extractValue(maxValueRangePicker)).toBe(15);

			// Step 5: 5-way Spot and 5-way Select the Left arrow button.
			await Page.spotlightLeft();
			await Page.spotlightSelect();
			// Step 5 Verify: The ending value displays 10.
			expect(await extractValue(maxValueRangePicker)).toBe(10);
		});

		it('should display minValue [QWTC-2629]', async function () {
			expect(await extractValue(minValueRangePicker)).toBe(5);
		});
	});

	describe('vertical', function () {
		describe('default', function () {
			const rangePicker = Page.components.rangePickerVertical;

			describe('5-way', function () {
				it('should change the value forward when incrementing the rangePicker', async function () {
					await rangePicker.focus();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should change the value backward when decrementing the rangePicker', async function () {
					await rangePicker.focus();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await Page.spotlightDown();
					expect(await rangePicker.decrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker',  async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should decrease the value when decrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});

				it('should not increase the value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).toBe(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).toBe(10);
				});

				it('should not decrease the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});
			});
		});

		describe('disabled', function () {
			const rangePicker = Page.components.rangePickerVerticalDisabled;

			describe('5-way', function () {
				it('should not update on select', async function () {
					const oldValue = extractValue(rangePicker);
					await Page.spotlightSelect();
					await rangePicker.focus();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(await oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', async function () {
					const oldValue = extractValue(rangePicker);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(await oldValue);
				});

				it('should not decrease the value when clicking the decrementer', async function () {
					const oldValue = extractValue(rangePicker);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(await oldValue);
				});
			});
		});

		describe('with negativeValues', function () {
			const rangePicker = Page.components.rangePickerWithNegativeValuesVertical;

			it('should have the default value selected', async function () {
				const newValue = extractValue(rangePicker);
				expect(await newValue).toBe(0);
			});

			it('should decrement to negative number', async function () {
				await rangePicker.decrementer(rangePicker.self).click();
				await browser.pause(500);
				const newValue = extractValue(rangePicker);
				expect(await newValue).toBe(-1);
			});
		});

		describe('wrap', function () {
			const rangePicker = Page.components.rangePickerVerticalWrap;

			describe('5-way', function () {
				it('should change the value forward when incrementing the rangePicker', async function () {
					await rangePicker.focus();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should change the value backward when decrementing the rangePicker', async function () {
					await rangePicker.focus();
					await Page.spotlightSelect();
					await Page.spotlightDown();
					expect(await rangePicker.decrementer(rangePicker.self).isFocused()).toBe(true);
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should decrease the value when decrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).toBe(true);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});

				it('should wrap value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).toBe(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).toBe(0);
				});

				it('should wrap the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(10);
				});
			});
		});

		describe('joined', function () {
			const rangePicker = Page.components.rangePickerVerticalJoined;

			describe('5-way', function () {
				it('should increase the value on 5-way up', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should decrease the value on 5-way down', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightUp();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});

				it('should not increase the value on 5-way up when current value is equal to max', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightUp();
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).toBe(10);
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).toBe(10);
				});

				it('should not decrease the value on 5-way down when current value is equal to min', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when on incrementer click', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should decrease the value when on decrementer click', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});

				it('should not increase the value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).toBe(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).toBe(10);
				});

				it('should not decrease the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});
			});
		});

		describe('wrap joined', function () {
			const rangePicker = Page.components.rangePickerVerticalWrapJoined;

			describe('5-way', function () {
				it('should increase the value on 5-way up', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should decrease the value on 5-way down', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightUp();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});

				it('should wrap the value on 5-way up when current value is equal to max', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightUp();
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).toBe(10);
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).toBe(0);
				});

				it('should wrap the value on 5-way down when current value is equal to min', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(10);
				});
			});

			describe('pointer', function () {
				it('should increase the value when on incrementer click', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(5);
				});

				it('should decrease the value when on decrementer click', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(0);
				});

				it('should wrap the value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).toBe(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).toBe(0);
				});

				it('should wrap the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).toBe(10);
				});
			});
		});
	});
});
