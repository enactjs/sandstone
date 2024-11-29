const Page = require('../VirtualGridListPage');

describe('Navigate with Channel Up/Down key with translate mode', function () {
	beforeEach(async function () {
		await Page.open();
	});

	it('should navigate via Page Down/Up key on scrollbar [QWTC-2395]', async function () {
		const initialScrollThumbPosition = Number(await Page.scrollThumbPosition());
		// Step 3: Knobs > VirtualGridList > scrollMode > translate
		await Page.buttonModeChange.moveTo();
		await Page.spotlightSelect();
		// Step 4: Channel Down.(accroding to summary, it works on scrollbar)
		await Page.showPointerByKeycode();
		await Page.scrollBar.moveTo();
		await Page.pageDown();
		await Page.delay(500);
		// Step 4-2 Verify: Scroll thumb in verticalScrollbar track moves down.
		expect(Number(await Page.scrollThumbPosition()) > initialScrollThumbPosition).toBe(true);
		// Step 5: Channel Up more 2 times.
		await Page.pageUp();
		await Page.pageUp();
		await Page.delay(500);
		// Step 5-2 Verify: Scroll thumb's position is top of verticalScrollbar track.
		expect(await Page.scrollThumbPosition()).toBe('0');
		// Step 6: Channel Down 2 times.
		// Step 6-2 Verify: Scroll thumb in verticalScrollbar track moves down with each press Channel Down key .
		await Page.pageDown();
		await Page.delay(500);
		expect(Number(await Page.scrollThumbPosition()) > 0).toBe(true);
		const curScrollThumbPosition = Number(Page.scrollThumbPosition());
		await Page.pageDown();
		await Page.delay(500);
		expect(Number(await Page.scrollThumbPosition()) > curScrollThumbPosition);
	});
});
