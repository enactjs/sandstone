const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Wrap Knobs', function () {
	beforeEach(function () {
		Page.open();
	});

	// Since visual test(Animation, Pointer disappears) is not able to verify by UI Test, This TC is partialy automated.
	it('should not Scroll list with wrap knob off[GT-28473]', function () {
		// Knob > wrap > false, datasize 100, visible verticalScroller are default value.
		// Step 3-3: Hover on the right side of the viewport. Since visual check cannot checked, Verify to Scroller's position.
		expect(Page.getScrollOffsetLeft() + Page.getScrollbarWidth()).to.equal(Page.getListwidthSize());
		// Step 5: 5-way Spot the first item.
		Page.buttonLeft.moveTo();
		Page.spotlightRight();
		expectFocusedItem(0, 'focus');
		// Step 6: 5-Way Up.
		Page.spotlightUp();
		// If wrap bug occured, Scrolling event will be added. Delay to check if a scrolling event has occurred.
		Page.delay(1500);
		// Step 6-1 Verify: The list does not Scroll to the Bottom.
		expect(Page.list.getAttribute('data-scrolling-events')).to.equal(null);
		// Step 6-2 Verify: Spotlight is on the Close 'X' button. This case is replaced 'Top' button.
		expect(Page.buttonTop.isFocused()).to.be.true();
		// Step 7-1: Wheel Down on the list to the last item. Wheel func is replaced pageDown.
		Page.spotlightDown();
		for (let i = 0; i < 16; i++) {
			Page.pageDown();
			// Wait for scrolling event.
			Page.delay(700);
		}
		// Step 7 Verify: Spotlight displays on the last item.
		expectFocusedItem(99, 'focus 3');
		// Step 8: 5-way Down.
		Page.spotlightDown();
		// Step 8-1 Verify: The list does not Scroll to the Top.
		expect(Page.list.getAttribute('data-scrolling-events')).to.equal('16');
		// Step 8-2 Verify: Spotlight stays on the last item. This view has 'Bottom' button at below the list.
		expect(Page.buttonBottom.isFocused()).to.be.true();
	});
});
