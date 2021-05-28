const Page = require('../VirtualGridListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('qa-VirtualGridList', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should spotlight is on the bottom/top in same column via page up/down key with nativescroll mode[GT-28989]', function () {
		// To speed up the test, set dataSize to 30.
		Page.inputNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(3);
		Page.numPad(0);
		Page.spotlightRight();

		// Step 2-1: Position the pointer on an image.
		Page.item(3).moveTo();
		// Step 2-2: 5-way Left to change into 5-way key mode.
		Page.spotlightLeft();
		// Step 2 Verify: Spotlight on one of the images.
		expectFocusedItem(2);

		// Step 3: Press Channel Down continuously until the bottom of the list displays
		for (let i =  0; i < 3; i++) {
			Page.pageDown();
			Page.delay(1000);
		}
		// Step 3 Verify: Spotlight is on the bottom most image in the same column from the previous step.
		expectFocusedItem(27);

		// Step 4: Press Channel Up continuously until the top of the list displays.
		for (let i =  0; i < 3; i++) {
			Page.pageUp();
			Page.delay(1000);
		}
		// Step 4 Verify: Spotlight is on the top-most image in the same column from the previous step.
		expectFocusedItem(2);
	});

	it('should spotlight is on the bottom/top in same column via page up/down key with translatescroll mode[GT-28982]', function () {
		// Step 2: Uncheck the "Native Scrolling" CheckboxItem.
		Page.buttonModeChange.moveTo();
		Page.spotlightSelect();
		// To speed up the test, set dataSize to 30.
		Page.inputNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(3);
		Page.numPad(0);
		Page.spotlightRight();

		// Step 3-1: Position the pointer on an image.
		Page.item(3).moveTo();
		// Step 3-2: 5-way Left to change into 5-way key mode.
		Page.spotlightLeft();
		// Step 3 Verify: Spotlight on one of the images.
		expectFocusedItem(2);

		// Step 4: Press Channel Down continuously until the bottom of the list displays
		for (let i =  0; i < 3; i++) {
			Page.pageDown();
			Page.delay(1000);
		}
		// Step 4 Verify: Spotlight is on the bottom most image in the same column from the previous step.
		expectFocusedItem(27);

		// Step 5: Press Channel Up continuously until the top of the list displays.
		for (let i =  0; i < 3; i++) {
			Page.pageUp();
			Page.delay(1000);
		}
		// Step 5 Verify: Spotlight is on the top-most image in the same column from the previous step.
		expectFocusedItem(2);
	});
});
