const {expectFocusedItem} = require('../../VirtualList/VirtualList-utils');
const ScrollerPage = require('../ScrollerPage');

describe('Scroller List Of Things', function () {
	beforeEach(function () {
		ScrollerPage.open('ListOfThings');
	});

	it('should occur onScroll event [GT-28384]', function () {
		// Precondition: Spotlight is on Close button. In this case, 'X' button is replaced 'Top' button.
		ScrollerPage.buttonTop.moveTo();
		ScrollerPage.spotlightSelect();
		expect(ScrollerPage.buttonTop.isFocused()).to.be.true();

		// Step3 -1: 5-way Down several times until reaching to the item which is under the screen.
		const bottomVisibleIdNum = Number(ScrollerPage.bottomVisibleItemId().slice(4));
		let index = 0;
		for (; index < bottomVisibleIdNum + 1; index++) {
			ScrollerPage.spotlightDown();
			ScrollerPage.delay(100);

			// Step 3-2 Verify: onKeyDown event is added for each 5-way Down.
			// There is no onKeyDown event from X button to Item 0.
			expectFocusedItem(index);
			expect(Number(ScrollerPage.scroller.getAttribute('data-keydown-events'))).to.be.equal(index);
		}
		// Step 3-3,4 Verify: One (1)  onScrollStart/Stop event is added.
		ScrollerPage.delay(300);
		expect(Number(ScrollerPage.scroller.getAttribute('data-scrolling-events'))).to.be.equal(1);

		// Step 4-1: 5-way Up several times until reaching to the item which is upper the screen.
		const topVisibleItemId = Number(ScrollerPage.topVisibleItemId().slice(4));
		let keydownEvent = index;
		for (; index - 2 >= topVisibleItemId; index--) {
			ScrollerPage.spotlightUp();
			ScrollerPage.delay(100);

			// Step 4-2 Verify: onKeyDown event is added for each 5-way Up.
			expectFocusedItem(index - 2);
			expect(Number(ScrollerPage.scroller.getAttribute('data-keydown-events'))).to.be.equal(keydownEvent);
			keydownEvent++;
		}

		// Step 4-3,4 Verify: One (1)  onScrollStart/Stop event is added.
		ScrollerPage.delay(300);
		expect(Number(ScrollerPage.scroller.getAttribute('data-scrolling-events'))).to.be.equal(2);
	});
});
