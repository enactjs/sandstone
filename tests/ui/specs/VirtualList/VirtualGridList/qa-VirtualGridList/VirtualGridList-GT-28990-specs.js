const Page = require('../VirtualGridListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('qa-VirtualGridList', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should spotlight is on the last item via 5-way on different column [GT-28990]', function () {
		// Step 2-1: Increase the dataSize to 101.
		Page.buttonAddItem.moveTo();
		Page.spotlightSelect();
		// Step 2-1: Position the pointer on the 2nd item with 'Image 1' image.
		Page.item(1).moveTo();
		// Step 2 Verify: Spotlight is on the 2nd item.
		expectFocusedItem(1);

		// Step 3: Keep pressing 5-way Down until the list reaches to the bottom.
		for (let i =  0; i < 20; i++) {
			Page.spotlightDown();
			Page.delay(200);
		}
		// Step 3-1 Verify: Spotlight is on the 101th item with 'Image 100'.
		expectFocusedItem(100);

		// Wait for scroll animation
		Page.delay(300);

		expect(Page.scrollThumbPosition()).to.equal('1');
		// Step 3-2 Verify: The 101th item with 'Image 100' sticks to the bottom in the list.
		Page.spotlightDown();
		expect(Page.buttonBottom.isFocused()).to.be.true();
	});
});
