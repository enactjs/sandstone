const {expectFocusedItem} = require('../../VirtualList/VirtualList-utils');
const ScrollerPage = require('../ScrollerPage');

describe('Scroller List Of Things', function () {
	beforeEach(async function () {
		await ScrollerPage.open('ListOfThings');
	});

	it('should occur onScroll/onKeydown event [QWTC-1986], [QWTC-1987]', async function () {
		// Precondition: Spotlight is on Close button. In this case, 'X' button is replaced 'Top' button.
		await ScrollerPage.buttonTop.moveTo();
		await ScrollerPage.spotlightSelect();
		expect(await ScrollerPage.buttonTop.isFocused()).toBe(true);

		// Step3 -1: 5-way Down several times until reaching to the item which is under the screen.
		const bottomVisibleIdNum = Number((await ScrollerPage.bottomVisibleItemId()).slice(4));
		let index = -1;  // Current focus is on Top button
		while (index < bottomVisibleIdNum) {
			await ScrollerPage.spotlightDown();
			await ScrollerPage.delay(100);
			// Step 3-2 Verify: onKeyDown event is added for each 5-way Down.
			// There is no onKeyDown event from X button to Item 0.
			await expectFocusedItem(++index);
			expect(Number(await ScrollerPage.scroller.getAttribute('data-keydown-events'))).toBe(index);
		}
		// Step 3-3,4 Verify: One (1)  onScrollStart/Stop event is added.
		await ScrollerPage.delay(300);
		expect(Number(await ScrollerPage.scroller.getAttribute('data-scrolling-events'))).toBe(1);

		// Step 4-1: 5-way Up several times until reaching to the item which is upper the screen.
		const topVisibleItemId = Number((await ScrollerPage.topVisibleItemId()).slice(4));
		let keydownEvent = 7;
		while (index > topVisibleItemId) {
			await ScrollerPage.spotlightUp();
			await ScrollerPage.delay(100);
			keydownEvent++;

			// Step 4-2 Verify: onKeyDown event is added for each 5-way Up.
			await expectFocusedItem(--index);
			expect(Number(await ScrollerPage.scroller.getAttribute('data-keydown-events'))).toBe(keydownEvent);
		}

		// Step 4-3,4 Verify: One (1)  onScrollStart/Stop event is added.
		await ScrollerPage.delay(300);
		expect(Number(await ScrollerPage.scroller.getAttribute('data-scrolling-events'))).toBe(2);

		// Perform a test of QWTC-1987, which is not covered by QWTC-1986.
		// 5-way Left a few times.
		await ScrollerPage.spotlightLeft();
		// One (1) onKeyDown event is added for each 5-way Left.
		expect(Number(await ScrollerPage.scroller.getAttribute('data-keydown-events'))).toBe(++keydownEvent);

		await $('#item2').moveTo();
		await expectFocusedItem(2);
		// 5-way Right a few times.
		await ScrollerPage.spotlightRight();
		// One (1) onKeyDown event is added for each 5-way Left.
		expect(Number(await ScrollerPage.scroller.getAttribute('data-keydown-events'))).toBe(++keydownEvent);
	});
});
