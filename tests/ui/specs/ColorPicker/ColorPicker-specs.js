const Page = require('./ColorPickerPage');

describe('ColorPicker', function () {
	beforeEach(async function () {
		await Page.open();
	});

	const colorPicker = Page.components.colorPicker;

	describe('ColorPicker Grid', function () {
		describe('5-way', function () {
			it('should change selectedColor with 5-way keys', async function () {
				// read background color of forth color block form first colors column
				const colorBlockStyle = await (await colorPicker.colorBlock())[3].getAttribute('style');
				const colorBlockBgColor = colorBlockStyle.split(';')[0];
				// Spot forth block from first colors column
				for (let i = 0; i < 4; i++) {
					await Page.spotlightDown();
				}
				await Page.spotlightSelect();

				const selectedColorStyle = await colorPicker.selectedColor.getAttribute('style');
				const selectedColor = selectedColorStyle.split(';')[0];

				expect(colorBlockBgColor).toBe(selectedColor);
			});
		});

		describe('pointer', function () {
			it('should change selectedColor after clicking a color block', async function () {
				const colorBlockStyle = await (await colorPicker.colorBlock())[1].getAttribute('style');
				const colorBlockBgColor = colorBlockStyle.split(';')[0];

				await (await colorPicker.colorBlock())[1].click();

				const selectedColorStyle = await colorPicker.selectedColor.getAttribute('style');
				const selectedColor = selectedColorStyle.split(';')[0];

				expect(colorBlockBgColor).toBe(selectedColor);
			});
		});
	});

	describe('ColorPicker Spectrum', function () {
		beforeEach(async () => {
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await browser.pause(500);
		});

		describe('5-way', function () {
			it('should change selected color with 5-way keys', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				for (let i = 0; i < 20; i++) {
					await Page.spotlightDown();
				}
				for (let i = 0; i < 19; i++) {
					await Page.spotlightRight();
				}
				await browser.pause(500);

				const spectrumIndicatorStyle = await colorPicker.spectrumIndicator.getAttribute('style');
				const spectrumIndicator = String(spectrumIndicatorStyle.split(';').filter(attr => attr.includes('background-color'))).trim();
				const selectedColorStyle = await colorPicker.selectedColor.getAttribute('style');
				const selectedColor = String(selectedColorStyle.split(';').filter(attr => attr.includes('background-color'))).trim();

				expect(spectrumIndicator).toBe(selectedColor);
			});
		});

		describe('pointer', function () {
			it('should change color when clicking on the canvas', async function () {
				await (await colorPicker.tabgroupTabs())[1].click();
				const canvas = await colorPicker.canvas;
				await canvas.click();

				const spectrumIndicatorStyle = await colorPicker.spectrumIndicator.getAttribute('style');
				const spectrumIndicator = String(spectrumIndicatorStyle.split(';').filter(attr => attr.includes('background-color'))).trim();
				const selectedColorStyle = await colorPicker.selectedColor.getAttribute('style');
				const selectedColor = String(selectedColorStyle.split(';').filter(attr => attr.includes('background-color'))).trim();

				expect(spectrumIndicator).toBe(selectedColor);
			});

			// TODO: add tests for dragging circle indicator inside canvas
		});
	});

	describe('ColorPicker Sliders', function () {
		beforeEach(async () => {
			await Page.spotlightRight();
			await Page.spotlightRight();
			await Page.spotlightSelect();
			await browser.pause(500);
		});

		describe('RGB Color Picker', function () {
			it('should display Red/Green/Blue labels', async function () {
				const firstSliderLabel = await (await colorPicker.slidersLabel())[0].getText();
				const secondSliderLabel = await (await colorPicker.slidersLabel())[1].getText();
				const thirdSliderLabel = await (await colorPicker.slidersLabel())[2].getText();

				expect(firstSliderLabel).toBe('Red');
				expect(secondSliderLabel).toBe('Green');
				expect(thirdSliderLabel).toBe('Blue');
			});

			describe('5-way', function () {
				it('should change first slider output when changing slider value', async function () {
					await (await colorPicker.sliders())[0].moveTo();
					await Page.spotlightSelect();
					const initialSliderOutput =  await (await colorPicker.slidersOutput())[0].getText();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}
					const currentSliderOutput = await (await colorPicker.slidersOutput())[0].getText();

					expect(initialSliderOutput > currentSliderOutput).toBe(true);
				});

				it('should change the background color of second and third sliders when changing first slider value', async function () {
					const initialSecondSliderBgColor = await (await colorPicker.sliders())[1].getAttribute('style');
					const initialThirdSliderBgColor = await (await colorPicker.sliders())[2].getAttribute('style');
					await (await colorPicker.sliders())[0].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}

					const currentSecondSliderBgColor = await (await colorPicker.sliders())[1].getAttribute('style');
					const currentThirdSliderBgColor = await (await colorPicker.sliders())[2].getAttribute('style');

					expect(initialSecondSliderBgColor).not.toBe(currentSecondSliderBgColor);
					expect(initialThirdSliderBgColor).not.toBe(currentThirdSliderBgColor);
				});

				it('should change selectedColor when changing the value of first slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[0].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});

				it('should change second slider output when changing slider value', async function () {
					await (await colorPicker.sliders())[1].moveTo();
					await Page.spotlightSelect();
					const initialSliderOutput =  await (await colorPicker.slidersOutput())[1].getText();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}
					const currentSliderOutput = await (await colorPicker.slidersOutput())[1].getText();

					expect(initialSliderOutput > currentSliderOutput).toBe(true);
				});

				it('should change the background color of first and third sliders when changing second slider value', async function () {
					const initialSecondSliderBgColor = await (await colorPicker.sliders())[0].getAttribute('style');
					const initialThirdSliderBgColor = await (await colorPicker.sliders())[2].getAttribute('style');
					await (await colorPicker.sliders())[1].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}

					const currentSecondSliderBgColor = await (await colorPicker.sliders())[0].getAttribute('style');
					const currentThirdSliderBgColor = await (await colorPicker.sliders())[2].getAttribute('style');

					expect(initialSecondSliderBgColor).not.toBe(currentSecondSliderBgColor);
					expect(initialThirdSliderBgColor).not.toBe(currentThirdSliderBgColor);
				});

				it('should change selectedColor when changing the value of second slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[1].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});

				it('should change third slider output when changing slider value', async function () {
					await (await colorPicker.sliders())[2].moveTo();
					await Page.spotlightSelect();
					const initialSliderOutput =  await (await colorPicker.slidersOutput())[2].getText();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}
					const currentSliderOutput = await (await colorPicker.slidersOutput())[2].getText();

					expect(initialSliderOutput > currentSliderOutput).toBe(true);
				});

				it('should change the background color of first and second sliders when changing third slider value', async function () {
					const initialSecondSliderBgColor = await (await colorPicker.sliders())[0].getAttribute('style');
					const initialThirdSliderBgColor = await (await colorPicker.sliders())[1].getAttribute('style');
					await (await colorPicker.sliders())[2].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}

					const currentSecondSliderBgColor = await (await colorPicker.sliders())[0].getAttribute('style');
					const currentThirdSliderBgColor = await (await colorPicker.sliders())[1].getAttribute('style');

					expect(initialSecondSliderBgColor).not.toBe(currentSecondSliderBgColor);
					expect(initialThirdSliderBgColor).not.toBe(currentThirdSliderBgColor);
				});

				it('should change selectedColor when changing the value of third slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[2].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});
			});

			describe('pointer', function () {
				it('should change selectedColor when changing the value of first slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[0].click();
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});

				it('should change selectedColor when changing the value of second slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[1].click();
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});

				it('should change selectedColor when changing the value of third slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[2].click();
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});
			});
		});

		describe('HSL Color Picker', function () {
			beforeEach(async () => {
				// change the value of dropdown to render HSL color picker
				await colorPicker.slidersDropdown.moveTo();
				await Page.spotlightSelect();
				await Page.spotlightDown();
				await Page.spotlightSelect();
			});

			it('should render Hue/Saturation/Lightness color picker', async function () {
				const firstSliderLabel = await (await colorPicker.slidersLabel())[0].getText();
				const secondSliderLabel = await (await colorPicker.slidersLabel())[1].getText();
				const thirdSliderLabel = await (await colorPicker.slidersLabel())[2].getText();

				expect(firstSliderLabel).toBe('Hue');
				expect(secondSliderLabel).toBe('Saturation');
				expect(thirdSliderLabel).toBe('Lightness');
			});

			describe('5-way', function () {
				it('should change first slider output when changing slider value', async function () {
					const initialSliderOutput =  await (await colorPicker.slidersOutput())[0].getText();
					await (await colorPicker.sliders())[0].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightRight();
					}
					const currentSliderOutput = await (await colorPicker.slidersOutput())[0].getText();

					expect(initialSliderOutput).not.toBe(currentSliderOutput);
				});

				it('should change the background color of second and third sliders when changing first slider value', async function () {
					const initialSecondSliderBgColor = await (await colorPicker.sliders())[1].getAttribute('style');
					const initialThirdSliderBgColor = await (await colorPicker.sliders())[2].getAttribute('style');
					await (await colorPicker.sliders())[0].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightRight();
					}

					const currentSecondSliderBgColor = await (await colorPicker.sliders())[1].getAttribute('style');
					const currentThirdSliderBgColor = await (await colorPicker.sliders())[2].getAttribute('style');

					expect(initialSecondSliderBgColor).not.toBe(currentSecondSliderBgColor);
					expect(initialThirdSliderBgColor).not.toBe(currentThirdSliderBgColor);
				});

				it('should change selectedColor when changing the value of first slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[0].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightRight();
					}
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});

				it('should change second slider output when changing slider value', async function () {
					await (await colorPicker.sliders())[1].moveTo();
					await Page.spotlightSelect();
					const initialSliderOutput =  await (await colorPicker.slidersOutput())[1].getText();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}
					const currentSliderOutput = await (await colorPicker.slidersOutput())[1].getText();

					expect(initialSliderOutput).not.toBe(currentSliderOutput);
				});

				it('should change the background color of first and third sliders when changing second slider value', async function () {
					const initialSecondSliderBgColor = await (await colorPicker.sliders())[0].getAttribute('style');
					const initialThirdSliderBgColor = await (await colorPicker.sliders())[2].getAttribute('style');
					await (await colorPicker.sliders())[1].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}

					const currentSecondSliderBgColor = await (await colorPicker.sliders())[0].getAttribute('style');
					const currentThirdSliderBgColor = await (await colorPicker.sliders())[2].getAttribute('style');

					expect(initialSecondSliderBgColor).not.toBe(currentSecondSliderBgColor);
					expect(initialThirdSliderBgColor).not.toBe(currentThirdSliderBgColor);
				});

				it('should change selectedColor when changing the value of second slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[1].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});

				it('should change third slider output when changing slider value', async function () {
					await (await colorPicker.sliders())[2].moveTo();
					await Page.spotlightSelect();
					const initialSliderOutput =  await (await colorPicker.slidersOutput())[2].getText();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}
					const currentSliderOutput = await (await colorPicker.slidersOutput())[2].getText();

					expect(initialSliderOutput).not.toBe(currentSliderOutput);
				});

				it('should change the background color of first and second sliders when changing third slider value', async function () {
					const initialSecondSliderBgColor = await (await colorPicker.sliders())[0].getAttribute('style');
					const initialThirdSliderBgColor = await (await colorPicker.sliders())[1].getAttribute('style');
					await (await colorPicker.sliders())[2].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}

					const currentSecondSliderBgColor = await (await colorPicker.sliders())[0].getAttribute('style');
					const currentThirdSliderBgColor = await (await colorPicker.sliders())[1].getAttribute('style');

					expect(initialSecondSliderBgColor).not.toBe(currentSecondSliderBgColor);
					expect(initialThirdSliderBgColor).not.toBe(currentThirdSliderBgColor);
				});

				it('should change selectedColor when changing the value of third slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[2].moveTo();
					await Page.spotlightSelect();
					for (let i = 0; i < 10; i++) {
						await Page.spotlightLeft();
					}
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});
			});

			describe('pointer', function () {
				it('should change selectedColor when changing the value of first slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[0].click();
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});

				it('should change selectedColor when changing the value of second slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[1].click();
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});

				it('should change selectedColor when changing the value of third slider', async function () {
					const initialSelectedColor = await colorPicker.selectedColor.getAttribute('style');
					await (await colorPicker.sliders())[2].click();
					const currentSelectedColor = await colorPicker.selectedColor.getAttribute('style');

					expect(initialSelectedColor).not.toBe(currentSelectedColor);
				});
			});
		});
	});
});
