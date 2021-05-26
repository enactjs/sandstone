const Page = require('./PickerPage');
const {extractValue} = require('./Picker-utils.js');

describe('Picker', function () {
	beforeEach(function () {
		Page.open();
	});

	describe('horizontal', function () {
		describe('default', function () {
			const picker = Page.components.pickerDefault;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', function () {
					expect(picker.incrementer(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should change the value backward when decrementing the picker', function () {
					expect(picker.incrementer(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					Page.spotlightLeft();
					expect(picker.decrementer(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', function () {
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should decrease the value when decrementing the picker', function () {
					picker.incrementer(picker.self).click();
					expect(picker.incrementer(picker.self).isFocused()).to.be.true();
					picker.decrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});

				it('should not change the value of the picker forward when the current value is the last', function () {
					picker.incrementer(picker.self).click();
					picker.incrementer(picker.self).click();
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(newValue1).to.equal('Durian');
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(newValue2).to.equal('Durian');
				});

				it('should not change the value backwards when the current value is the first', function () {
					picker.decrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `Banana`
			const picker = Page.components.pickerWithDefaultValue;

			it('should have the default value selected', function () {
				const newValue = extractValue(picker);
				expect(newValue).to.equal('Banana');
			});
		});

		describe('disabled', function () {
			const picker = Page.components.pickerDisabled;

			describe('5-way', function () {
				it('should not update on select', function () {
					picker.focus();
					expect(picker.incrementer(picker.self).isFocused()).to.be.true();
					const oldValue = extractValue(picker);
					Page.spotlightSelect();
					picker.focus();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});
			});

			describe('pointer', function () {
				it('should not change the value forward when clicking the incrementer', function () {
					const oldValue = extractValue(picker);
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});

				it('should not change the value backward when clicking the decrementer', function () {
					const oldValue = extractValue(picker);
					picker.decrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});
			});
		});

		describe('wrap', function () {
			const picker = Page.components.pickerWrap;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', function () {
					picker.focus();
					expect(picker.incrementer(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should change the value backward when decrementing the picker', function () {
					picker.focus();
					Page.spotlightSelect();
					Page.spotlightLeft();
					expect(picker.decrementer(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', function () {
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should decrease the value when decrementing the picker', function () {
					picker.incrementer(picker.self).click();
					expect(picker.incrementer(picker.self).isFocused()).to.be.true();
					picker.decrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});

				it('should wrap value when incrementing the picker and current value is the last', function () {
					picker.incrementer(picker.self).click();
					picker.incrementer(picker.self).click();
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(newValue1).to.equal('Durian');
					picker.incrementer(picker.self).click();
					browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(newValue2).to.equal('Apple');
				});

				it('should wrap the value when decrementing the picker and current value is the first', function () {
					picker.decrementer(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Durian');
				});
			});
		});

		describe('joined', function () {
			const picker = Page.components.pickerJoined;

			describe('5-way', function () {
				it('should increase the value on 5-way select', function () {
					picker.focusJoined();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});
			});

			describe('pointer', function () {
				it('should increase the value when on click', function () {
					picker.self.click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should wrap the value when current value is equal to max', function () {
					picker.self.click();
					picker.self.click();
					picker.self.click();
					browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(newValue1).to.equal('Durian');
					picker.self.click();
					browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(newValue2).to.equal('Apple');
				});
			});
		});
	});

	describe('vertical', function () {
		describe('default', function () {
			const picker = Page.components.pickerVertical;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', function () {
					picker.focus();
					expect(picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					Page.spotlightDown();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should change the value backward when decrementing the picker', function () {
					picker.focus();
					expect(picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					Page.spotlightDown();
					expect(picker.incrementerVertical(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					Page.spotlightUp();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', function () {
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should decrease the value when decrementing the picker', function () {
					picker.incrementerVertical(picker.self).click();
					picker.decrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});

				it('should not increase the value when incrementing the picker and current value is equal to max', function () {
					picker.incrementerVertical(picker.self).click();
					picker.incrementerVertical(picker.self).click();
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(newValue1).to.equal('Durian');
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(newValue2).to.equal('Durian');
				});

				it('should not decrease the value when decrementing the picker and current value is equal to min', function () {
					picker.decrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});
		});

		describe('disabled', function () {
			const picker = Page.components.pickerDisabledVertical;

			describe('5-way', function () {
				it('should not update on select', function () {
					picker.focus();
					expect(picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					const oldValue = extractValue(picker);
					Page.spotlightSelect();
					picker.focus();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});
			});

			describe('pointer', function () {
				it('should not increase the value when clicking the incrementer', function () {
					const oldValue = extractValue(picker);
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});

				it('should not decrease the value when clicking the decrementer', function () {
					const oldValue = extractValue(picker);
					picker.decrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal(oldValue);
				});
			});
		});

		describe('wrap', function () {
			const picker = Page.components.pickerWrapVertical;

			describe('5-way', function () {
				it('should change the value forward when incrementing the picker', function () {
					picker.focus();
					expect(picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					Page.spotlightDown();
					expect(picker.incrementerVertical(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should change the value backward when decrementing the picker', function () {
					picker.focus();
					expect(picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					Page.spotlightDown();
					expect(picker.incrementerVertical(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					Page.spotlightUp();
					expect(picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					Page.spotlightSelect();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when incrementing the picker', function () {
					picker.incrementerVertical(picker.self).click();
					expect(picker.incrementerVertical(picker.self).isFocused()).to.be.true();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should decrease the value when decrementing the picker', function () {
					picker.incrementerVertical(picker.self).click();
					expect(picker.incrementerVertical(picker.self).isFocused()).to.be.true();
					picker.decrementerVertical(picker.self).click();
					expect(picker.decrementerVertical(picker.self).isFocused()).to.be.true();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});

				it('should wrap value when incrementing the picker and current value is equal to max', function () {
					picker.incrementerVertical(picker.self).click();
					picker.incrementerVertical(picker.self).click();
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(newValue1).to.equal('Durian');
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(newValue2).to.equal('Apple');
				});

				it('should wrap the value when decrementing the picker and current value is equal to min', function () {
					picker.decrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Durian');
				});
			});
		});

		describe('joined', function () {
			const picker = Page.components.pickerJoinedVertical;

			describe('5-way', function () {
				it('should increase the value on 5-way up', function () {
					picker.focusJoined();
					Page.spotlightDown();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should decrease the value on 5-way down', function () {
					picker.focusJoined();
					Page.spotlightDown();
					Page.spotlightUp();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});

				it('should not increase the value on 5-way up when current value is equal to max', function () {
					picker.focusJoined();
					Page.spotlightDown();
					Page.spotlightDown();
					Page.spotlightDown();
					browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(newValue1).to.equal('Durian');
					Page.spotlightDown();
					browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(newValue2).to.equal('Durian');
				});

				it('should not decrease the value on 5-way down when current value is equal to min', function () {
					picker.focusJoined();
					Page.spotlightUp();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});

			describe('pointer', function () {
				it('should increase the value when on incrementer click', function () {
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should decrease the value when on decrementer click', function () {
					picker.incrementerVertical(picker.self).click();
					picker.decrementerVertical(picker.self).click();
					picker.decrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});

				it('should not increase the value when incrementing the picker and current value is equal to max', function () {
					picker.incrementerVertical(picker.self).click();
					picker.incrementerVertical(picker.self).click();
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(newValue1).to.equal('Durian');
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(newValue2).to.equal('Durian');
				});

				it('should not decrease the value when decrementing the picker and current value is equal to min', function () {
					picker.decrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});
			});
		});

		describe('wrap joined', function () {
			const picker = Page.components.pickerVerticalWrapJoined;

			describe('5-way', function () {
				it('should increase the value on 5-way up', function () {
					picker.focusJoined();
					Page.spotlightDown();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should decrease the value on 5-way down', function () {
					picker.focusJoined();
					Page.spotlightDown();
					Page.spotlightUp();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});

				it('should wrap the value on 5-way up when current value is equal to max', function () {
					picker.focusJoined();
					Page.spotlightDown();
					Page.spotlightDown();
					Page.spotlightDown();
					browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(newValue1).to.equal('Durian');
					Page.spotlightDown();
					browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(newValue2).to.equal('Apple');
				});

				it('should wrap the value on 5-way down when current value is equal to min', function () {
					picker.focusJoined();
					Page.spotlightUp();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Durian');
				});
			});

			describe('pointer', function () {
				it('should increase the value when on incrementer click', function () {
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Banana');
				});

				it('should decrease the value when on decrementer click', function () {
					picker.incrementerVertical(picker.self).click();
					picker.decrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Apple');
				});

				it('should wrap the value when incrementing the picker and current value is equal to max', function () {
					picker.incrementerVertical(picker.self).click();
					picker.incrementerVertical(picker.self).click();
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue1 = extractValue(picker);
					expect(newValue1).to.equal('Durian');
					picker.incrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue2 = extractValue(picker);
					expect(newValue2).to.equal('Apple');
				});

				it('should wrap the value when decrementing the picker and current value is equal to min', function () {
					picker.decrementerVertical(picker.self).click();
					browser.pause(500);
					const newValue = extractValue(picker);
					expect(newValue).to.equal('Durian');
				});
			});
		});
	});
});
