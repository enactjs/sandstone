const ScrollerPage = require('../ScrollerPage');
const {expectFocusedItem} = require('../Scroller-utils');

describe('Horizontal Scroller', function () {
	beforeEach(async function () {
		await ScrollerPage.open('WithHorizontal');
	});

	it('should not scroll with 5-way right on the first button [QWTC-1982]', async function () {
		// Step 3: Position the pointer on 'Button 1'.
		await ScrollerPage.showPointerByKeycode();
		await $('#item0').moveTo();
		// Step 3 Verify: Spotlight is on 'Button 1'.
		await expectFocusedItem(0);
		const initialThumbPosition = await ScrollerPage.getScrollThumbPosition().horizontal;

		// Step 4: 5-way Up
		await ScrollerPage.spotlightUp();
		// Step 4 Verify: The list does not scroll.
		expect(await ScrollerPage.getScrollThumbPosition().horizontal).toBe(initialThumbPosition);
		// for initializing
		await ScrollerPage.spotlightDown();

		// Step 5: Position the pointer on 'Button 1'
		await ScrollerPage.showPointerByKeycode();
		await $('#item0').moveTo();
		// Step 5 Verify: Spotlight is on 'Button 1'.
		await expectFocusedItem(0);
		// Step 6: 5-way Down.
		await ScrollerPage.spotlightDown();
		// Step 6 Verify: The list does not scroll.
		expect(await ScrollerPage.getScrollThumbPosition().horizontal).toBe(initialThumbPosition);

		// Step 7-2: 5-way Select and 5-way Left in the blank area of the viewport to enter 5-way.
		await ScrollerPage.showPointerByKeycode();
		await $('#item0').moveTo({xOffset: 0, yOffset: 300});
		// Step 7-3: 5-way Spot 'Button 1'.
		await ScrollerPage.spotlightLeft();
		// Step 7 Verify: Spotlight is on 'Button 1'.
		await expectFocusedItem(0);

		// Step 8: 5-way Up
		await ScrollerPage.spotlightUp();
		// Step 8 Verify: The list does not scroll.
		expect(await ScrollerPage.getScrollThumbPosition().horizontal).toBe(initialThumbPosition);

		// Step 9: 5-way Spot 'Button 1'.
		await ScrollerPage.spotlightDown();
		await expectFocusedItem(0);
		// Step 10: 5-way Down.
		await ScrollerPage.spotlightDown();
		// Step 10 Verify: The list does not scroll.
		expect(await ScrollerPage.getScrollThumbPosition().horizontal).toBe(initialThumbPosition);
	});
});
