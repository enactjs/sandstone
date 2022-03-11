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
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should change the value backward when decrementing the rangePicker', async function () {
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await Page.spotlightLeft();
					expect(await rangePicker.decrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should decrease the value when decrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});

				it('should not increase the value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).to.equal(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).to.equal(10);
				});

				it('should not decrease the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
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
					expect(await newValue).to.equal(await oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', async function () {
					const oldValue = extractValue(rangePicker);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(await oldValue);
				});

				it('should not decrease the value when clicking the decrementer', async function () {
					const oldValue = extractValue(rangePicker);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(await oldValue);
				});
			});
		});

		describe('with negativeValues', function () {
			const rangePicker = Page.components.rangePickerWithNegativeValues;

			it('should have the default value selected', async function () {
				const newValue = extractValue(rangePicker);
				expect(await newValue).to.equal(0);
			});

			it('should decrement to negative number', async function () {
				await rangePicker.decrementer(rangePicker.self).click();
				await browser.pause(500);
				const newValue = extractValue(rangePicker);
				expect(await newValue).to.equal(-1);
			});
		});

		describe('wrap', function () {
			const rangePicker = Page.components.rangePickerWrap;

			describe('5-way', function () {
				it('should change the value forward when incrementing the rangePicker', async function () {
					await rangePicker.focus();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should change the value backward when decrementing the rangePicker', async function () {
					await rangePicker.focus();
					await Page.spotlightSelect();
					await Page.spotlightLeft();
					expect(await rangePicker.decrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should decrease the value when decrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});

				it('should wrap value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).to.equal(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).to.equal(0);
				});

				it('should wrap the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(10);
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
					expect(await newValue).to.equal(5);
				});
			});

			describe('pointer', function () {
				it('should increase the value when on click', async function () {
					await rangePicker.self.click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should wrap the value when current value is equal to max', async function () {
					await rangePicker.self.click();
					await rangePicker.self.click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).to.equal(10);
					await rangePicker.self.click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).to.equal(0);
				});
			});
		});
	});

	describe('vertical', function () {
		describe('default', function () {
			const rangePicker = Page.components.rangePickerVertical;

			describe('5-way', function () {
				it('should change the value forward when incrementing the rangePicker', async function () {
					await rangePicker.focus();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should change the value backward when decrementing the rangePicker', async function () {
					await rangePicker.focus();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await Page.spotlightDown();
					expect(await rangePicker.decrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker',  async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should decrease the value when decrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});

				it('should not increase the value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).to.equal(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).to.equal(10);
				});

				it('should not decrease the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
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
					expect(await newValue).to.equal(await oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', async function () {
					const oldValue = extractValue(rangePicker);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(await oldValue);
				});

				it('should not decrease the value when clicking the decrementer', async function () {
					const oldValue = extractValue(rangePicker);
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(await oldValue);
				});
			});
		});

		describe('with \'negativeValues\'', function () {
			const rangePicker = Page.components.rangePickerWithNegativeValuesVertical;

			it('should have the default value selected', async function () {
				const newValue = extractValue(rangePicker);
				expect(await newValue).to.equal(0);
			});

			it('should decrement to negative number', async function () {
				await rangePicker.decrementer(rangePicker.self).click();
				await browser.pause(500);
				const newValue = extractValue(rangePicker);
				expect(await newValue).to.equal(-1);
			});
		});

		describe('wrap', function () {
			const rangePicker = Page.components.rangePickerVerticalWrap;

			describe('5-way', function () {
				it('should change the value forward when incrementing the rangePicker', async function () {
					await rangePicker.focus();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should change the value backward when decrementing the rangePicker', async function () {
					await rangePicker.focus();
					await Page.spotlightSelect();
					await Page.spotlightDown();
					expect(await rangePicker.decrementer(rangePicker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should decrease the value when decrementing the rangePicker', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					expect(await rangePicker.incrementer(rangePicker.self).isFocused()).to.be.true();
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});

				it('should wrap value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).to.equal(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).to.equal(0);
				});

				it('should wrap the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(10);
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
					expect(await newValue).to.equal(5);
				});

				it('should decrease the value on 5-way down', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightUp();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});

				it('should not increase the value on 5-way up when current value is equal to max', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightUp();
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).to.equal(10);
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).to.equal(10);
				});

				it('should not decrease the value on 5-way down when current value is equal to min', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});
			});

			describe('pointer', function () {
				it('should increase the value when on incrementer click', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should decrease the value when on decrementer click', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});

				it('should not increase the value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).to.equal(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).to.equal(10);
				});

				it('should not decrease the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
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
					expect(await newValue).to.equal(5);
				});

				it('should decrease the value on 5-way down', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightUp();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});

				it('should wrap the value on 5-way up when current value is equal to max', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightUp();
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).to.equal(10);
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).to.equal(0);
				});

				it('should wrap the value on 5-way down when current value is equal to min', async function () {
					await rangePicker.focusJoined();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(10);
				});
			});

			describe('pointer', function () {
				it('should increase the value when on incrementer click', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(5);
				});

				it('should decrease the value when on decrementer click', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(0);
				});

				it('should wrap the value when incrementing the rangePicker and current value is equal to max', async function () {
					await rangePicker.incrementer(rangePicker.self).click();
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(rangePicker);
					expect(await newValue1).to.equal(10);
					await rangePicker.incrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(rangePicker);
					expect(await newValue2).to.equal(0);
				});

				it('should wrap the value when decrementing the rangePicker and current value is equal to min', async function () {
					await rangePicker.decrementer(rangePicker.self).click();
					await browser.pause(500);
					const newValue = extractValue(rangePicker);
					expect(await newValue).to.equal(10);
				});
			});
		});
	});
});
