const Page = require('./ColorPickerPage');

describe('ColorPicker', function () {
	beforeEach(async function () {
		await Page.open();
	});

	const colorPicker = Page.components.colorPicker;

	describe('ColorPicker Grid', function () {
		it('should focus Grid tab', async function () {
			expect(await (await colorPicker.tabItems())[0].isFocused()).toBe(true);
		});

		describe('5-way', function () {
			it('should change selectedColor with 5-way keys', async function () {
				const colorBlockStyle = await (await colorPicker.colorBlock())[3].getAttribute('style');
				const colorBlockBgColor = colorBlockStyle.split(';')[0];
				// Spot forth block from first colors block
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
		describe('5-way', function () {
			it('should focus Spectrum tab on 5-way Right', async function () {
				await Page.spotlightRight();
				expect(await (await colorPicker.tabItems())[1].isFocused()).toBe(true);
			});

			it('should change selected color with 5-way keys', async function (){
				await Page.spotlightRight();
				await browser.pause(500);
				await Page.spotlightDown();
				await Page.spotlightSelect();
				for (let i = 0; i < 20; i++) {
					await Page.spotlightDown();
				}
				for (let i = 0; i < 17; i++) {
					await Page.spotlightRight();
				}

				const spectrumIndicatorStyle = await colorPicker.spectrumIndicator.getAttribute('style');
				const spectrumIndicator = String(spectrumIndicatorStyle.split(';').filter(attr => attr.includes('background-color'))).trim();
				const selectedColorStyle = await colorPicker.selectedColor.getAttribute('style');
				const selectedColor = String(selectedColorStyle.split(';').filter(attr => attr.includes('background-color'))).trim();

				expect(spectrumIndicator).toBe(selectedColor);
			});
		});

		describe('pointer', function () {
			it('should change color when clicking on the canvas', async function () {
				await (await colorPicker.tabItems())[1].click();
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

	// describe('ColorPicker Sliders', function () {
	// 	it('should focus Sliders tab on 5-way Right', async function () {
	// 		await Page.spotlightRight();
	// 		await Page.spotlightRight();
	// 		expect(await (await colorPicker.tabItems())[2].isFocused()).toBe(true);
	// 	});
	// });
});
