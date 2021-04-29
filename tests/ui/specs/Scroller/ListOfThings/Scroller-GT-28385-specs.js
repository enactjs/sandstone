const {expectFocusedItem} = require('../../VirtualList/VirtualList-utils');
const ScrollerPage = require('../ScrollerPage');

describe('Scroller List Of Things', function () {
	beforeEach(function () {
		ScrollerPage.open('ListOfThings');
	});

	it('should occur onKeyDown event [GT-28385]', function () {
		// Step 3-1: 5-way Spot *Item 0*.
		ScrollerPage.buttonTop.moveTo();
		ScrollerPage.spotlightDown();
		// Step 3-2: 5-way Up.
		ScrollerPage.spotlightUp();
		// Step 3-1 Verify: Spotlight is on Closing (x) button. In this case, 'X' button is replaced 'Top' button.
		expect(ScrollerPage.buttonTop.isFocused()).to.be.true();
		// Step 3-2 Verify: One (1) onKeyDown event is added from Item 0 to Closing (x) button.
		expect(Number(ScrollerPage.scroller.getAttribute('data-keydown-events'))).to.be.equal(1);

		// Step 4-1: 5-way Down 3 times.
		for (let i = 1; i < 4; i++) {
			ScrollerPage.spotlightDown();
			ScrollerPage.delay(100);
			// Step 4-2 Verify: One (1) onKeyDown event is added for each 5-way Down. No onKeyDown event is added for 5-way Down from Closing (x) to Item 0.
			expect(Number(ScrollerPage.scroller.getAttribute('data-keydown-events'))).to.be.equal(i);
		}
		// Step 4-1 Verify: Spotlight is on Item 2.
		expectFocusedItem(2);

		// Step 5-1: 5-way Left a few times.
		ScrollerPage.spotlightLeft();
		// Step 5-1 Verify: One (1) onKeyDown event is added for each 5-way Left.
		expect(Number(ScrollerPage.scroller.getAttribute('data-keydown-events'))).to.be.equal(4);

		// Step 6 Precondition: Spotlight is still on Item 2.
		$('#item2').moveTo();
		expectFocusedItem(2);
		// Step 6-1: 5-way Right a few times.
		ScrollerPage.spotlightRight();
		// Step 6-1 Verify: One (1) onKeyDown event is added for each 5-way Left.
		expect(Number(ScrollerPage.scroller.getAttribute('data-keydown-events'))).to.be.equal(5);
	});
});
