const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Datasize change', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should spotlight displays on item after up quickly [GT-28417]', function () {
		// Step3 : datasize Knobs setting '4'
		Page.inputfieldNumItems.moveTo();
		Page.spotlightSelect();
		Page.backSpace();
		Page.backSpace();
		Page.backSpace();
		Page.numPad(4);
		// In case of TV, VKB is opened when inputfield clicking. So add escape key for VKB closing.
		Page.backKey();
		Page.spotlightDown();
		Page.item(0).moveTo();
		// Check First item
		expectFocusedItem(0, 'focus item0');
		Page.spotlightDown();
		Page.spotlightDown();
		Page.spotlightDown();
		expectFocusedItem(3, 'focus item3');
		Page.spotlightDown();
		// Check to go out of the list.
		expect(Page.buttonLeft.isFocused(), 'lastitem verify').to.be.true();
		// Step 4-1: Place the mouse cursor/pointer underneath the last item.
		// TODO: Need to Flick event handling api.
		Page.showPointerByKeycode();
		Page.item(3).moveTo();
		expectFocusedItem(3, 'focus Item 03');
		// Step 4-3: Move the pointer over any of the items.
		// Verify 4: Spotlight displays on any of the items.
		Page.item(1).moveTo();
		expectFocusedItem(1, 'focus Item 01');
		Page.item(0).moveTo();
		expectFocusedItem(0, 'focus Item 00');
	});
});
