// const Page = require('./SliderPage');
import Page from './SliderPage.js';

describe('Slider', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const slider = Page.components.sliderDefault;

			describe('5-way', function () {
				it('should increment the value of horizontal slider on arrow right key when active', async function () {
					expect(await slider.self.isFocused()).to.be.true();
					const originalValue = await slider.knobPositionHorizontal();
					await Page.spotlightSelect();
					await Page.spotlightRight();
					// expect knob `left` css prop to be bigger than original one
					const newValue = await slider.knobPositionHorizontal();
					expect(newValue).to.be.above(originalValue);
				});

				it('should decrement the value of horizontal slider on arrow left key when active', async function () {
					expect(await slider.self.isFocused()).to.be.true();
					await Page.spotlightSelect();
					await Page.spotlightRight();
					await Page.spotlightRight();
					const originalValue = await slider.knobPositionHorizontal();
					await Page.spotlightLeft();
					// expect knob `left` css prop to be smaller than original one
					const newValue = await slider.knobPositionHorizontal();
					expect(newValue).to.be.below(originalValue);
				});
			});

			describe('pointer', function () {
				it('should change the value of horizontal slider on slider click at position', async function () {
					expect(await slider.self.isFocused()).to.be.true();
					const originalValue = await slider.knobPositionHorizontal();
					await slider.self.click();
					// expect knob `left` css prop to be bigger than original one
					const newValue = await slider.knobPositionHorizontal();
					expect(newValue).to.be.above(originalValue);
				});
			});
		});

		describe('with `activateOnSelect`', function () {
			const slider = Page.components.sliderActivateOnSelect;

			describe('5-way', function () {
				it('should not activate without select and cannot increment the value', async function () {
					await slider.focus();
					const originalValue = await slider.knobPositionHorizontal();
					await Page.spotlightRight();
					// expect knob `left` css prop to be bigger than original one
					const newValue = await slider.knobPositionHorizontal();
					expect(newValue).to.equal(originalValue);
				});

				it('should not activate without select and cannot decrement the value', async function () {
					await slider.focus();
					await Page.spotlightRight();
					await Page.spotlightRight();
					const originalValue = await slider.knobPositionHorizontal();
					await Page.spotlightLeft();
					// expect knob `left` css prop to be smaller than original one
					const newValue = await slider.knobPositionHorizontal();
					expect(newValue).to.equal(originalValue);
				});
				it('should activate on select and can increment the value', async function () {
					await slider.focus();
					await Page.spotlightSelect();
					const originalValue = await slider.knobPositionHorizontal();
					await Page.spotlightRight();
					// expect knob `left` css prop to be bigger than original one
					const newValue = await slider.knobPositionHorizontal();
					expect(newValue).to.be.above(originalValue);
				});

				it('should activate on select and can decrement the value', async function () {
					await slider.focus();
					await Page.spotlightSelect();
					await Page.spotlightRight();
					await Page.spotlightRight();
					const originalValue = await slider.knobPositionHorizontal();
					await Page.spotlightLeft();
					// expect knob `left` css prop to be smaller than original one
					const newValue = await slider.knobPositionHorizontal();
					expect(newValue).to.be.below(originalValue);
				});
			});
		});

		describe('with custom `progressAnchor`', function () {
			const slider = Page.components.sliderCustomProgressAnchor;

			it('fill bar should be greater than 0 when value is at minimum', async function () {
				await slider.focus();
				expect(await slider.sliderFillWidth()).to.be.above(0);
			});
		});

		describe('vertical slider', function () {
			const slider = Page.components.sliderVertical;

			describe('5-way', function () {
				it('should increment the value of vertical slider on arrow up key when active', async function () {
					await slider.focus();
					const originalValue = await slider.knobPositionVertical();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					await Page.spotlightUp();
					// expect knob `bottom` css prop to be greater than original one
					const newValue = await slider.knobPositionVertical();
					expect(newValue).to.be.above(originalValue);
				});

				it('should decrement the value of vertical slider on arrow down key when active', async function () {
					await slider.focus();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					const originalValue = await slider.knobPositionVertical();
					await Page.spotlightDown();
					// expect knob `bottom` css prop to be less than original one
					const newValue = await slider.knobPositionVertical();
					expect(newValue).to.be.below(originalValue);
				});
			});

			describe('pointer', function () {
				it('should change the value of horizontal slider on slider click at position', async function () {
					await slider.focus();
					const originalValue = await slider.knobPositionVertical();
					await slider.self.click();
					// expect knob `left` css prop to be greater than original one
					const newValue = await slider.knobPositionVertical();
					expect(newValue).to.be.above(originalValue);
				});
			});
		});

		describe('disabled', function () {
			const slider = Page.components.sliderDisabled;

			describe('5-way', function () {
				it('should not increment the value of horizontal disabled slider on arrow right key when active', async function () {
					await slider.focus();
					const originalValue = await slider.knobPositionHorizontal();
					await Page.spotlightSelect();
					await Page.spotlightRight();
					// expect knob `left` css prop to be equal to original one
					const newValue = await slider.knobPositionHorizontal();
					expect(newValue).to.equal(originalValue);
				});

				it('should not decrement the value of horizontal disabled slider on arrow left key when active', async function () {
					await slider.focus();
					await Page.spotlightSelect();
					await Page.spotlightRight();
					await Page.spotlightRight();
					const originalValue = await slider.knobPositionHorizontal();
					await Page.spotlightLeft();
					// expect knob `left` css prop to be equal to original one
					const newValue = await slider.knobPositionHorizontal();
					expect(newValue).to.equal(originalValue);
				});
			});

			describe('pointer', function () {
				it('should not change the value of horizontal disabled slider on slider click at position', async function () {
					await slider.focus();
					await Page.delay(300);
					const originalValue = await slider.knobPositionHorizontal();
					await slider.self.click();
					// expect knob `left` css prop to be equal to original one
					const newValue = await slider.knobPositionHorizontal();
					expect(newValue).to.equal(originalValue);
				});
			});
		});

		describe('vertical disabled slider', function () {
			const slider = Page.components.sliderVerticalDisabled;

			describe('5-way', function () {
				it('should not increment the value of vertical disabled slider on arrow down key when active', async function () {
					await slider.focus();
					const originalValue = await slider.knobPositionVertical();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					await Page.spotlightUp();
					// expect knob `bottom` css prop to be equal to original one
					const newValue = await slider.knobPositionVertical();
					expect(newValue).to.equal(originalValue);
				});

				it('should not decrement the value of vertical disabled slider on arrow up key when active', async function () {
					await slider.focus();
					await Page.spotlightSelect();
					await Page.spotlightUp();
					const originalValue = await slider.knobPositionVertical();
					await Page.spotlightDown();
					// expect knob `bottom` css prop to be equal to original one
					const newValue = await slider.knobPositionVertical();
					expect(newValue).to.equal(originalValue);
				});
			});

			describe('pointer', function () {
				it('should not change the value of vertical disabled slider on slider click at position', async function () {
					await slider.focus();
					await Page.delay(300);
					const originalValue = await slider.knobPositionVertical();
					await slider.self.click();
					// expect knob `left` css prop to be equal to original one
					const newValue = await slider.knobPositionVertical();
					expect(newValue).to.equal(originalValue);
				});
			});
		});
	});
});
