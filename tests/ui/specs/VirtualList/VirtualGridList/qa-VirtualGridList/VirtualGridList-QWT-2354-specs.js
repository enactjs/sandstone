const Page = require('../VirtualGridListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('qa-VirtualGridList translate mode', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should spotlight moves to right upper item [QWT-2354]', function () {
		// Step 2: Uncheck the "Native Scrolling" CheckboxItem.
		Page.buttonModeChange.moveTo();
		Page.spotlightSelect();
		// Step 3-1: DataSize is 100.
		// Step 3-2: Adjust the DataSize to a smaller number like 98 for example.
		// To speed up the test, set dataSize to 27.
		Page.inputNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(2);
		Page.numPad(7);
		Page.spotlightRight();

		// Step 3-3: Move focus to the last item.
		Page.item(1).moveTo();
		Page.spotlightSelect();
		for (let i =  0; i < 3; i++) {
			Page.pageDown();
			Page.delay(1000);
		}
		// Step 3 Verify: Spotlight is on last item.
		expectFocusedItem(26);

		// Step 4: 5-way Right.
		Page.spotlightRight();
		// Step 4 Verify: Spotlight is on the Upper Right item.
		expectFocusedItem(22);
	});
});
