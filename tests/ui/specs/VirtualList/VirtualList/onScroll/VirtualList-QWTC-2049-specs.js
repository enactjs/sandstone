const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('onScrollStart/Stop Events behavior ', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should display Scroll Events in Action with 5-way Down and Up [QWTC-2049]', async function () {
		// Verify Step 3 : Spotlight displays on the Item 006 or 007.
		await (await Page.item(7)).moveTo();
		await expectFocusedItem(7, 'step 3 focus');
		// Step 4:5-way Down se	veral times(approximately 10 times) until the entire list starts to scroll.
		let index = 0;
		for (; index < 10; index++) {
			await Page.spotlightDown();
			// Verify Step 4.1: Displays 'onScrollStart'
			// Verify Step 4.2: Displays 'onScrollStop' as soon as the list stops.
			await Page.delay(1000);
			expect(Number(await Page.list.getAttribute('data-scrolling-events'))).toBeGreaterThan(index);
		}
		// Step 5:5-way Up several times(approximately 10 times) until the entire list starts to scroll.
		for (; index < 20; index++) {
			await Page.spotlightUp();
			if (index > 16) {
				// Verify Step 5.1: Displays 'onScrollStart'
				// Verify Step 5.2: Displays 'onScrollStop' as soon as the list stops.
				await Page.delay(1000);
				// five-way Up 10 times to item17> item 7. Until the list wii be able to scrolled up, scroll event does not occur(7 times).
				expect(Number(await Page.list.getAttribute('data-scrolling-events'))).toBeGreaterThan(index - 7);
			}
		}
	});
});
