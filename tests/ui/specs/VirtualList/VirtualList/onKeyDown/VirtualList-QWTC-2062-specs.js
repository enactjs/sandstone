const Page = require('../VirtualListPage');
const {expectFocusedItem} = require('../../VirtualList-utils');

describe('onKeyDown [QWTC-2062]', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should prevent bubbling while navigating within a list', async function () {
		await Page.spotlightSelect();
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		await Page.spotlightDown();
		await expectFocusedItem(1);
		await Page.spotlightUp();
		await expectFocusedItem(0);
		expect(await Page.list.getAttribute('data-keydown-events')).toBeNull();
		await Page.spotlightRight();
		await Page.spotlightLeft();
		await expectFocusedItem(0);
		expect(await Page.list.getAttribute('data-keydown-events')).toBe('1');
	});

	// TODO: Need to be analysis why failure only occur on jenkins ui-test.
	it.skip('should prevent bubbling when wrapping', async function () {
		await Page.spotlightRight();
		await Page.spotlightSelect();
		await Page.buttonTop.moveTo();
		await Page.spotlightDown();
		await expectFocusedItem(0);
		await Page.spotlightUp();
		await Page.delay(1500);  // TODO: Need better way to detect scroll end
		await expectFocusedItem(99);
		await Page.spotlightDown();
		await Page.delay(1500);  // TODO: Need better way to detect scroll end
		await expectFocusedItem(0);
		expect(await Page.list.getAttribute('data-keydown-events')).toBeNull();
	});

	// TODO: Need to be analysis why failure only occur on jenkins ui-test.
	it.skip('should prevent bubbling when wrapping', async function () {
		// Wrap knobs Setting
		await Page.spotlightRight();
		await Page.spotlightSelect();
		await Page.buttonTop.moveTo();
		await Page.spotlightDown();
		await expectFocusedItem(0);
		await Page.spotlightUp();
		await Page.spotlightUp();
		await Page.delay(1500);  // TODO: Need better way to detect scroll end
		await expectFocusedItem(99);
		await Page.spotlightDown();
		await Page.delay(1500);  // TODO: Need better way to detect scroll end
		await expectFocusedItem(0);
		expect(await Page.list.getAttribute('data-keydown-events')).toBeNull();
	});

	it('should allow bubbling while navigating out of a list using visible focusableScrollbar via items', async function () {
		// Set dataSize to 10 for Speed up Test.
		await Page.inputfieldNumItems.moveTo();
		await Page.spotlightSelect();
		// Since datasize's defaultSize is 100, pressing the Backspace key once will set it to 10.
		await Page.backSpace();
		// For close VKB on TV.
		await Page.backKey();
		await Page.spotlightDown();
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		await Page.spotlightUp();
		await Page.spotlightDown();
		await Page.spotlightLeft();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		await Page.fiveWayToItem(9);
		await expectFocusedItem(9);
		await Page.spotlightDown();
		expect(await Page.list.getAttribute('data-keydown-events')).toBe('3');
	});

	// Need mochaOpts - timeout set to 60000 to pass
	it('should allow bubbling while navigating out of a list using hidden focusableScrollbar via items', async function () {
		await Page.spotlightSelect();
		await Page.spotlightRight();
		// Set dataSize to 10 for Speed up Test.
		await Page.inputfieldNumItems.moveTo();
		await Page.spotlightSelect();
		// Since datasize's defaultSize is 100, pressing the Backspace key once will set it to 10.
		await Page.backSpace();
		// For close VKB on TV.
		await Page.backKey();
		await Page.spotlightDown();
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		await Page.spotlightUp();
		expect(await Page.buttonTop.isFocused()).toBe(true);
		await Page.spotlightDown();
		await Page.spotlightLeft();
		expect(await Page.buttonLeft.isFocused()).toBe(true);
		await Page.spotlightRight();
		await Page.spotlightRight();
		expect(await Page.buttonRight.isFocused()).toBe(true);
		await Page.spotlightLeft();
		await expectFocusedItem(0);
		await Page.fiveWayToItem(9);
		await expectFocusedItem(9);
		await Page.delay(1500);
		await Page.spotlightDown();
		expect(await Page.buttonBottom.isFocused()).toBe(true);
		expect(await Page.list.getAttribute('data-keydown-events')).toBe('4');
	});

	// Need mochaOpts - timeout set to 60000 to pass
	it('should allow bubbling while navigating out of a list using non-focusableScrollbar via items', async function () {
		// Set dataSize to 10 for Speed up Test.
		await Page.inputfieldNumItems.moveTo();
		await Page.spotlightSelect();
		// Since datasize's defaultSize is 100, pressing the Backspace key once will set it to 10.
		await Page.backSpace();
		// For close VKB on TV.
		await Page.backKey();
		await Page.spotlightDown();
		await Page.buttonLeft.moveTo();
		await Page.spotlightRight();
		await expectFocusedItem(0);
		await Page.spotlightUp();
		expect(await Page.buttonTop.isFocused()).toBe(true);
		await Page.spotlightDown();
		await Page.spotlightLeft();
		expect(await Page.buttonLeft.isFocused()).toBe(true);
		await Page.spotlightRight();
		await Page.spotlightRight();
		expect(await Page.buttonRight.isFocused()).toBe(true);
		await Page.spotlightLeft();
		await expectFocusedItem(0);
		await Page.fiveWayToItem(9);
		await expectFocusedItem(9);
		await Page.delay(1500);
		await Page.spotlightDown();
		expect(await Page.buttonBottom.isFocused()).toBe(true);
		expect(await Page.list.getAttribute('data-keydown-events')).toBe('4');
	});
});
