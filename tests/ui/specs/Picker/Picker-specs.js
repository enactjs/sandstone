const Page = require('./PickerPage');
const {extractValue} = require('./Picker-utils.js');

describe('Picker', function () {
	beforeEach(async function () {
		await Page.open();
	});

	describe('horizontal', function () {
		describe('default', function () {
			const picker = Page.components.pickerDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', async function () {
					expect(await picker.incrementer(picker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should change the value backward when decrementing the picker', async function () {
					expect(await picker.incrementer(picker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await Page.spotlightLeft();
					expect(await picker.decrementer(picker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', async function () {
					await picker.incrementer(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should decrease the value when decrementing the picker', async function () {
					await picker.incrementer(picker.self).click();
					expect(await picker.incrementer(picker.self).isFocused()).to.be.true();
					await picker.decrementer(picker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).to.equal('Apple');
				});

				it('should not change the value of the picker forward when the current value is the last', async function () {
					await picker.incrementer(picker.self).click();
					await picker.incrementer(picker.self).click();
					await picker.incrementer(picker.self).click();
					await browser.pause(500);
					const newValue1 = await extractValue(picker);
					expect(newValue1).to.equal('Durian');
					await picker.incrementer(picker.self).click();
					await browser.pause(500);
					const newValue2 = await extractValue(picker);
					expect(newValue2).to.equal('Durian');
				});

				it('should not change the value backwards when the current value is the first', async function () {
					await picker.decrementer(picker.self).click();
					await browser.pause(500);
					const newValue = await extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `Banana`
			const picker = Page.components.pickerWithDefaultValue;

			it('should have the default value selected', async function () {
				const newValue = extractValue(picker);
				expect(await newValue).to.equal('Banana');
			});
		});

		describe('disabled', function () {
			const picker = Page.components.pickerDisabled;

			describe('5-way', function () {
				it('should not update on select', async function () {
					const oldValue = extractValue(picker);
					await Page.spotlightSelect();
					await picker.focus();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal(await oldValue);
				});
			});

			describe('pointer', function () {
				it('should not change the value forward when clicking the incrementer', async function () {
					const oldValue = extractValue(picker);
					await picker.incrementer(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal(await oldValue);
				});

				it('should not change the value backward when clicking the decrementer', async function () {
					const oldValue = extractValue(picker);
					await picker.decrementer(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal(await oldValue);
				});
			});
		});

		describe('wrap', function () {
			const picker = Page.components.pickerWrap;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', async function () {
					await picker.focus();
					expect(await picker.incrementer(picker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should change the value backward when decrementing the picker', async function () {
					await picker.focus();
					await Page.spotlightSelect();
					await Page.spotlightLeft();
					expect(await picker.decrementer(picker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', async function () {
					await picker.incrementer(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should decrease the value when decrementing the picker', async function () {
					await picker.incrementer(picker.self).click();
					expect(await picker.incrementer(picker.self).isFocused()).to.be.true();
					await picker.decrementer(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});

				it('should wrap value when incrementing the picker and current value is the last', async function () {
					await picker.incrementer(picker.self).click();
					await picker.incrementer(picker.self).click();
					await picker.incrementer(picker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(await newValue1).to.equal('Durian');
					await picker.incrementer(picker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(await newValue2).to.equal('Apple');
				});

				it('should wrap the value when decrementing the picker and current value is the first', async function () {
					await picker.decrementer(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Durian');
				});
			});
		});

		describe('joined', function () {
			const picker = Page.components.pickerJoined;

			describe('5-way', function () {
				it('should increase the value on 5-way select', async function () {
					await await picker.focusJoined();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});
			});

			describe('pointer', function () {
				it('should increase the value when on click', async function () {
					await picker.self.click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should wrap the value when current value is equal to max', async function () {
					await picker.self.click();
					await picker.self.click();
					await picker.self.click();
					await browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(await newValue1).to.equal('Durian');
					await picker.self.click();
					await browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(await newValue2).to.equal('Apple');
				});
			});
		});
	});

	describe('vertical', function () {
		describe('default', function () {
			const picker = Page.components.pickerVertical;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', async function () {
					await picker.focus();
					expect(await picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					await Page.spotlightDown();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should change the value backward when decrementing the picker', async function () {
					await picker.focus();
					expect(await picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					await Page.spotlightDown();
					expect(await picker.incrementerVertical(picker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', async function () {
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should decrease the value when decrementing the picker', async function () {
					await picker.incrementerVertical(picker.self).click();
					await picker.decrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});

				it('should not increase the value when incrementing the picker and current value is equal to max', async function () {
					await picker.incrementerVertical(picker.self).click();
					await picker.incrementerVertical(picker.self).click();
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(await newValue1).to.equal('Durian');
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(await newValue2).to.equal('Durian');
				});

				it('should not decrease the value when decrementing the picker and current value is equal to min', async function () {
					await picker.decrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});
			});
		});

		describe('disabled', function () {
			const picker = Page.components.pickerDisabledVertical;

			describe('5-way', function () {
				it('should not update on select', async function () {
					await picker.focus();
					expect(await picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					const oldValue = extractValue(picker);
					await Page.spotlightSelect();
					await picker.focus();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal(await oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', async function () {
					const oldValue = extractValue(picker);
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal(await oldValue);
				});

				it('should not decrease the value when clicking the decrementer', async function () {
					const oldValue = extractValue(picker);
					await picker.decrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal(await oldValue);
				});
			});
		});

		describe('wrap', function () {
			const picker = Page.components.pickerWrapVertical;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', async function () {
					await picker.focus();
					expect(await picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					await Page.spotlightDown();
					expect(await picker.incrementerVertical(picker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should change the value backward when decrementing the picker', async function () {
					await picker.focus();
					expect(await picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					await Page.spotlightDown();
					expect(await picker.incrementerVertical(picker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					expect(await picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					await Page.spotlightSelect();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', async function () {
					await picker.incrementerVertical(picker.self).click();
					expect(await picker.incrementerVertical(picker.self).isFocused()).to.be.true();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should decrease the value when decrementing the picker', async function () {
					await picker.incrementerVertical(picker.self).click();
					expect(await picker.incrementerVertical(picker.self).isFocused()).to.be.true();
					await picker.decrementerVertical(picker.self).click();
					expect(await picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});

				it('should wrap value when incrementing the picker and current value is equal to max', async function () {
					await picker.incrementerVertical(picker.self).click();
					await picker.incrementerVertical(picker.self).click();
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(await newValue1).to.equal('Durian');
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(await newValue2).to.equal('Apple');
				});

				it('should wrap the value when decrementing the picker and current value is equal to min', async function () {
					await picker.decrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Durian');
				});
			});
		});

		describe('joined', function () {
			const picker = Page.components.pickerJoinedVertical;

			describe('5-way', function () {
				it('should increase the value on 5-way up', async function () {
					await picker.focusJoined();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should decrease the value on 5-way down', async function () {
					await picker.focusJoined();
					await Page.spotlightDown();
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});

				it('should not increase the value on 5-way up when current value is equal to max', async function () {
					await picker.focusJoined();
					await Page.spotlightDown();
					await Page.spotlightDown();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(await newValue1).to.equal('Durian');
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(await newValue2).to.equal('Durian');
				});

				it('should not decrease the value on 5-way down when current value is equal to min', async function () {
					await picker.focusJoined();
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when on incrementer click', async function () {
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should decrease the value when on decrementer click', async function () {
					await picker.incrementerVertical(picker.self).click();
					await picker.decrementerVertical(picker.self).click();
					await picker.decrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});

				it('should not increase the value when incrementing the picker and current value is equal to max', async function () {
					await picker.incrementerVertical(picker.self).click();
					await picker.incrementerVertical(picker.self).click();
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(await newValue1).to.equal('Durian');
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(await newValue2).to.equal('Durian');
				});

				it('should not decrease the value when decrementing the picker and current value is equal to min', async function () {
					await picker.decrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});
			});
		});

		describe('wrap joined', function () {
			const picker = Page.components.pickerVerticalWrapJoined;

			describe('5-way', function () {
				it('should increase the value on 5-way up', async function () {
					await picker.focusJoined();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should decrease the value on 5-way down', async function () {
					await picker.focusJoined();
					await Page.spotlightDown();
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});

				it('should wrap the value on 5-way up when current value is equal to max', async function () {
					await picker.focusJoined();
					await Page.spotlightDown();
					await Page.spotlightDown();
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(await newValue1).to.equal('Durian');
					await Page.spotlightDown();
					await browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(await newValue2).to.equal('Apple');
				});

				it('should wrap the value on 5-way down when current value is equal to min', async function () {
					await picker.focusJoined();
					await Page.spotlightUp();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Durian');
				});
			});

			describe('pointer', function () {
				it('should increase the value when on incrementer click', async function () {
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Banana');
				});

				it('should decrease the value when on decrementer click', async function () {
					await picker.incrementerVertical(picker.self).click();
					await picker.decrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Apple');
				});

				it('should wrap the value when incrementing the picker and current value is equal to max', async function () {
					await picker.incrementerVertical(picker.self).click();
					await picker.incrementerVertical(picker.self).click();
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(await newValue1).to.equal('Durian');
					await picker.incrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(await newValue2).to.equal('Apple');
				});

				it('should wrap the value when decrementing the picker and current value is equal to min', async function () {
					await picker.decrementerVertical(picker.self).click();
					await browser.pause(500);
					const newValue = extractValue(picker);
					expect(await newValue).to.equal('Durian');
				});
			});
		});
	});
});
