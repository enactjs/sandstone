const Page = require('./DayPickerPage');

describe('DayPicker', function () {
	beforeEach(async function () {
		await Page.open('GetDayString');
	});

	describe('LTR', function () {
		const dayPicker = Page.components.getDayStringDayPicker;

		it('should display proper selected day string [QWTC-2427]', async function () {
			// Step 3-1: Click on Monday, Tuesday, Wednesday, Thursday, Friday.
			// Step 3-1 Verify; Monday, Tuesday, Wednesday, Thursday, Friday are selected.
			await dayPicker.item(1).click();
			expect(await dayPicker.item(1).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(2).click();
			expect(await dayPicker.item(2).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(3).click();
			expect(await dayPicker.item(3).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(4).click();
			expect(await dayPicker.item(4).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(5).click();
			expect(await dayPicker.item(5).getAttribute('aria-checked')).toBe('true');

			// Step 3-2: As each day is selected, observe the label changing under "Selected Day".
			await $('#selectedString').moveTo();
			// Step 3-2 Verify: The label under "Selected Day" displays Every Weekday.
			expect(await dayPicker.extractSelectedDayString()).toBe('Every Weekday');

			// Step 4-1: Click on Saturday, Sunday.
			// Step 4-1 Verify: All 7 days are selected.
			await dayPicker.item(0).click();
			expect(await dayPicker.item(0).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(6).click();
			expect(await dayPicker.item(6).getAttribute('aria-checked')).toBe('true');

			// Step 4-2: As each day is selected, observe the label changing under "Selected Day".
			await $('#selectedString').moveTo();
			// Step 4-2 Verify: The label under "Selected Day" displays Every Day.
			expect(await dayPicker.extractSelectedDayString()).toBe('Every Day');

			// Step 5-1; Unselect Monday, Tuesday, Wednesday, Thursday, Friday.
			// Step 5-1 Verify: Only Saturday and Sunday are selected.
			await dayPicker.item(1).click();
			expect(await dayPicker.item(1).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(2).click();
			expect(await dayPicker.item(2).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(3).click();
			expect(await dayPicker.item(3).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(4).click();
			expect(await dayPicker.item(4).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(5).click();
			expect(await dayPicker.item(5).getAttribute('aria-checked')).toBe('false');

			// Step 5-2: As each day is unselected, observe the label changing under "Selected Day".
			await $('#selectedString').moveTo();
			// Step 5-2 Verify: The label under "Selected Day" displays Every Weekend.
			expect(await dayPicker.extractSelectedDayString()).toBe('Every Weekend');
		});
	});

	// Test whether Selected Day displays correctly in RTL locales.
	describe('RTL', function () {
		const dayPicker = Page.components.getDayStringDayPicker;
		beforeEach(async function () {
			await Page.open('GetDayString', '?locale=ar-SA');
		});

		it('should selected day display in RTL [QWTC-2428]', async function () {
			// Step 4-1: Click on the first five days from the top.
			// Step 4-1 Verify; Monday, Tuesday, Wednesday, Thursday, Friday are selected.
			await dayPicker.item(0).click();
			expect(await dayPicker.item(0).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(1).click();
			expect(await dayPicker.item(1).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(2).click();
			expect(await dayPicker.item(2).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(3).click();
			expect(await dayPicker.item(3).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(4).click();
			expect(await dayPicker.item(4).getAttribute('aria-checked')).toBe('true');

			// Step 4-2: As each day is selected, observe the label changing under "Selected Day".
			await $('#selectedString').moveTo();
			// Step 4-2 Verify: The label under "Selected Day" displays Every Weekday.
			expect(await dayPicker.extractSelectedDayString()).toBe('Every Weekday');

			// Step 5-1: Click on last two days from the top.
			// Step 5-1 Verify: All 7 days are selected.
			await dayPicker.item(5).click();
			expect(await dayPicker.item(5).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(6).click();
			expect(await dayPicker.item(6).getAttribute('aria-checked')).toBe('true');

			// Step 5-2: As each day is selected, observe the label changing under "Selected Day".
			await $('#selectedString').moveTo();
			// Step 5-2 Verify: The label under "Selected Day" displays Every Day.
			expect(await dayPicker.extractSelectedDayString()).toBe('Every Day');

			// Step 6-1: Unselect the first five days from the top.
			// Step 6-1 Verify: Only the last 2 days are selected.
			await dayPicker.item(0).click();
			expect(await dayPicker.item(0).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(1).click();
			expect(await dayPicker.item(1).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(2).click();
			expect(await dayPicker.item(2).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(3).click();
			expect(await dayPicker.item(3).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(4).click();
			expect(await dayPicker.item(4).getAttribute('aria-checked')).toBe('false');

			// Step 6-2: As each day is unselected, observe the label changing under "Selected Day".
			await $('#selectedString').moveTo();
			// Step 6-2 Verify: The label under "Selected Day" displays Every Weekend.
			expect(await dayPicker.extractSelectedDayString()).toBe('Every Weekend');
		});
	});

	// Test whether Selected Day displays correctly in es-ES locale.
	describe('Spanish', function () {
		const dayPicker = Page.components.getDayStringDayPicker;
		beforeEach(async function () {
			await Page.open('GetDayString', '?locale=es-ES');
		});

		it('should display proper selected day string in es-ES locale [QWTC-637]', async function () {
			// Step 4-1: Click on the first five days from the top.
			// Step 4-1 Verify; Monday, Tuesday, Wednesday, Thursday, Friday are selected.
			await dayPicker.item(0).click();
			expect(await dayPicker.item(0).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(1).click();
			expect(await dayPicker.item(1).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(2).click();
			expect(await dayPicker.item(2).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(3).click();
			expect(await dayPicker.item(3).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(4).click();
			expect(await dayPicker.item(4).getAttribute('aria-checked')).toBe('true');

			// Step 4-2: As each day is selected, observe the label changing under "Selected Day".
			await $('#selectedString').moveTo();
			// Step 4-2 Verify: The label under "Selected Day" displays Every Weekday.
			expect(await dayPicker.extractSelectedDayString()).toBe('Every Weekday');

			// Step 5-1: Click on last two days from the top.
			// Step 5-1 Verify: All 7 days are selected.
			await dayPicker.item(5).click();
			expect(await dayPicker.item(5).getAttribute('aria-checked')).toBe('true');
			await dayPicker.item(6).click();
			expect(await dayPicker.item(6).getAttribute('aria-checked')).toBe('true');

			// Step 5-2: As each day is selected, observe the label changing under "Selected Day".
			await $('#selectedString').moveTo();
			// Step 5-2 Verify: The label under "Selected Day" displays Every Day.
			expect(await dayPicker.extractSelectedDayString()).toBe('Every Day');

			// Step 6-1: Unselect the first five days from the top.
			// Step 6-1 Verify: Only the last 2 days are selected.
			await dayPicker.item(0).click();
			expect(await dayPicker.item(0).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(1).click();
			expect(await dayPicker.item(1).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(2).click();
			expect(await dayPicker.item(2).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(3).click();
			expect(await dayPicker.item(3).getAttribute('aria-checked')).toBe('false');
			await dayPicker.item(4).click();
			expect(await dayPicker.item(4).getAttribute('aria-checked')).toBe('false');

			// Step 6-2: As each day is unselected, observe the label changing under "Selected Day".
			await $('#selectedString').moveTo();
			// Step 6-2 Verify: The label under "Selected Day" displays Every Weekend.
			expect(await dayPicker.extractSelectedDayString()).toBe('Every Weekend');
		});
	});
});
