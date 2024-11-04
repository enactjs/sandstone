const Page = require('./PickerPage');
const {extractValue} = require('./Picker-utils.js');

describe('Picker', function () {
	beforeEach(async function () {
		await Page.open();
	});

	describe('touch tests', function () {
		const picker = Page.components.pickerDefault;

		it('touch', async function () {
			await browser.action('pointer', {
				parameters: { pointerType: 'touch' } // "mouse" is default value, also possible: "pen" or "touch"
			})
				.move({origin: picker.incrementer(picker.self)})
				.down()
				.perform();
			await browser.pause(500);
			await browser.action('pointer', {
				parameters: { pointerType: 'touch' } // "mouse" is default value, also possible: "pen" or "touch"
			})
				.move({origin: picker.decrementer(picker.self)})
				.down()
				.perform();
			await browser.pause(500);
		});
	});

	// describe('horizontal', function () {
	// 	describe('default', function () {
	// 		const picker = Page.components.pickerDefault;
	//
	// 		describe('5-way', function () {
	// 			it('should change the value forward when incrementing the picker', async function () {
	// 				expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightSelect();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should change the value backward when decrementing the picker [QWTC-2209]', async function () {
	// 				expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightSelect();
	// 				await Page.spotlightLeft();
	// 				expect(await picker.decrementer(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightSelect();
	// 				await browser.pause(500);
	// 				const newValue = await extractValue(picker);
	// 				expect(newValue).toBe('Apple');
	// 			});
	// 		});
	//
	// 		describe('pointer', function () {
	// 			it('should increase the value when incrementing the picker', async function () {
	// 				await picker.incrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should decrease the value when decrementing the picker', async function () {
	// 				await picker.incrementer(picker.self).click();
	// 				expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
	// 				await picker.decrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = await extractValue(picker);
	// 				expect(newValue).toBe('Apple');
	// 			});
	//
	// 			it('should not change the value of the picker forward when the current value is the last', async function () {
	// 				await picker.incrementer(picker.self).click();
	// 				await picker.incrementer(picker.self).click();
	// 				await picker.incrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue1 = await extractValue(picker);
	// 				expect(newValue1).toBe('Durian');
	// 				await picker.incrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue2 = await extractValue(picker);
	// 				expect(newValue2).toBe('Durian');
	// 			});
	//
	// 			it('should not change the value backwards when the current value is the first', async function () {
	// 				await picker.decrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = await extractValue(picker);
	// 				expect(newValue).toBe('Apple');
	// 			});
	// 		});
	// 	});
	//
	// 	describe('with defaultValue', function () {
	// 		// supplied value is `Banana`
	// 		const picker = Page.components.pickerWithDefaultValue;
	//
	// 		it('should have the default value selected', async function () {
	// 			const newValue = extractValue(picker);
	// 			expect(await newValue).toBe('Banana');
	// 		});
	// 	});
	//
	// 	describe('disabled', function () {
	// 		const picker = Page.components.pickerDisabled;
	//
	// 		describe('5-way', function () {
	// 			it('should not update on select', async function () {
	// 				const oldValue = extractValue(picker);
	// 				await Page.spotlightSelect();
	// 				await picker.focus();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe(await oldValue);
	// 			});
	// 		});
	//
	// 		describe('pointer', function () {
	// 			it('should not change the value forward when clicking the incrementer', async function () {
	// 				const oldValue = extractValue(picker);
	// 				await picker.incrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe(await oldValue);
	// 			});
	//
	// 			it('should not change the value backward when clicking the decrementer', async function () {
	// 				const oldValue = extractValue(picker);
	// 				await picker.decrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe(await oldValue);
	// 			});
	// 		});
	// 	});
	//
	// 	describe('wrap', function () {
	// 		const picker = Page.components.pickerWrap;
	//
	// 		describe('5-way', function () {
	// 			it('should change the value forward when incrementing the picker', async function () {
	// 				await picker.focus();
	// 				expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightSelect();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should change the value backward when decrementing the picker', async function () {
	// 				await picker.focus();
	// 				await Page.spotlightSelect();
	// 				await Page.spotlightLeft();
	// 				expect(await picker.decrementer(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightSelect();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	// 		});
	//
	// 		describe('pointer', function () {
	// 			it('should increase the value when incrementing the picker', async function () {
	// 				await picker.incrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should decrease the value when decrementing the picker', async function () {
	// 				await picker.incrementer(picker.self).click();
	// 				expect(await picker.incrementer(picker.self).isFocused()).toBe(true);
	// 				await picker.decrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	//
	// 			it('should wrap value when incrementing the picker and current value is the last', async function () {
	// 				await picker.incrementer(picker.self).click();
	// 				await picker.incrementer(picker.self).click();
	// 				await picker.incrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue1 = extractValue(picker);
	// 				expect(await newValue1).toBe('Durian');
	// 				await picker.incrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue2 = extractValue(picker);
	// 				expect(await newValue2).toBe('Apple');
	// 			});
	//
	// 			it('should wrap the value when decrementing the picker and current value is the first', async function () {
	// 				await picker.decrementer(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Durian');
	// 			});
	// 		});
	// 	});
	//
	// 	describe('joined', function () {
	// 		const picker = Page.components.pickerJoined;
	// 		const pickerJoinedChangedByArrow = Page.components.pickerJoinedChangedByArrow;
	//
	// 		describe('5-way', function () {
	// 			it('should increase the value on 5-way select', async function () {
	// 				await picker.focusJoined();
	// 				await Page.spotlightSelect();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should increase the value on 5-way right', async function () {
	// 				await pickerJoinedChangedByArrow.focusJoined();
	// 				await Page.spotlightRight();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(pickerJoinedChangedByArrow);
	// 				await browser.pause(500);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should decrease the value on 5-way left', async function () {
	// 				await pickerJoinedChangedByArrow.focusJoined();
	// 				await Page.spotlightLeft();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(pickerJoinedChangedByArrow);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	// 		});
	//
	// 		describe('pointer', function () {
	// 			it('should increase the value when on click', async function () {
	// 				await picker.self.click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should wrap the value when current value is equal to max', async function () {
	// 				await picker.self.click();
	// 				await picker.self.click();
	// 				await picker.self.click();
	// 				await browser.pause(500);
	// 				const newValue1 = extractValue(picker);
	// 				expect(await newValue1).toBe('Durian');
	// 				await picker.self.click();
	// 				await browser.pause(500);
	// 				const newValue2 = extractValue(picker);
	// 				expect(await newValue2).toBe('Apple');
	// 			});
	// 		});
	// 	});
	// });
	//
	// describe('vertical', function () {
	// 	describe('default', function () {
	// 		const picker = Page.components.pickerVertical;
	//
	// 		describe('5-way', function () {
	// 			it('should change the value forward when incrementing the picker', async function () {
	// 				await picker.focus();
	// 				expect(await picker.decrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightDown();
	// 				await Page.spotlightSelect();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should change the value backward when decrementing the picker', async function () {
	// 				await picker.focus();
	// 				expect(await picker.decrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightDown();
	// 				expect(await picker.incrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightSelect();
	// 				await Page.spotlightUp();
	// 				await Page.spotlightSelect();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	// 		});
	//
	// 		describe('pointer', function () {
	// 			it('should increase the value when incrementing the picker', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should decrease the value when decrementing the picker', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.decrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	//
	// 			it('should not increase the value when incrementing the picker and current value is equal to max', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue1 = extractValue(picker);
	// 				expect(await newValue1).toBe('Durian');
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue2 = extractValue(picker);
	// 				expect(await newValue2).toBe('Durian');
	// 			});
	//
	// 			it('should not decrease the value when decrementing the picker and current value is equal to min', async function () {
	// 				await picker.decrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	// 		});
	// 	});
	//
	// 	describe('disabled', function () {
	// 		const picker = Page.components.pickerDisabledVertical;
	//
	// 		describe('5-way', function () {
	// 			it('should not update on select', async function () {
	// 				await picker.focus();
	// 				expect(await picker.decrementerVertical(picker.self).isFocused()).toBe(true);
	// 				const oldValue = extractValue(picker);
	// 				await Page.spotlightSelect();
	// 				await picker.focus();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe(await oldValue);
	// 			});
	// 		});
	//
	// 		describe('pointer', function () {
	// 			it('should not increase the value when clicking the incrementer', async function () {
	// 				const oldValue = extractValue(picker);
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe(await oldValue);
	// 			});
	//
	// 			it('should not decrease the value when clicking the decrementer', async function () {
	// 				const oldValue = extractValue(picker);
	// 				await picker.decrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe(await oldValue);
	// 			});
	// 		});
	// 	});
	//
	// 	describe('wrap', function () {
	// 		const picker = Page.components.pickerWrapVertical;
	//
	// 		describe('5-way', function () {
	// 			it('should change the value forward when incrementing the picker', async function () {
	// 				await picker.focus();
	// 				expect(await picker.decrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightDown();
	// 				expect(await picker.incrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightSelect();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should change the value backward when decrementing the picker', async function () {
	// 				await picker.focus();
	// 				expect(await picker.decrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightDown();
	// 				expect(await picker.incrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightSelect();
	// 				await Page.spotlightUp();
	// 				expect(await picker.decrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await Page.spotlightSelect();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	// 		});
	//
	// 		describe('pointer', function () {
	// 			it('should increase the value when incrementing the picker', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				expect(await picker.incrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should decrease the value when decrementing the picker', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				expect(await picker.incrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await picker.decrementerVertical(picker.self).click();
	// 				expect(await picker.decrementerVertical(picker.self).isFocused()).toBe(true);
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	//
	// 			it('should wrap value when incrementing the picker and current value is equal to max', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue1 = extractValue(picker);
	// 				expect(await newValue1).toBe('Durian');
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue2 = extractValue(picker);
	// 				expect(await newValue2).toBe('Apple');
	// 			});
	//
	// 			it('should wrap the value when decrementing the picker and current value is equal to min', async function () {
	// 				await picker.decrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Durian');
	// 			});
	// 		});
	// 	});
	//
	// 	describe('joined', function () {
	// 		const picker = Page.components.pickerJoinedVertical;
	//
	// 		describe('5-way', function () {
	// 			it('should increase the value on 5-way up', async function () {
	// 				await picker.focusJoined();
	// 				await Page.spotlightDown();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should decrease the value on 5-way down', async function () {
	// 				await picker.focusJoined();
	// 				await Page.spotlightDown();
	// 				await Page.spotlightUp();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	//
	// 			it('should not increase the value on 5-way up when current value is equal to max', async function () {
	// 				await picker.focusJoined();
	// 				await Page.spotlightDown();
	// 				await Page.spotlightDown();
	// 				await Page.spotlightDown();
	// 				await browser.pause(500);
	// 				const newValue1 = extractValue(picker);
	// 				expect(await newValue1).toBe('Durian');
	// 				await Page.spotlightDown();
	// 				await browser.pause(500);
	// 				const newValue2 = extractValue(picker);
	// 				expect(await newValue2).toBe('Durian');
	// 			});
	//
	// 			it('should not decrease the value on 5-way down when current value is equal to min', async function () {
	// 				await picker.focusJoined();
	// 				await Page.spotlightUp();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	// 		});
	//
	// 		describe('pointer', function () {
	// 			it('should increase the value when on incrementer click', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should decrease the value when on decrementer click', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.decrementerVertical(picker.self).click();
	// 				await picker.decrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	//
	// 			it('should not increase the value when incrementing the picker and current value is equal to max', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue1 = extractValue(picker);
	// 				expect(await newValue1).toBe('Durian');
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue2 = extractValue(picker);
	// 				expect(await newValue2).toBe('Durian');
	// 			});
	//
	// 			it('should not decrease the value when decrementing the picker and current value is equal to min', async function () {
	// 				await picker.decrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	// 		});
	// 	});
	//
	// 	describe('wrap joined', function () {
	// 		const picker = Page.components.pickerVerticalWrapJoined;
	//
	// 		describe('5-way', function () {
	// 			it('should increase the value on 5-way up', async function () {
	// 				await picker.focusJoined();
	// 				await Page.spotlightDown();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should decrease the value on 5-way down', async function () {
	// 				await picker.focusJoined();
	// 				await Page.spotlightDown();
	// 				await Page.spotlightUp();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	//
	// 			it('should wrap the value on 5-way up when current value is equal to max', async function () {
	// 				await picker.focusJoined();
	// 				await Page.spotlightDown();
	// 				await Page.spotlightDown();
	// 				await Page.spotlightDown();
	// 				await browser.pause(500);
	// 				const newValue1 = extractValue(picker);
	// 				expect(await newValue1).toBe('Durian');
	// 				await Page.spotlightDown();
	// 				await browser.pause(500);
	// 				const newValue2 = extractValue(picker);
	// 				expect(await newValue2).toBe('Apple');
	// 			});
	//
	// 			it('should wrap the value on 5-way down when current value is equal to min', async function () {
	// 				await picker.focusJoined();
	// 				await Page.spotlightUp();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Durian');
	// 			});
	// 		});
	//
	// 		describe('pointer', function () {
	// 			it('should increase the value when on incrementer click', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Banana');
	// 			});
	//
	// 			it('should decrease the value when on decrementer click', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.decrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Apple');
	// 			});
	//
	// 			it('should wrap the value when incrementing the picker and current value is equal to max', async function () {
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue1 = extractValue(picker);
	// 				expect(await newValue1).toBe('Durian');
	// 				await picker.incrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue2 = extractValue(picker);
	// 				expect(await newValue2).toBe('Apple');
	// 			});
	//
	// 			it('should wrap the value when decrementing the picker and current value is equal to min', async function () {
	// 				await picker.decrementerVertical(picker.self).click();
	// 				await browser.pause(500);
	// 				const newValue = extractValue(picker);
	// 				expect(await newValue).toBe('Durian');
	// 			});
	// 		});
	// 	});
	// });
});
