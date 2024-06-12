const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('Datasize change', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should spotlight displays on item after up quickly [QWTC-2006]', async function () {
		// Step3 : datasize Knobs setting '4'
		await Page.inputfieldNumItems.moveTo();
		await Page.spotlightSelect();
		await Page.backSpace();
		await Page.backSpace();
		await Page.backSpace();
		await Page.numPad(4);
		// In case of TV, VKB is opened when inputfield clicking. So add escape key for VKB closing.
		await Page.backKey();
		await Page.spotlightDown();
		await (await Page.item(0)).moveTo();
		// Check First item
		await expectFocusedItem(0, 'focus item0');
		await Page.spotlightDown();
		await Page.spotlightDown();
		await Page.spotlightDown();
		await expectFocusedItem(3, 'focus item3');
		await Page.spotlightDown();
		// Check to go out of the list.
		expect(await Page.buttonLeft.isFocused()).toBe(true);
		// Step 4-1: Place the mouse cursor/pointer underneath the last item.
		// TODO: Need to Flick event handling api.
		await Page.showPointerByKeycode();
		await (await Page.item(3)).moveTo();
		await expectFocusedItem(3, 'focus Item 03');
		// Step 4-3: Move the pointer over any of the items.
		// Verify 4: Spotlight displays on any of the items.
		await (await Page.item(1)).moveTo();
		await expectFocusedItem(1, 'focus Item 01');
		await (await Page.item(0)).moveTo();
		await expectFocusedItem(0, 'focus Item 00');
	});
});
