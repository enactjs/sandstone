const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('onScrollStart/Stop Events behavior ', function () {
	beforeEach(function () {
		Page.open();
	});

	it.skip('should display Scroll Events in Action with 5-way Down and Up [GT-28470]', function () {
		// Verify Step 3 : Spotlight displays on the Item 006 or 007.
		Page.item(7).moveTo();
		expectFocusedItem(7, 'step 3 focus');
		// Step 4:5-way Down se	veral times(approximately 10 times) until the entire list starts to scroll.
		let index = 1;
		for (; index < 11; index++) {
			Page.spotlightDown();
			// Verify Step 4.1: Displays 'onScrollStart'
			// Verify Step 4.2: Displays 'onScrollStop' as soon as the list stops.
			Page.delay(1000);
			expect(Page.list.getAttribute('data-scrolling-events')).to.equal(String(index));
		}
		// Step 5:5-way Up several times(approximately 10 times) until the entire list starts to scroll.
		for (; index < 21; index++) {
			Page.spotlightUp();
			if (index > 17) {
				// Verify Step 5.1: Displays 'onScrollStart'
				// Verify Step 5.2: Displays 'onScrollStop' as soon as the list stops.
				Page.delay(1000);
				// five-way Up 10 times to item17> item 7. Until the list wii be able to scrolled up, scroll event does not occur(7 times).
				expect(Page.list.getAttribute('data-scrolling-events')).to.equal(String(index - 7));
			}
		}
	});
});
