const Page = require('../VirtualListPage');

describe('RTL locale', function () {
	beforeEach(async function () {
		await Page.open('', '?locale=ar-SA');
	});

	it('should position Scrollbar Track on left side in RTL [QWTC-2059]', async function () {
		// Verify 3-2: The Scrollbar track displays shortly left aligned.
		expect((await Page.getListRect()).left).toBe((await Page.getVerticalScrollbarRect()).left);
	});
});

describe('Verify locale Change', function () {
	beforeEach(async function () {
		await Page.open('', '?locale=ur-PK');
	});

	// Since 'ar-sA' and 'en-US' have tests to check on the other side, this test only check 'ur-PK'.
	it('should Verify RTL functionality [QWTC-2059]', async function () {
		// Verify 5-1: VirtualList sample displays in RTL (Right to Left.)
		// Check that the button's position is Right-> Left.(in case RTL, button position is 'Right' - 'Left')
		await Page.buttonLeft.moveTo();
		expect(await Page.buttonLeft.isFocused()).toBe(true);
		await Page.spotlightLeft();
		await Page.spotlightLeft();
		expect(await Page.buttonRight.isFocused()).toBe(true);
		// Verify 5-2: Vertical Scrollbar displays on the left side.
		expect((await Page.getListRect()).left).toBe((await Page.getVerticalScrollbarRect()).left);
	});
});
