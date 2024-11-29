const Page = require('./RangePickerPage');
const {extractValue} = require('./RangePicker-utils.js');

describe('RangePicker RTL', function () {
	beforeEach(async function () {
		await Page.open('?locale=ur-PK');
	});

	describe('with negativeValues in RTL', function () {
		const maxValueRangePicker = Page.components.rangePickerMaxValues;
		const negativeRangePicker = Page.components.rangePickerWithNegativeValues;
		const rangePickerDisabled = Page.components.rangePickerDisabled;

		it('should decrement to negative number [QWTC-2148]', async function () {
			// Step 5: Click on the Left arrow button until '-5' displays.
			await negativeRangePicker.decrementer(negativeRangePicker.self).click();
			await browser.pause(500);
			const newValue = extractValue(negativeRangePicker);
			// Step 5 Verify: The minus sign displays to the Left of the number '5'.
			expect(await newValue).toBe(-5);
		});

		describe('change locale', function () {
			beforeEach(async function () {
				await Page.open('?locale=ar-SA');
			});

			it('should decrement/increment in ar-SA [QWTC-2145]', async function () {
				// Check that the disabled pciker's position is left from defaultPicker.(in case LTR, it is right from defaultPicker.)
				await Page.spotlightLeft();
				await Page.spotlightLeft();
				expect(await rangePickerDisabled.incrementer(rangePickerDisabled.self).isFocused()).toBe(true);

				// Step 4: Click on Right arrow button 4 times.
				await maxValueRangePicker.incrementer(maxValueRangePicker.self).click();
				await maxValueRangePicker.incrementer(maxValueRangePicker.self).click();
				await maxValueRangePicker.incrementer(maxValueRangePicker.self).click();
				await maxValueRangePicker.incrementer(maxValueRangePicker.self).click();
				await browser.pause(500);
				// Step 4 Verify:  Number 20 displays.
				expect(await extractValue(maxValueRangePicker)).toBe(20);

				// Step 5: Click on Left arrow button 2 times.
				await maxValueRangePicker.decrementer(maxValueRangePicker.self).click();
				await maxValueRangePicker.decrementer(maxValueRangePicker.self).click();
				await browser.pause(500);
				// Step 5 Verify:  Number 10 displays.
				expect(await extractValue(maxValueRangePicker)).toBe(10);
			});
		});
	});
});
