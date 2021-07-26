const Page = require('./SliderPage');

describe('Slider', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const slider = Page.components.sliderDefault;

			describe('5-way', function () {
				it('should increment the value of horizontal slider on arrow right key when active', function () {
					expect(slider.self.isFocused()).to.be.true();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightSelect();
					Page.spotlightRight();
					// expect knob `left` css prop to be bigger than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue).to.be.above(originalValue);
				});

				it('should decrement the value of horizontal slider on arrow left key when active', function () {
					expect(slider.self.isFocused()).to.be.true();
					Page.spotlightSelect();
					Page.spotlightRight();
					Page.spotlightRight();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightLeft();
					// expect knob `left` css prop to be smaller than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue).to.be.below(originalValue);
				});
			});

			describe('pointer', function () {
				it('should change the value of horizontal slider on slider click at position', function () {
					expect(slider.self.isFocused()).to.be.true();
					const originalValue = slider.knobPositionHorizontal;
					slider.self.click();
					// expect knob `left` css prop to be bigger than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue).to.be.above(originalValue);
				});
			});
		});

		describe('with `activateOnSelect`', function () {
			const slider = Page.components.sliderActivateOnSelect;

			describe('5-way', function () {
				it('should not activate without select and cannot increment the value', function () {
					slider.focus();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightRight();
					// expect knob `left` css prop to be bigger than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue).to.equal(originalValue);
				});

				it('should not activate without select and cannot decrement the value', function () {
					slider.focus();
					Page.spotlightRight();
					Page.spotlightRight();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightLeft();
					// expect knob `left` css prop to be smaller than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue).to.equal(originalValue);
				});
				it('should activate on select and can increment the value', function () {
					slider.focus();
					Page.spotlightSelect();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightRight();
					// expect knob `left` css prop to be bigger than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue).to.be.above(originalValue);
				});

				it('should activate on select and can decrement the value', function () {
					slider.focus();
					Page.spotlightSelect();
					Page.spotlightRight();
					Page.spotlightRight();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightLeft();
					// expect knob `left` css prop to be smaller than original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue).to.be.below(originalValue);
				});
			});
		});

		describe('with custom `progressAnchor`', function () {
			const slider = Page.components.sliderCustomProgressAnchor;

			it('fill bar should be greater than 0 when value is at minimum', function () {
				slider.focus();
				expect(slider.sliderFillWidth).to.be.above(0);
			});
		});

		describe('vertical slider', function () {
			const slider = Page.components.sliderVertical;

			describe('5-way', function () {
				it('should increment the value of vertical slider on arrow up key when active', function () {
					slider.focus();
					const originalValue = slider.knobPositionVertical;
					Page.spotlightSelect();
					Page.spotlightUp();
					Page.spotlightUp();
					// expect knob `bottom` css prop to be greater than original one
					const newValue = slider.knobPositionVertical;
					expect(newValue).to.be.above(originalValue);
				});

				it('should decrement the value of vertical slider on arrow down key when active', function () {
					slider.focus();
					Page.spotlightSelect();
					Page.spotlightUp();
					const originalValue = slider.knobPositionVertical;
					Page.spotlightDown();
					// expect knob `bottom` css prop to be less than original one
					const newValue = slider.knobPositionVertical;
					expect(newValue).to.be.below(originalValue);
				});
			});

			describe('pointer', function () {
				it('should change the value of horizontal slider on slider click at position', function () {
					slider.focus();
					const originalValue = slider.knobPositionVertical;
					slider.self.click();
					// expect knob `left` css prop to be greater than original one
					const newValue = slider.knobPositionVertical;
					expect(newValue).to.be.above(originalValue);
				});
			});
		});

		describe('disabled', function () {
			const slider = Page.components.sliderDisabled;

			describe('5-way', function () {
				it('should not increment the value of horizontal disabled slider on arrow right key when active', function () {
					slider.focus();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightSelect();
					Page.spotlightRight();
					// expect knob `left` css prop to be equal to original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue).to.equal(originalValue);
				});

				it('should not decrement the value of horizontal disabled slider on arrow left key when active', function () {
					slider.focus();
					Page.spotlightSelect();
					Page.spotlightRight();
					Page.spotlightRight();
					const originalValue = slider.knobPositionHorizontal;
					Page.spotlightLeft();
					// expect knob `left` css prop to be equal to original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue).to.equal(originalValue);
				});
			});

			describe('pointer', function () {
				it('should not change the value of horizontal disabled slider on slider click at position', function () {
					slider.focus();
					Page.delay(300);
					const originalValue = slider.knobPositionHorizontal;
					slider.self.click();
					// expect knob `left` css prop to be equal to original one
					const newValue = slider.knobPositionHorizontal;
					expect(newValue).to.equal(originalValue);
				});
			});
		});

		describe('vertical disabled slider', function () {
			const slider = Page.components.sliderVerticalDisabled;

			describe('5-way', function () {
				it('should not increment the value of vertical disabled slider on arrow down key when active', function () {
					slider.focus();
					const originalValue = slider.knobPositionVertical;
					Page.spotlightSelect();
					Page.spotlightUp();
					Page.spotlightUp();
					// expect knob `bottom` css prop to be equal to original one
					const newValue = slider.knobPositionVertical;
					expect(newValue).to.equal(originalValue);
				});

				it('should not decrement the value of vertical disabled slider on arrow up key when active', function () {
					slider.focus();
					Page.spotlightSelect();
					Page.spotlightUp();
					const originalValue = slider.knobPositionVertical;
					Page.spotlightDown();
					// expect knob `bottom` css prop to be equal to original one
					const newValue = slider.knobPositionVertical;
					expect(newValue).to.equal(originalValue);
				});
			});

			describe('pointer', function () {
				it('should not change the value of vertical disabled slider on slider click at position', function () {
					slider.focus();
					Page.delay(300);
					const originalValue = slider.knobPositionVertical;
					slider.self.click();
					// expect knob `left` css prop to be equal to original one
					const newValue = slider.knobPositionVertical;
					expect(newValue).to.equal(originalValue);
				});
			});
		});
	});
});
